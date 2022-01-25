import { session, useSession } from 'next-auth/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/CheckoutProduct';
import Header from '../components/Header';
import { selectItems, selectTotal } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
    // pull the data from the redux store
    const items = useSelector(selectItems)

    // to pull the total price data
    const total = useSelector(selectTotal)

    // to get the current user's login details
    const [session] = useSession()


    // checkout session when click on Checkout button
    const createCheckoutSession = async () => {
        // getting the stripe instance
        const stripe = await stripePromise

        // call the backend to create a checkout session...
        // using axios making post request to our api and in body passing json obj items(data from the redux store) and email
        const checkoutSession = await axios.post('/api/create-checkout-session',
            {
                items: items,
                email: session.user.email
            }
        )

        // redirect user/customer to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message)
        }
    }

    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src={'https://links.papareact.com/ikj'} width={1020} height={250} objectFit='contain' />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length == 0 ? (
                                "Your Amazon Basket is empty"
                            ) : "Your Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct key={i} id={item.id} title={item.title} rating={item.rating} price={item.price} description={item.description} category={item.category} image={item.image} hasPrime={item.hasPrime} />
                        ))}
                    </div>
                </div>




                {/* Right */}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items): {" "}
                                <span className='font-bold'>
                                    <Currency quantity={total} currency="INR" />
                                </span>
                            </h2>

                            <button onClick={createCheckoutSession} role={'link'} disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 tp-gray-500   border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>

        </div>
    );
}

export default Checkout;