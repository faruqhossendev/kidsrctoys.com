import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Link from 'next/link';

const Banner = () => {

    const [banners, setBanners] = useState([])
    useEffect(() => {
        Axios.get('https://kidsrctoys.com/admin/wp-json/wp/v2/adds_header')
            .then((ban) => {
                setBanners(ban.data)
            })
            .catch()
    }, [])
    return (
        <div className='container'>
            {
                banners.map(banner => {
                    return (
                        <div key={banner.id} className='banner_photo'>
                           <a href={banner.acf.banner_url} target='_blank'><img src={banner.acf.banner_image.url} alt={banner.acf.banner_image.alt} /></a>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Banner;