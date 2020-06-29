import renderHTML from 'react-render-html';
import fetch from 'node-fetch'
import Layout from '../../components/Layout'

const Page = ({ page }) => {
    console.log('singe page', page)
    return (
        <Layout>
            <div className="container">
                <h2 className='display-4'>{page.title.rendered}</h2>
                {renderHTML(page.content.rendered)}
            </div>
        </Layout>
    );
};

// For All page
export async function getPost() {
    const res = await fetch('https://kidsrctoys.com/admin/wp-json/wp/v2/pages')
    const data = await res.json()
    return data
}


export async function getStaticProps(context) {
    const allpost = await getPost()
    const singlepage = allpost.find(({ slug }) => slug === context.params.slug)

    return {
        props: {
            page: singlepage
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

export default Page