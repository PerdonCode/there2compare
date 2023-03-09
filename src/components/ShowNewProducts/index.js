import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';



const NewProducts = ({ products }) => {
    console.log(products);
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	return (  
        <div className='view mt-10  border bg-white rounded bg-gray-50 max-w-4xl mx-auto'><p className='font-bold uppercase mb-2 mt-2 ml-5'>Popular new Products</p>
        <div className="flex bg-white mx-auto flex-wrap i max-w-4xl overflow-hidden border rounded space-between ">
			{  
            products.length ? products.slice(0,12).map( product => {
				const img = product?.images?.[0] ?? {}; 
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
                );
			} ) : null }
        </div>
		</div>
    );
}
export default NewProducts;