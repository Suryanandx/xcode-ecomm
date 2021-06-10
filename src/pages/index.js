import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsFeed from "../components/ProductsFeed";

export default function Home({products}) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Ecommerce </title>
      </Head>
     
    <Header/> 
    <main className='max-w-screen-2xl mx-auto'>
      {/* Banner */}
    <Banner/>
    <ProductsFeed products={products}/>
    </main>
    <Footer/>
    </div>
  );
}

export async function getServerSideProps(context){
  
  const products = await  fetch('https://fakestoreapi.com/products' ).then((res) => res.json())
  return {
    props: {
      products,
      
    }
  }
}