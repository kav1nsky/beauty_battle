import React from 'react';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import VKConnect from '@vkontakte/vkui-connect-mock';


class BeautyBattle extends React.Component {
  constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount(){
    console.log('mounted');
    VKConnect.send("VKWebAppInit", {});
  }


  render() {
    return (
        <Panel id={this.props.id}>
          <PanelHeader>
            BeautyBattle
          </PanelHeader>
          <Group title={'Кто красивее?'}>
            <ListItem>
              <Avatar size={80} />
              <Button onClick={this.props.handle}>Handle</Button>
            </ListItem>
            <ListItem>lolo</ListItem>
          </Group>
          <Group title={'Рейтинг'}>
            <ListItem>
              <Avatar size={80}></Avatar>
              wowo
            </ListItem>
            <ListItem>lolo</ListItem>
          </Group>
        </Panel>
    );
  }
}

export default BeautyBattle;