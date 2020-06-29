import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'


const Nav = ({keyword, keywordChangeHandlar}) => {
    const [menus, setMenus] = useState([])
    const [pages, setPages] = useState([])
    const [catagorys, setCatagorys] = useState([])



    useEffect(() => {
        const menuURL = 'https://kidsrctoys.com/admin/wp-json/menus/v1/menus/mainMenu'
        Axios.get(menuURL)
            .then(res => {
                setMenus(res.data.items)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const catatoryURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/categories'
        Axios.get(catatoryURL)
            .then((res) => {
                setCatagorys(res.data)
            })
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        const pageURL = 'https://kidsrctoys.com/admin/wp-json/wp/v2/pages'
        Axios.get(pageURL)
            .then((res) => {
                setPages(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div className="container-fluid bg-dark my-1 sticky-top">
            <div className="container">





                <nav className=" navbar navbar-expand-lg navbar-dark bg-dark font-weight-bold "  >
                    <Link href="/" ><a className="navbar-brand">KIDRCTOYS</a></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            
                            {
                                pages.map(page => {
                                    return (
                                        <li className="nav-item" key={page.id} >
                                            <Link href="/page/[slug]" as={`/page/${page.slug}`}><a className="nav-link ml-2">{page.title.rendered}</a></Link>
                                        </li>
                                    )
                                })
                            }
                            {
                                menus.map(menu => {
                                    return (
                                        <li className="nav-item" key={menu.ID}>
                                            <Link href="/products/[slug]" as={`/products/${menu.slug}`} ><a className="nav-link ml-2">{menu.title}</a></Link>
                                        </li>
                                    )
                                })
                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    All Cagagory </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        catagorys.map((catagory) => {
                                            return (
                                                <div key={catagory.id}>
                                                    <Link href="/products/[slug]" as={`/products/${catagory.slug}`} ><a className="dropdown-item">{catagory.name}</a></Link>
                                                    <div className="dropdown-divider"></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={keywordChangeHandlar} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    )





}




export default Nav;