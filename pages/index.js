
import {getList } from "../lib/posts"
const rootDirectory = "_posts"


const Index = ({allPosts}) => {
    return (
    <div>
        <h1>Connecting Dots</h1>
        <hr />
        <ul>
        {
            allPosts.map((post) => <li key={post.path}><a href={"posts/" + post.path}><h3>{post.title}</h3></a></li>)
        }
        </ul>
    </div>)
}
export default Index;


export async function getStaticProps() {
    const allPosts = await getList();
    return {
        props: { allPosts },
    }
}