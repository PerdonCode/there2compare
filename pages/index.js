/**
 * Internal Dependencies.
 */
import { GET_POSTS_ENDPOINT,  HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import Header from '../src/components/layouts/header';
import Footer from '../src/components/layouts/footer';
import Products from '../src/components/products';
import Blogs from '../src/components/blogs/blogs';
import { getPostList } from '../lib/posts';
import { useState } from 'react';

/**
 * External Dependencies.
 */
import axios from 'axios';
import { getProductsData } from '../src/utils/constants/products';
import NewProducts from '../src/components/ShowNewProducts';

export default function Home({headerFooter, products, allPosts}) {
	const { header, footer } = headerFooter || {};
	const [posts, setPosts] = useState(allPosts);

	return (
		<div className='bg-gray-50'>
			<Header header={header}/>
			<main className='container mx-auto py-4'>
				<Products products={products}/>
				<Blogs posts={posts}/>
				<NewProducts products={products}/>
			</main>
		</div>
	)
}

export async function getStaticProps() {
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const allPosts = await getPostList();
	const { data: products } = await getProductsData();
	const { data: blogs } = await axios.get(GET_POSTS_ENDPOINT);
	
	return {
		props: {
			allPosts: allPosts,
			headerFooter: headerFooterData?.data ?? {},
			products: products ?? {},
			posts:  blogs ?? {}
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
