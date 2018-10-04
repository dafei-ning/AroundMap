import React from 'react';

import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS } from '../Constant';
import {POS_KEY } from '../Constant';

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
			return null;
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