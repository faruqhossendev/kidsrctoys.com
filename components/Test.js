import Axios from 'axios'
import { useState, useEffect } from 'react';

const Test = () => {
    const [allproduct, setAllproduct] = useState([])
    const [sortby, setSortby] = useState('')

    // For Search Product
    useEffect(() => {
        const postURL = 'http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts'
        {
            Axios.get(postURL)
                .then(posts => {
                    setAllproduct(posts.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    useEffect(() => {
        // const sortData = allproduct.sort((a, b) => {
        //     if (sortby == 'high') {
        //         return a.acf.price - b.acf.price
        //     }
        //     if (sortby == 'low') {
        //         return b.acf.price - a.acf.price
        //     }
        // })
        {
            sortby
        }



        console.log('sort data', sortData)
        // console.log('allproduct', allproduct)

    }, [sortby])

    const sortHandaler = (e)=>{
        setSortby(e.target.value)
    }

    console.log('sort By', sortby)

    return (
        <div>
            <div>
                <label htmlFor="cars">Choose a car:</label>

                <select name="cars" id="cars" onChange={sortHandaler}>
                    <option value="">filter</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                </select>
            </div>
            {
                allproduct.map(product => {
                    // console.log(product)
                    return (
                        <li key={product.id}>
                            <p>name: {product.title.rendered}</p>
                            <p>Price: {product.acf.price}</p>
                        </li>
                    )
                })
            }
        </div>
    );
};

export default Test;