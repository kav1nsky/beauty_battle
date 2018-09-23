import React from 'react';
import { Button } from "@vkontakte/vkui";
import VKConnect from '@vkontakte/vkui-connect-mock';


class Contestant extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  buttonClicked = () => {
    let res = VKConnect.send("VKWebAppCallAPIMethod",
        {"method": "friends.get", "params": { "access_token": ''}});
    console.log(res);
  }

  render() {
    return (
        <Button onClick={this.buttonClicked}>Get friends</Button>
    )
  }

}


export default Contestant;