// https://github.com/sonnysangha/Amazon-starter-template-nextjs >>> by SONAY SINGHA

import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products, session }) {
  // console.log(products)
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon - Clone</title>
      </Head>

      {/* Header */}
      <Header />


      <main className="max-w-screen-2xl mx-auto">
        {/* banner */}
        <Banner />

        {/* product feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}



// USING SERVER SIDE RENDERING

export async function getServerSideProps(context) {
  // to load session on server side
  const session = await getSession(context);

  // sending GET request to "https://link.papareact.com/products"
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  )

  return {
    props: {
      products,
      session
    }
  }

}