import { getList, getSingle } from "../../lib/posts";



const Post = ({post}) => {
    return (<div>
        <h2><a href="/">Connecting Dots</a></h2>
        <hr />
        <h1>{post.content.attributes.title}</h1>
        
        <div dangerouslySetInnerHTML={{__html: post.content.body}}></div>
    </div>)
}

export default Post;

export async function getStaticPaths() {
    const list = await getList();
    const paths = list.map((item) => ({params: {slug: [item.path]}}))
    return {paths, fallback: false};
}

export async function getStaticProps({params}) {
    const single = await getSingle(...params.slug)
    return {
        props: {post: single}
    }
}