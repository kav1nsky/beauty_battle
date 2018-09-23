import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import Contestant from './Contestant'


const Home = props => (
	<Panel id={props.id}>
		<PanelHeader>Example</PanelHeader>
		{props.fetchedUser &&
		<Group title="User Data Fetched with VK Connect">
			<ListItem
				before={<Avatar src={props.fetchedUser.photo_200}/>}
				description={props.fetchedUser.city.title}
			>
				{`${props.fetchedUser.first_name} ${props.fetchedUser.last_name}`}
			</ListItem>
			<ListItem>
				<Contestant/>
			</ListItem>
		</Group>}

		<Group title="Navigation Example">
			<Div>
				<Avatar src={'https://pp.userapi.com/c845419/v845419332/ef97c/IcUjwGvg8I4.jpg'} size={80}></Avatar>
				<Button size="xl" level="2" onClick={props.go} data-to="persik">
					Смотреть рейтинг
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
