// end point for next js

// stripe dependency
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    // sending from checkout.js
    // pulling the items and email from req.body as we are sending the them in the body of our request
    const { items, email } = req.body;

    // converting our items into the stripe required format
    const transformedItems = items.map((item) => ({
        // implicit json return >> in that no need to write return statement >>> ({})

        description: item.description,
        quantity: 1, // as we have only one quantity for each time we click add to cart

        // price_data >> is what stripe expect from us
        price_data: {
            currency: 'inr',
            unit_amount: item.price * 100, // 100 paisa means 1 rs
            product_data: {
                name: item.title,
                images: [item.image]
            },

        }
    }))

    // communicate with the stripe that "here is my item create a checkout session"
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1KLX8QSCairAhYeJp6aceITE'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: "https://react-nextjs-amazon-clone-hco1gqyzw-rohangore1999.vercel.app/success",
        cancel_url: "https://react-nextjs-amazon-clone-hco1gqyzw-rohangore1999.vercel.app/checkout",
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)) //making the array of one massive string
        }
    })

    // after request to API you need to give response from API
    res.status(200).json({ id: session.id })
}