import Head from "next/head";
import Header from "../../src/components/layouts/header";
import axios from "axios";
import { getPostSlugs } from "../../lib/posts";
import { getSinglePost } from "../../lib/posts";
import { HEADER_FOOTER_ENDPOINT } from "../../src/utils/constants/endpoints";
import FeaturedImage from "../FeaturedImage";
import Date from "../../src/components/Date";

export async function getStaticProps({params}) {
    const postData = await getSinglePost(params.postSlug);
    const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );

    let featuredImageUrl = "https://wp.abhinavr.com/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

    if(postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl) {
        featuredImageUrl = postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
    }

    return {
        props: {
            postData: postData,
            headerFooter: headerFooterData?.data ?? {},
            featuredImageUrl: "url(" + featuredImageUrl + ")",
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const postSlugs = await getPostSlugs();

    return {
        paths: postSlugs.map((s) => (
            {
                params: {
                    postSlug: s.slug
                }
            }
        )),
        fallback: false 
    };
}

export default function Post({postData, headerFooter}){
    const { header, footer } = headerFooter || {};
    return(
        <>
         <Head>
            <title key={postData.slug}>{postData.title}</title>
            <meta  name="description " content={postData.excerpt} key="metadescription" />
        </Head>
        <section className="bg-opacity-70 text-slate-700 absolute w-full z-20">
        <Header header={header}/>
        </section>
        <article>
            <section className="hero-area h-[60vh] min-h-[30rem]">
                <div className="absolute inset-0  opacity-40"></div>

                <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
                    <h1 className="text-6xl text-center text-slate-700 relative z-10 py-8 mt-12">{postData.title}</h1>

                    <div className="pb-4 text-slate-500 z-10">
                        Posted by Niels  , last updated on <Date dateString={postData.modified} />
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: postData.excerpt }} className="relative z-10 text-left text-slate-00 text-2xl pl-4 border-l-4 border-lime-200"/>
                </div>
            </section>
            <section className="content-area py-8">
                <div dangerouslySetInnerHTML={{ __html: postData.content }} className="post-content container lg:max-w-4xl mx-auto"/>
            </section>
        </article>
    
        </>
    );
}