import Image from 'next/image';
import React, { useState } from 'react';

import { StarIcon } from '@heroicons/react/solid'

import Currency from 'react-currency-formatter';

// REDUX
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice'


const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    // for random 
    // it will generate number between MAX_RATING and MAX_RATING
    const [rating, setRating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    // for prime
    const [hasPrime, setPrime] = useState(Math.random() < 0.5); //Math.random() will generate number between 0 to 1


    // Dispatch to push the data into REDUX STORE
    const dispatch = useDispatch()

    // after clicking on add to cart button
    const addItemToBasket = () => {
        const product = { id, title, price, rating, description, category, image, hasPrime }

        // sending the product as an action to the Redux store..  basketSlice.js
        dispatch(addToBasket(product))
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image src={image} height={200} width={200} objectFit='contain' />

            <h4 className='my-3 '>{title}</h4>

            <div className='flex'>
                {Array(rating) //creating the Arrary of length rating (useState)
                    .fill() // filling with empty default value; if fill(2) then will show 2 and occurance will be number of rating mentioned
                    .map((_, i) => ( //we dont care about initial value, need index so i
                        <StarIcon key={i} className='h-4 w-5 text-yellow-500' />
                    ))

                }
            </div>
            {/* line-clamp-2 >>> after two line it will truncate ... */}
            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                <Currency quantity={price} currency='INR' />
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}

            <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
        </div>
    );
}

export default Product;
