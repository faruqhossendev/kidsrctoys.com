import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Head from 'next/head'
import Link from 'next/link';
import Nav from './Nav'
import Banner from './Banner'
import Footer from './Footer'

const Layout = ({ children }) => {
    const [keyword, setKeyword] = useState('')
    const [allproducts, setAllporducts] = useState([])

    const [sortby, setSortby] = useState('high')

    const keywordChangeHandlar = (event) => {
        return setKeyword(event.target.value)
    }



    // For Search Product
    useEffect(() => {
        const postURL = 'http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts'
        {
            keyword &&
                Axios.get(postURL)
                    .then(posts => {
                        // setLoading(true)
                        setAllporducts(posts.data)

                        const results = posts.data.filter((product) => {
                            return product.title.rendered.toLowerCase().includes(keyword)
                        })
                        setAllporducts(results)
                        setAllporducts(sortData)
                    })
                    .catch(err => console.log(err))
        }
    }, [keyword])
    return (
        <>
            <Banner />
            <Nav keyword={keyword} keywordChangeHandlar={keywordChangeHandlar} />
            {keyword.length == 0 && children}
            {keyword &&
                <div className="container">
                <div className="row">
                  {
                    allproducts.map(products => {
                      // console.log('card data', products.acf)
                      return (
                        <div className="col-md-4 p-2" key={products.id}>
                          <div className="card">
                            <Link href='/[slug]' as={`/${products.slug}`}><a className='text-decoration-none card-header text-body'><h6>{products.title.rendered}</h6></a></Link>
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
            }
            <Footer />
        </>
    );
};

export default Layout;