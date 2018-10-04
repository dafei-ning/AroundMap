import React from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

export class Gallery extends React.Component {

	static propTypes = {
		images: PropTypes.arrayOf(
			PropTypes.shape({
				user: PropTypes.string.isRequired,
				src: PropTypes.string.isRequired,
				thumbnail: PropTypes.string.isRequired,
				caption: PropTypes.string,
				thumbnailWidth: PropTypes.number.isRequired,
				thumbnailHeight: PropTypes.number.isRequired
			})
			).isRequired
	}


	render() {

		var images =
		this.props.images.map((i) => {

			
			i.customOverlay = (
				<div style={captionStyle}>
					<div>{`${i.user}: ${i.caption}`}</div>
				</div>);
			return i;
		});

		return (
			<div style ={wrapperStyle}>
			<GridGallery 
			backdropClosesModal
			images={images}
			enableImageSelection={false} 
			/>
			</div>
			);
	}
}

const wrapperStyle = {
	display: "block",
	minHeight: "1px",
	width: "100%",
	border: "1px solid #ddd",
	overflow: "auto"
}

const captionStyle = {
	backgroundColor: "rgba(0, 0, 0, 0.8)",
	maxHeight: "240px",
	overflow: "hidden",
	position: "absolute",
	bottom: "0",
	width: "100%",
	color: "white",
	padding: "2px",
	fontSize: "90%"
};

const imageList = [

{
	user: 'Dafei Ning',
	src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
	thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
	thumbnailWidth: 271,
	thumbnailHeight: 320,
	caption: "Orange Macro (Tom Eversley - isorepublic.com)"
},
{
	user: 'Dafei Ning',
	src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
	thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
	thumbnailWidth: 320,
	thumbnailHeight: 190,

	caption: "286H (gratisography.com)"
},
{
	user: 'Dafei Ning',
	src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
	thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
	thumbnailWidth: 320,
	thumbnailHeight: 148,
	caption: "315H (gratisography.com)"
},
{
	user: 'Dafei Ning',
	src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
	thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
	thumbnailWidth: 320,
	thumbnailHeight: 213,
	caption: "201H (gratisography.com)"
},
{
	user: 'Dafei Ning',
	src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
	thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
	thumbnailWidth: 248,
	thumbnailHeight: 320,
	caption: "Big Ben (Tom Eversley - isorepublic.com)"
}
];