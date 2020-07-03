import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import Axios from 'axios'
import Link from 'next/link';
import fetch from 'node-fetch'
import Layout from '../components/Layout'

const Post = ({ post, postadds }) => {
    const [relatedpost, setRelatedpost] = useState([])

    console.log('Single post', post)
    console.log('Single catagory', post.categories[0])
    console.log('all post ', relatedpost)

    useEffect(() => {
        const catagorypostURL = `http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts?categories=${post.categories[0]}`
        Axios.get(catagorypostURL)
            .then((allpost) => {
                setRelatedpost(allpost.data)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <h3 className='post_title'>{post.title.rendered}</h3>
                        {renderHTML(post.content.rendered)}
                    </div>
                    <div className="col-sm-3">
                        {
                            postadds.map(add => {
                                console.log('post image', add)
                                return <div key={add.id}>
                                    <a href={add.acf.banner_url} target='_blank'>
                                        <img className='post_banner_img' src={add.acf.banner_image.url} alt={add.acf.banner_image.alt} />
                                    </a>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="container">
                <hr />
                <h2 className='post_title'>Relate products ...........</h2>
                <div className="row">
                    {relatedpost &&
                        relatedpost.map(products => {
                            return (
                                <div className="col-sm-6 col-md-4 p-2 " key={products.id}>
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
    );
};


// For All post
export async function getPost() {
    const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts')
    const data = await res.json()
    return data
}

// For Adds 
export async function getAdds() {
    const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/adds_post')
    const adds = await res.json()
    return adds
}

export async function getStaticProps(context) {
    const allpost = await getPost()
    const singlepost = allpost.find(({ slug }) => slug === context.params.slug)

    const postadds = await getAdds()

    return {
        props: {
            post: singlepost,
            postadds
        }
    }
}


export async function getStaticPaths() {
    const posts = await getPost()
    const paths = posts.map(post => ({ params: { slug: post.slug } }))

    return {
        paths,
        fallback: false
    }
}


export default Post;

// paths: [
//     {params: {slug: 'hello-world'}},
//     {params: {slug: 'kruger-shalati-train-lodge'}},
//     {params: {slug: 'kruger-shalati-train-lodge-2'}}
// ],