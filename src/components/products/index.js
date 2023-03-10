import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import Blogs from '../blogs/blogs';


const Products = ({ products }) => {
    console.log(products);
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	return (  
        <div className='view border bg-white rounded bg-gray-50 max-w-4xl mx-auto'><p className='font-bold'>Popular Refrigerators</p><p className='p'>view all</p><Image src="/arrowR.svg" width={20} height={20}/>
        <div className="flex mt-5 bg-white mx-auto flex-wrap i max-w-4xl overflow-hidden border rounded space-between ">
			{  
            products.length ? products.slice(0,8).map( product => {
				const img = product?.images?.[0] ?? {}; 
                const cat = product?.categories?.[0] ?? {};
                if(cat?.name === 'refrigerator'){  
				return (
                    <div key={ product?.id } className="image w-full border overflow-hidden sm:w-1/2 md:w-1/2 xl:w-1/4">
						<Link href={`/product/ ${product?.slug ?? ''}`}>
                            <Image 
                                sourceurl={ img?.src ?? '' }
                                alttext={ img?.alt ?? ''}
                                title={ product?.name ?? '' }
                                width="75"
                                height="150"
                            />
                             <h3 className="font-bold uppercase">{ product?.name ?? '' }</h3>
                             <div  className='price' dangerouslySetInnerHTML={{ __html: sanitize( product?.price_html ?? '' ) }}/>
                        </Link>
                         <div className='dots'><Image src="/dots.svg" width={10} height={10}/></div>  
					</div>
                );}
                else{
                    return null;
                }
			} ) : null }
        </div>
		</div>
    );
}
export default Products;