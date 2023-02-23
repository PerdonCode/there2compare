import Img from 'next/image';

import PropTypes from 'prop-types';
import cx from 'classnames';
import {DEFAULT_IMG_URL} from '../../utils/constants/images';

/**
 * Image Component.
 * We don't need to add srcSet, as Next js will generate that.
 * @see https://nextjs.org/docs/api-reference/next/image#other-props
 * @see https://nextjs.org/docs/basic-features/image-optimization#device-sizes
 *
 * @param {Object} props Component props.
 *
 * @return {jsx}
 */
const Image = ( props ) => {
	const {alttext, title, width, height, sourceurl, className, layout, objectFit, containerClassNames, showDefault, ...rest} = props;
	
	if ( ! sourceurl && ! showDefault ) {
		return null;
	}
	
	/**
	 * If we use layout = fill then, width and height of the image cannot be used.
	 * and the image fills on the entire width and the height of its parent container.
	 * That's we need to wrap our image in a container and give it a height and width.
	 * Notice that in this case, the given height and width is being used for container and not img.
	 */
	if ( 'fill' === layout ) {
		const attributes = {
			alt: alttext || title,
			src: sourceurl || ( showDefault ? DEFAULT_IMG_URL : '' ),
			layout: 'fill',
			className: cx( 'object-cover', className ),
			...rest
		};
		
		return (
			<div className={cx( 'relative', containerClassNames ) }>
				<Img {...attributes}/>
			</div>
		);
	} else {
		const attributes = {
			alt: alttext || title,
			src: sourceurl || ( showDefault ? DEFAULT_IMG_URL : '' ),
			width: width || 'auto',
			height: height || 'auto',
			className,
			...rest
		};
		return <Img {...attributes} />;
	}
};

Image.propTypes = {
	alttext: PropTypes.string,
	title: PropTypes.string,
	sourceurl: PropTypes.string,
	layout: PropTypes.string,
	showDefault: PropTypes.bool,
	containerClassName: PropTypes.string,
	className: PropTypes.string
};

Image.defaultProps = {
	alttext: '',
	title: '',
	sourceurl: '',
	showDefault: true,
	containerClassNames: '',
	className: 'product__image',
};

export default Image;