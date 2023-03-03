import { getProductBySlug, getProductsData } from "../../src/utils/constants/products";
import { useRouter } from "next/router";
import { HEADER_FOOTER_ENDPOINT } from "../../src/utils/constants/endpoints";
import axios from "axios";
import SingleProduct from '../../src/components/single-product';
import Header from "../../src/components/layouts/header";

export default function Product ({headerFooter, product}) {
    const router = useRouter();

	const { header, footer } = headerFooter || {};
	const {productbyslug} = product || {};

    if(router.isFallback){
        return <div>Loading...</div>
    }
    return (
		<div>
			<Header header={header}/>
			<SingleProduct product={ product }/>
		</div>
	);
}

export async function getStaticProps( { params } ) {
	
	const { slug } = params || {};
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const { data: product } = await getProductBySlug( slug );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			product: product.length ? product[ 0 ] : {},
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const { data: products } = await getProductsData();
	
	// Expected Data Shape: [{ params: { slug: 'pendant' } }, { params: { slug: 'shirt' } }],
	const pathsData = [];
	
	products.length && products.map( ( product ) => {
		if ( product.slug ) {
			pathsData.push( { params: { slug: product.slug ?? '' } } );
		}
	} );
	
	return {
		paths: pathsData,
		fallback: true,
	};
}