import { useSelector } from "react-redux"
import CheckoutProduct from "../components/CheckoutProduct"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/basketSlice"
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import Footer from "../components/Footer"

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()
    console.log(items)
    const stripePromise = loadStripe(process.env.stripe_public_key)
    const  createCheckoutSession = async () => {
            const stripe = await stripePromise

            //call the backend to create checkout session
        const checkoutSession = await axios.post("/api/create-checkout-session", 
            {
                items: items,
                email: session.user.email
            }
        )
        //Redirect user to stripe Checkout page
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        } )
        if(result.error){
            alert(result.error.message)
        }
        }
    return (
        <div className='bg-gray-100'>
           <Header/>
           <main className='lg:flex max-w-screen-2xl mx-auto'>
            {/* Left section */}

            <div className='flex-grow m-5 shadow-sm'>
               
               
                 <img
                style={{objectFit: 'contain'}}
                width={1020}
                height={250}
                 src="https://www.coolmilk.com/wp-content/uploads/250-newsletter-banner-advert.png" alt="Advert" />

               
            <div className="flex flex-col p-5 space-y-10 bg-white">
                <h1 className="text-3xl border-b pb-4" >
                {
                    items.length === 0 ? 'You have to add items to proceed' : 'Shopping cart'
                }
                </h1>
                {
                    items.map((item, i) => (
                        <CheckoutProduct 
                        key={i}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        category={item.category}
                        image={item.image}
                        />
                    ))
                }
            </div>
            </div>
            {/* Right section */}
            <div className='flex flex-col bg-white p-10 shadow-md'>
                {
                    items.length > 0 && (
                <>
                    <h2 className='whitespace-nowrap'>Sub Total ({items.length} items): {" "}
                        <span className='font-bold'>
                            <Currency quantity={total} currency='INR' />
                        </span>
                        </h2>

                        <button onClick={createCheckoutSession} role='link' disabled={!session} className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>{!session? "Sign In to checkout" : "Proceed to Checkout"}</button>
                  </>
                    )
                          
                }
            </div>
           </main>
           <Footer/>
        </div>
    ) }

export default Checkout
