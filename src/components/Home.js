import React from 'react';

import { Tabs, Spin } from 'antd';
import {GEO_OPTIONS, POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY} from '../Constant';
import {Gallery} from './Gallery';
import $ from 'jquery';

import {CreatePostButton} from './CreatePostButton';
import { WrappedAroundMap } from './AroundMap';

  //optional stuff to do after success


const TabPane = Tabs.TabPane;


export class Home extends React.Component {

	state = {
		loadingGeoLocation: false,
		loadingPosts: false,
		posts: [],
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
		this.setState({ loadingPosts: true, loadingGeoLocation: false, error: '' });

		this.loadNearbyPosts();
	}

	onFailedLoadGeolocation = (error) => {
		console.log(error);
		this.setState({loadingGeoLocation: false, error: 'falied to get location'});
	}

	getGalleryPanelContent = () => {
		if (this.state.error) {
			return <div>{this.state.error}</div>;
		} else if (this.state.loadingGeoLocation) {
			return <Spin tip="loading Geolocation..." />
		} else if (this.state.loadingPosts) {
			return <Spin tip="loading Posts..." />
		} else if (this.state.posts && this.state.posts.length > 0){
			return <Gallery images={
				this.state.posts.map(({ user, message, url}) => ({
					user: user,
					src: url,
					thumbnail: url,
					caption: message,
					thumbnailWidth: 400,
					thumbnailHeight: 300,
				}))
			} />;
		} else {
			return null;
		}
	}

	loadNearbyPosts = () => {
		this.setState({ loadingPosts: true});
		const {latitude, longitude} = JSON.parse(localStorage.getItem(POS_KEY))
		const token = localStorage.getItem(TOKEN_KEY)

		$.ajax({
			url: `${API_ROOT}/search?lat=${latitude}&lon=${longitude}&range=2000`,
			headers: {
				Authorization: `${AUTH_PREFIX} ${token}`
			},
		}).then(
			(response) => {
				this.setState({posts: response,loadingPosts: false});
				console.log(response);
			},
			(response) => {
				this.setSate({error: response.responseText})
			}
		).catch(
		   (error) => console.log(error)
		);

	}



	render () {
		const createPostButton = <CreatePostButton loadNearbyPosts ={this.loadNearbyPosts}/>;
		return (
			<Tabs tabBarExtraContent={createPostButton} className="main-tabs">
			<TabPane tab="Post" key="1">
			{this.getGalleryPanelContent()}
			</TabPane>
			<TabPane tab="Map" key="2">
			<WrappedAroundMap
             googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
             loadingElement={<div style={{ height: `100%` }} />}
             containerElement={<div style={{ height: `600px` }} />}
             mapElement={<div style={{ height: `100%` }} />}
             posts={this.state.posts}
             loadNearbyPosts={this.loadNearbyPosts}
           />



			</TabPane>
			</Tabs>
			);
	}
}

