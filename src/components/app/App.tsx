import React from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TaskType} from '../../api/tasks/tasks-api'
import {TodolistsList} from "../todolists-lists/TodolistsList";
import {ErrorSnackBar} from '../error-snackbar/ErrorSnackBar'


function App() {
	console.log('App render')
//{status === 'loading' && <LinearProgress color={'secondary'} />}
	return (
		<div className={'App'}>
			<ErrorSnackBar />
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
				<LinearProgress />
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


