import {buffer} from 'micro'
import * as admin from 'firebase-admin'


//secure a connection to firebase from backend
var serviceAccount = require('../../permissions.json')
const app = !admin.apps.length ?  admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}): admin.app();

//establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfilOrder = async (session) => {
    
    return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id).set({
        amount: session.amount_total/100,
        amount_shipping: session.total_details.amount_shipping/100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log(`SUCCESS: order ${session.id} added to db`)
    })
}

export default async (req, res) => {
    if(req.method ==='POST'){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;
        //verify that EVENT is verified from stripe
        try{
            event = stripe.webhooks.constructEvent(payload,sig,endpointSecret);

        } catch (err){
            return res.status(400).send(`webhook eroor: ${err.message} `)
        }

        //Handle the checkout session completed event
        if (event.type === 'checkout.session.completed'){
            const session = event.data.object;

            //Fullfil order
            return fullfilOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`Webhook error ${err.message}`))
        }
    }

    
}

export const config ={
    api: {
        bodyParser: false,
        externalResolver: true
    }
}