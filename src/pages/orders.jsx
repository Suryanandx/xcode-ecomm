import { getSession, useSession } from "next-auth/client"
import Header from "../components/Header"
import { db } from "../firebase"
import moment from 'moment'
import Order from "../components/Order"
import Footer from "../components/Footer"

function orders({orders}) {
    const [session] = useSession()
    console.log(orders)
    return (
        <div>
            <Header/>
            <main className="max-w-screen-lg mx-auto p-10">
                    <h1 className="text-3xl border-b mb-2 pb-1 border-blue-400">
                        Your Orders 
                    </h1>
                    {session ? (
                        <h2>{orders.length} orders</h2>
                    ) : (
                        <h2>Sign In to see your orders</h2>
                    )}

                    <div className='mt-5 space-y-4'>
                        {
                            orders?.map(({id, amount, amountShipping,items, timeStamp, images }) => (
                                <Order
                                id={id}
                                 key={id} 
                                 amount={amount} 
                                 amountShipping={amountShipping}
                                 items={items}
                                 timestamp={timeStamp}
                                 images={images}
                                 />
                            ))
                        }
                    </div>
            </main>
            <Footer/>
        </div>
    )
}

export default orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
    //Get the users logged in state
    const session = await getSession(context)
   
    if(!session){
        return {
            props: {

            }
        }
    }

    //firebase db
    const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

    //stripe orders 
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timeStamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit:100
                })
            ).data
        }) )
    )

    return  {
        props: {
            orders,
            session
        }
    }
}
