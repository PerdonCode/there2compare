import { isArray, isEmpty } from 'lodash';
import Link from 'next/link';
import Image from 'next/image';



const Blogs = ({ posts }) => {
    console.log(posts);
	
    if ( isEmpty( posts ) || !isArray( posts ) ) {
		return null;
	}
	return(
        <div className="flex mt-14 mx-auto flex-wrap i max-w-4xl overflow-hidden border rounded space-between ">
            { posts.length ? posts.slice(0,4).map( posts => {
                
                const mystring = posts?.content?.rendered.slice(4,98) + '...';
                return(
                <div key={ posts?.id } className="blog">
                    <Link href={`/news/ ${posts?.slug ?? ''}`}>
                    <Image 
                                sourceurl={ posts?.jetpack_featured_media_url ?? '' }
                                width="75"
                                height="150"
                            />
                    <h3 className="font-bold uppercase">{ posts?.title?.rendered ?? '' }</h3>
                    <h3 className=''>{mystring }</h3>
                    </Link>
                </div>
           ); 
           } ) : null }
        </div>
        
        );
}
export default Blogs;