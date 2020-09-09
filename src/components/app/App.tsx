import React from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TaskType} from '../../api/tasks/tasks-api'
import {TodolistsList} from "../todolists-lists/TodolistsList";
import {ErrorSnackBar} from '../error-snackbar/ErrorSnackBar'
import {useSelector} from 'react-redux'
import {RootStateType} from './store'
import {RequestStatusType} from './app-reducer'


function App() {
	console.log('App render')
	const status = useSelector<RootStateType, RequestStatusType> (state => state.app.status)
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
				{status === 'loading' && <LinearProgress color={'secondary'} />}
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


