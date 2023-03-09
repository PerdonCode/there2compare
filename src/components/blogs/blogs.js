import Link from "next/link";
import FeaturedImage from "../../../pages/FeaturedImage";
import Date from "../Date";
import Image from "next/image";

const Blogs = ({ posts }) => {
    console.log(posts);

    return (
        <>
        <main>
        <div className='view border mt-10 rounded bg-gray-50 max-w-4xl mx-auto'><Link href={`/blog`}><Image src="/arrowR.svg" width={20} height={20}/></Link>
            <section className="flex mt-5 mx-auto flex-wrap bg-white  max-w-4xl overflow-hidden border rounded">
                <ul>
                    {
                        posts.nodes.slice(0,3).map((post) => (
                            <li key={post.slug} className="grid grid-cols-5 gap-4 mr-2 border-t-2 rounded ">
                                <div className="resize col-span-2 mt-4">
                                    <FeaturedImage  post={post} />
                                </div>
                                <div className="col-span-3">
                                    <h2 className="py-1">
                                        <Link href={`/blog/${post.slug}`} className="text-blue-400 text-2xl hover:text-blue-600">{post.title}</Link>
                                    </h2>
                                    <div className="py-1">
                                       Published on  <Date dateString={post.date} />
                                    </div>
                                    <Link href={`/blog/${post.slug}`} ><div className="text-l" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div></Link>
                                    <div className="py-2">
                                       Posted under  {
                                            post.categories.nodes.map((category) => (
                                                <Link className="text-blue-400 hover:text-blue-500" href={`/category/${category.slug}`} key={category.slug}>
                                                    {category.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
            </div>
        </main>
        </>
    );
}
export default Blogs;



