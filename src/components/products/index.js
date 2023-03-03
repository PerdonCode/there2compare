import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';

const Products = ({ products }) => {
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	return (
        <div className="flex mx-auto flex-wrap i max-w-5xl overflow-hidden border rounded space-between ">
			{ products.length ? products.map( product => {
				const img = product?.images?.[0] ?? {};
				return (
                    <div key={ product?.id } className="w-full border overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/3">
						<Link href={`/product/ ${product?.slug ?? ''}`}>
                            <Image
                                sourceurl={ img?.src ?? '' }
                                alttext={ img?.alt ?? ''}
                                title={ product?.name ?? '' }
                                width="150"
                                height="150"
                            />
                             <h3 className="font-bold uppercase">{ product?.name ?? '' }</h3>
                             <div dangerouslySetInnerHTML={{ __html: sanitize( product?.price_html ?? '' ) }}/>
                        </Link>
					</div>
                );
			} ) : null }
		</div>
    );
}

export default Products;