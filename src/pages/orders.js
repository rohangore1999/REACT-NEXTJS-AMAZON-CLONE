import { getSession, useSession } from 'next-auth/client';
import React from 'react';
import { db } from '../../firebase';
import Header from '../components/Header';
import moment from 'moment'
import Order from '../components/Order';


function Orders({ orders }) {
    const [session] = useSession()

    console.log("orders >>>", orders)

    return (
        <div>
            <Header />

            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>

                {session ? (
                    <h2>{orders.length} order</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className='mt-5 space-y-4'>
                    {orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
                        <Order key={id} id={id} amount={amount} amountShipping={amountShipping} items={items} timestamp={timestamp} images={images} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Orders;


// to fetch orders we will be doing server side rendering
// anything inside getServerSideProps >> is node.js
export async function getServerSideProps(context) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await getSession(context);

    // get the users logged in credentials
    // note in serverside(node js) instead of useSession we have getSession
    // passing context as it contain: request, response etc so as to get our users details

    // if no session then we are returning with empty props
    if (!session) {
        return {
            props: {}
        }
    }

    // getting data from firebase db
    const stripeOrders = await db.collection("users").doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();
    //.get() >>> we will simply get the details from the db
    console.log("stripeOrders >>> ", stripeOrders)

    // getting data from stripe order

    // Now we have all the Orders in the list in stripeOrders, then need to go through every single firebase item and get the corresponding stripe data from stripe API, so for that we need go through loop of each items and request each one so for that we need make promise for each one because of async.
    // So we are wrapping all in Promise.all, so because of this now it will wait for all the request to complete and then send the promise
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );

    console.log("orders >>> ", orders)

    return {
        props: {
            orders
        }
    };

}