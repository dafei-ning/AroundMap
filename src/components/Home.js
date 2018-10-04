import React from 'react';

import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS } from '../Constant';
import {POS_KEY } from '../Constant';
import {Gallery} from './Gallery';

const TabPane = Tabs.TabPane;

const operations = <Button>Mistery Button</Button>;



export class Home extends React.Component {

	state = {
		loadingGeoLocation: false,
		error: '',
	}

	componentDidMount() {
		this.setState({loadingGeoLocation: true, error: ''});
		this.getGeoLocation();
	}


	getGeoLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				this.onSuccessLoadGeoLocation,
				this.onFailedLoadGeolocation,
				GEO_OPTIONS,
				);
		} else {
			this.setState({ error: '获得地址信息失败' });
		}
	}

	onSuccessLoadGeoLocation = (position) => {
		console.log(position);
		const { latitude, longitude } = position.coords;
		localStorage.setItem(POS_KEY, JSON.stringify({latitude, longitude}));
		this.setState({ loadingGeoLocation: false, error: '' });
	}

	onFailedLoadGeolocation = (error) => {
		console.log(error);
		this.setState({loadingGeoLocation: false, error: 'falied to get location'});
	}

	getGalleryPanelContent = () => {
		if (this.state.error) {
			return <div>{this.state.error}</div>;
		} else if (this.state.loadingGeoLocation) {
			return <Spin tip="loading..." />
		} else {
			return <Gallery images={imageList} />;
		}
	}



	render () {
		return (
			<Tabs tabBarExtraContent={operations} className="main-tabs">
			<TabPane tab="Post" key="1">Content of tab 1
			{this.getGalleryPanelContent()}
			</TabPane>
			<TabPane tab="Map" key="2">Content of tab 2</TabPane>
			</Tabs>
			);
	}
}



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