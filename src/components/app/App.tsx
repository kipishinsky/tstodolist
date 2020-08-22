import React from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons'
import {TaskType} from '../../api/tasks/tasks-api'
import {TodolistsList} from "../todolists-lists/TodolistsList";

function App() {
	console.log('App render')

	return (
		<div className={'App'}>

			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu/>
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>


			<Container fixed>
				<TodolistsList />
			</Container>

		</div>
	)
}

export type AppTasksType = {
	[key: string]: Array<TaskType>
}

export default App


