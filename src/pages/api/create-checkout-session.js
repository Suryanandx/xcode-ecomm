const stripe = require('stripe')('sk_test_51HgBkHJIIptxRaxXNeWMYTOkNATPd50rJMkmMVdKMnC454VTekgeUUOuyeXfBTD3j5vPa9ALcvAEOt7AVf7ybzPI00iZs6SBC9')

export default async (req, res) => {
    const {items, email} = req.body;
    console.log(items)
    console.log(email)
    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'inr',
            unit_amount: item.price*100 ,
            product_data: {
                name: item.title,
                images: [item.image],
            }
        }
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ['shr_1Ixr8xJIIptxRaxX7akndv5X'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA', 'IN']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    })

    res.status(200).json({id: session.id})
}