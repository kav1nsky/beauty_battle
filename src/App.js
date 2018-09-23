import React from 'react';
import connect from '@vkontakte/vkui-connect';
// import VKconnect from '@vkontakte/vkui-connect-mock';
import {View} from '@vkontakte/vkui';
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
      one_friend: null,
      two_friend: null,
      topUsers: [''],
    };
  }

  randomInteger = (min, max) => {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

  buttonClicked = () => {
    this.setState({one_friend: this.state.friends[this.randomInteger(0, this.state.friends.length - 1)].photo_200_orig});
    this.setState({two_friend: this.state.friends[this.randomInteger(0, this.state.friends.length - 1)].photo_200_orig});
  }

  componentDidMount() {
    connect.subscribe((e) => {
      switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          console.log(e.detail.data);
          this.setState({fetchedUser: e.detail.data}, () => console.log('wow - ' + this.state.token));
          break;
        case 'VKWebAppAccessTokenReceived':
          this.setState({token: e.detail.data.access_token});
          connect.send("VKWebAppCallAPIMethod",
              {
                "method": "friends.get",
                "params": {"v": "5.85", "access_token": e.detail.data.access_token, "fields": "photo_200_orig, photo_100"}
              });
          break;
        case 'VKWebAppCallAPIMethodResult':
          this.setState({friends: e.detail.data.response.items}, () => {
            this.setState({one_friend: this.state.friends[this.randomInteger(0, this.state.friends.length - 1)].photo_200_orig});
            this.setState({two_friend: this.state.friends[this.randomInteger(0, this.state.friends.length - 1)].photo_200_orig});
            let top = [];
            for (let i=0; i< 10; i++){
              let person = this.state.friends[this.randomInteger(0, this.state.friends.length - 1)];
              top.push({img: person.photo_100,
              name: person.first_name + ' ' +
              person.last_name})
            }
            this.setState({topUsers: top});
          });
          break;
        default:
      }
    });
    connect.send('VKWebAppGetUserInfo', {});
    connect.send("VKWebAppGetAuthToken", {"app_id": 6700632, "scope": "friends"});

  }

  go = (e) => {
    this.setState({activePanel: e.currentTarget.dataset.to})
  };

  render() {
    return (
        <View activePanel={this.state.activePanel}>
          <BeautyBattle id={'bb'} token={this.state.token} one_fr={this.state.one_friend} two_fr={this.state.two_friend} topUsers={this.state.topUsers}  handle={this.buttonClicked}/>
          <Home id="home" fetchedUser={this.state.fetchedUser} go={this.go}/>
          <Persik id="persik" go={this.go}/>
        </View>
    );
  }
}

export default App;
