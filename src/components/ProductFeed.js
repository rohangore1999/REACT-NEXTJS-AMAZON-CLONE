import React from 'react';
import Product from './Product';

function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {/* slice(0, 4) >>> it will show 1st 4 item */}
            {products.slice(0, 4).map(({ id, title, description, category, image, price }) => (
                <Product key={id} id={id} title={title} description={description} category={category} image={image} price={price} />
            ))}

            {/* Add image */}
            <img className="md:col-span-full" src='https://links.papareact.com/dyz' alt="" />

            {/* for image to take 2 cols */}
            <div className='md:col-span-2'> {/* after medium break point span (take) two cols  */}
                {/* slice(0, 4) >>> it will show 1st 4 item */}
                {products.slice(4, 5).map(({ id, title, description, category, image, price }) => (
                    <Product key={id} id={id} title={title} description={description} category={category} image={image} price={price} />
                ))}
            </div>

            {/* show rest of the products */}
            {products.slice(5, (products.length-1)).map(({ id, title, description, category, image, price }) => (
                <Product key={id} id={id} title={title} description={description} category={category} image={image} price={price} />
            ))}

        </div>
    );
}

export default ProductFeed;
