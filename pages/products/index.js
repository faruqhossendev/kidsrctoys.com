import React from 'react';

const Products = () => {
    return (
        <div>
        <div className='container'>
            <div className="row">
                <div className="col-md-3 border-right">
                    <ul className="list-group list-group-flush hover-color">
                        this is sidebar
                        {/* {
                            catagorys.map((catagory) => {
                                return (
                                    <li key={catagory.id} className='list-group-item list-group-item-action'>
                                        <Link onClick={() => catagoryIDHandaler(catagory.id)} to={`/products/${catagory.slug}`}  >{catagory.name}</Link>
                                    </li>
                                )
                            })
                        } */}
                    </ul>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        Main page
                        {/* {
                            keyword.length == 0 &&
                            posts.map((post) => {
                                // console.log('all Post', post)
                                return (

                                    <div className="col-md-4 p-2" key={post.id}>
                                        <div className="card">
                                            <Link onClick={() => getPostID(post.id)} to={`/${post.slug}`} className='text-decoration-none card-header text-body'><h6 >{post.title.rendered}</h6></Link>
                                            <div className="card-body p-0">
                                                <img src={post.better_featured_image.source_url} className="card-img-top" alt={post.better_featured_image.alt_text} />
                                                <p className="card-text my-1 p-2 text-justify pro_desc">{post.acf.description}</p>
                                                <div className='card-footer p-2'>
                                                    <p className='font-weight-bold text-secondary'>Price : ${post.acf.price} </p>
                                                    <div className=''>
                                                        <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={post.acf.aliexpress_link} target='blank'>Amazone</a>
                                                        <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={post.acf.amazon_link} target='blank'>Ali Express</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        } */}

                    </div>

                </div>
                
            </div>
        </div>
    </div>
    );
};











export default Products;