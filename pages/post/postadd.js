import fetch from 'node-fetch'

const postadd = ({posts}) => {

    return (
        <div>
            {/* {
                posts.map(banner => {
                    return (
                        <div key={banner.id} className='banner_photo'>
                            <a href=""><img src={banner.acf.banner_image.url} alt={banner.acf.banner_image.alt} /></a>
                        </div>
                    )
                })
            } */}
        </div>
    );
};

export async function getPost() {
    const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts')
    const data = await res.json()
    return data
}

export async function getStaticProps(context) {
    const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/adds_post')
     const posts = await res.json()

     const some = await getPost()
  
    return {
      props: { posts }
    }
  }

export default postadd;