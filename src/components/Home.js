import React from 'react';

import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;

const operations = <Button>Mistery Button</Button>;



export class Home extends React.Component {
	render () {
		return (
			<Tabs tabBarExtraContent={operations} className="main-tabs">
				<TabPane tab="Post" key="1">Content of tab 1</TabPane>
				<TabPane tab="Map" key="2">Content of tab 2</TabPane>
			</Tabs>
		);
	}
}