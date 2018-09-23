import React from 'react';
import {Avatar, Cell, Group, List, Panel, PanelHeader, HorizontalScroll, CellButton} from '@vkontakte/vkui';
import VKConnect from '@vkontakte/vkui-connect-mock';
import './bb.css'

const itemStyle = {
    flexShrink: 0,
    width: 90,
    height: 120,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: '1.2em',
    textAlign: 'center',
  };

class BeautyBattle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_class: 'my_img',
    };
  }

  componentDidMount() {
    console.log('mounted');
    VKConnect.send("VKWebAppInit", {});
  }


  render() {
    return (
        <Panel id={this.props.id}>
          <PanelHeader>
            BeautyBattle
          </PanelHeader>
          <Group title={'Who Is The Best?'} className={'cntr'}>
            <List>
              <Cell>
                <img className={this.state.img_class} src={this.props.one_fr} onClick={this.props.handle}/>
              </Cell>
              <Cell>
                <img className={this.state.img_class} src={this.props.two_fr} onClick={this.props.handle}/>
              </Cell>
            </List>
          </Group>
          <Group title={'Top 10 hottest'}>
            <HorizontalScroll>
              <div style={{display: 'flex'}}>
                {this.props.topUsers.map((data) =>
                  <div style={{...itemStyle, paddingLeft: 4}}>
                  <Avatar size={64} style={{marginBottom: 8}} src={data.img}/>
                    {data.name}
                  </div>
                )}
              </div>
            </HorizontalScroll>
          </Group>
          <Group>
            <CellButton align={'center'}>All Friends Rating</CellButton>
          </Group>
        </Panel>
    );
  }
}

export default BeautyBattle;