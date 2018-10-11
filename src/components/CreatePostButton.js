import React from 'react';
import { Button , Modal, message} from 'antd';
import { WrappedCreatePostForm } from './CreatePostForm';
import {POS_KEY, API_ROOT, AUTH_PREFIX, TOKEN_KEY, LOC_SHAKE} from '../Constant';
import $ from 'jquery';


export class CreatePostButton extends React.Component {
	state = { 
		visible: false,
		confirmLoading: false,
	}

	showModal = () => {
		this.setState({
			visible: true,
		});
	}

	handleOk = (e) => {

		console.log(e);
		this.form.validateFields((err, values) => {
			if (!err) {
				const { latitude, longitude} = JSON.parse(localStorage.getItem(POS_KEY));
				console.log(`${latitude} ${longitude}`)
				console.log(values);

				const formData = new FormData();
				formData.set('lat', latitude + Math.random() * 2 * LOC_SHAKE - LOC_SHAKE);
				formData.set('lon', longitude + Math.random() * 2 * LOC_SHAKE - LOC_SHAKE);
				formData.set('message', values.message);
				formData.set('image', values.image[0].originFileObj);

				$.ajax({
					url: `${API_ROOT}/post`,
					method: 'POST',
					data: formData,
					headers: {
						Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
					},
					processData: false,
					contentType: false,
					dataType: 'text',


				}).then(
				() => {
					this.form.resetFields();
					this.setState({ visible: false, confirmLoading: false });
					this.props.loadNearbyPosts();
					message.success('Created a post successfully!');
				},
				(response) => {
					message.error(response.responseText);
					this.setState({ visible: false, confirmLoading: false });
				}).catch((error) => {
					console.log(error);

				});
			}
		});
	}

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}

	saveFormRef =(form)=> {
		console.log
		this.form = form;
	}

	render () {
		return (
			<div>
			<Button type="danger" onClick={this.showModal}>Post</Button>
			<Modal
			title="Post Your Fancy Travel"
			visible={this.state.visible}
			confirmLoading={this.state.confirmLoading}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
			>
			<WrappedCreatePostForm ref={this.saveFormRef} />
			</Modal>
			</div>
			);
	}
}