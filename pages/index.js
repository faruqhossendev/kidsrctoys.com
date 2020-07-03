import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/Layout'
import { useState, useEffect } from 'react';

const Home = ({ posts }) => {



  

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container">
        <div className="row">
          {
            posts.map(products => {
              console.log('index js', products)
              return (
                <div className="col-md-4 p-2" key={products.id}>
                  <div className="card">
                    <Link href='/[slug]' as={`/${products.slug}`} ><a className='text-decoration-none card-header text-body' target='_blank'><h6>{products.title.rendered}</h6></a></Link>
                    <div className="card-body p-0">
                      <img src={products.better_featured_image.source_url} className="card-img-top" alt={products.better_featured_image.alt_text} />
                      <p className="card-text my-1 p-2 text-justify pro_desc">{products.acf.description}</p>
                      <div className='card-footer p-2'>
                        <p className='font-weight-bold text-secondary'>Price : $ {products.acf.price} </p>
                        <div className=''>
                          <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={products.acf.aliexpress_link} target='blank'>Amazone</a>
                          <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={products.acf.amazon_link} target='blank'>Ali Express</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}
export async function getStaticProps(context) {
  const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts')
   const posts = await res.json()

  return {
    props: { posts }, // will be passed to the page component as props
  }
}



export default Home