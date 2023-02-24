import { getProductsData } from "../../src/utils/constants/products";

export default function Product () {
    return null;
}
 
export async function getStaticPaths(){
    const {data: products} = await getProductsData()
} 