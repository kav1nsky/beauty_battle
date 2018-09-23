import React from 'react';
import connect from '@vkontakte/vkui-connect';
// import VKconnect from '@vkontakte/vkui-connect-mock';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import BeautyBattle from "./panels/BeautyBattle";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'bb',
			fetchedUser: null,
      token: null,
			friends: null,
		};
	}

	buttonClicked = () => {
		// connect.send("VKWebAppGetUserInfo", {});
    // connect.send("VKWebAppCallAPIMethod", {"method": "friends.get",
    //   "params": {"access_token":this.props.token, "v":"5.85"}});
		connect.send("VKWebAppCallAPIMethod",
				{"method": "friends.get", "params": {"v":"5.85", "access_token":this.state.token, "fields": "city", "count": 1}});
  }

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					console.log(e.detail.data);
					this.setState({ fetchedUser: e.detail.data }, () => console.log('wow - ' + this.state.token));
					break;
        case 'VKWebAppAccessTokenReceived':
          this.setState({token: e.detail.data.access_token});
          break;
				case 'VKWebAppCallAPIMethodResult':
					console.log(e.detail.data);
					this.setState({friends: e.detail.data[0]})
					break;
				default:
					console.log(e.detail.type);
					// console.log(e.detail.data);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});

		connect.send("VKWebAppGetAuthToken", {"app_id": 6700632, "scope": "friends"});

	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<BeautyBattle id={'bb'} token={this.state.token} friends={this.state.friends} handle={this.buttonClicked}/>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
