import { buffer } from 'micro'
import * as admin from 'firebase-admin'; // in node we required different firebase

// secure a connection to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json');

// checking if the app is initialize already if not then only initialized
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) :
    admin.app();


// establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


const fulfillOrder = async (session) => {
    console.log('Fulfilling the order', session)

    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images), //JSON.parse >> will give the Javascript object; As JSON.stringify gives use string
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log(`Success: Order ${session.id} has been added to the DB`)
        })
}


export default async (req, res) => {
    // checking if the request is the post
    if (req.method === "POST") {
        const requestBuffer = await buffer(req)

        const payload = requestBuffer.toString()

        const sig = req.headers["stripe-signature"]

        let event;

        // verifty that the event posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err) {
            console.log("ERROR", err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }


        // handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // fulfilled the order
            // after webhook it will store the data to firestore
            return fulfillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send(`WEBHOOK ERROR: ${err.message}`))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}