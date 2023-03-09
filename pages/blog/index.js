import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { getPostList } from "../../lib/posts";
import FeaturedImage from "../FeaturedImage";
import Header from "../../src/components/layouts/header";
import { HEADER_FOOTER_ENDPOINT } from "../../src/utils/constants/endpoints";
import axios from "axios";
import Date from "../../src/components/Date";



export async function getStaticProps() {
    const allPosts = await getPostList();
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
    return {
        props: {
            allPosts: allPosts,
            headerFooter: headerFooterData?.data ?? {},
        },
        revalidate: 1,
    }
}
export default function BlogHome({ allPosts, headerFooter  }) {
    const { header, footer } = headerFooter || {};

    const [posts, setPosts] = useState(allPosts);

    return (
        <>
        <Header header={header}/>
        <Head>
            <title>Blog</title>
        </Head>
        <div className="h-[50vh] min-h-[20rem] ">
            <h1 className="text-6xl text-center text-slate-400 relative z-10 py-8">BLOG</h1>            

            <p className="relative z-10 text-center text-slate-700 text-2xl">Read our latest articles</p>

        </div>
        <main>
            <section className="container mx-auto lg:max-w-5xl post-list mt-4">
                <ul>
                    {
                        posts.nodes.map((post) => (
                            <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4">
                                <div className="col-span-2">
                                    <FeaturedImage post={post} />
                                </div>
                                <div className="col-span-3">
                                    <h2 className="py-4">
                                        <Link href={`/blog/${post.slug}`} className="text-blue-400 text-2xl hover:text-blue-600">{post.title}</Link>
                                    </h2>
                                    <div className="py-4">
                                       Published on  <Date dateString={post.date} />
                                    </div>
                                    <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                    <div className="py-4">
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
        </main>
        </>
    );
}




