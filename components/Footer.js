import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import Link from 'next/link';



const Footer = () => {
    const [pages, setPages] = useState([])


    useEffect(() => {
        const pageURL = 'http://hometoos.com/kidsrctoys/wp-json/wp/v2/pages'
        Axios.get(pageURL)
            .then((res) => {
                setPages(res.data)
            })
            .catch(err => console.log(err))

    }, [])
    return (
        <>

            <div className="container-fluid bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <nav className="nav text-light">
                                
                                {
                                    pages.map(page => {
                                        return (
                                            <li className="nav-item" key={page.id} >
                                                <Link href="/page/[slug]" as={`page/${page.slug}`}><a className="nav-link text-light my-2 mr-2 p-0 font-weight-bold">{page.title.rendered}</a></Link>
                                            </li>
                                        )
                                    })
                                }
                            </nav>
                        </div>
                        <div className="col-md-6 ">
                            <p className='text-light mt-1 font-weight-light'>@{(new Date().getFullYear())}@  All Right Reserved and <a href="http://faruqhossen.com/" target='_blank'>Developed</a> by kidsrctoys</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;