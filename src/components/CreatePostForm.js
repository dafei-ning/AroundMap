import React from 'react';
import { Form, Input, Icon, Upload} from 'antd';

const FormItem = Form.Item;

export class CreatePostForm extends React.Component {

	normFile = (e) => {     
		console.log('Upload event:', e);     
		if (Array.isArray(e)) {       
			return e;     
		}     
		return e && e.fileList;   
	}

	beforeUpload =()=> {
		return false;
	}

	render () {

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 },
		};
		const { getFieldDecorator } = this.props.form 
		return (
			<Form layout="vertical">

			<FormItem
			{...formItemLayout}
			label="message"
			>
			{getFieldDecorator('message', {
				rules: [{ required: true, message: 'Please input your message!' }],
			})(
			<Input />
			)}
			</FormItem>

			<FormItem
			{...formItemLayout}
			label="image"
			>
			<div className="dropbox">
            {getFieldDecorator('image', {
              rules: [{ required: true, message: 'Please post your image!' }],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
			</FormItem>

			</Form>
			);
	}
}

export const WrappedCreatePostForm = Form.create()(CreatePostForm);