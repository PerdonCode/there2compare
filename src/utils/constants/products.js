import { GET_POSTS_ENDPOINT } from "./endpoints";

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
	url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
	consumerKey: process.env.WC_CONSUMER_KEY,
	consumerSecret: process.env.WC_CONSUMER_SECRET,
	version: "wc/v3"
});

/**
 * Get Products.
 *
 * Endpoint /api/get-products or '/api/get-products?perPage=2'
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
export const getProductsData = async ( perPage = 50) =>  {
	
	return await api.get(
        'products',
        {
            per_page : perPage || 50,
        },
    );
};

export const getProductBySlug = async ( productSlug ) =>  {
	
	return await api.get(
        'products',
        {
            slug :productSlug || '',
        },
    );
};

