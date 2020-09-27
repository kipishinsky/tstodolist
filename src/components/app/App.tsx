import React, {useCallback, useEffect} from 'react'
import {
	AppBar,
	Button,
	CircularProgress,
	Container,
	IconButton,
	LinearProgress,
	Toolbar,
	Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../todolists-lists/TodolistsList'
import {ErrorSnackBar} from '../error-snackbar/ErrorSnackBar'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from './store'
import {initializedAppTC} from './app-reducer'
import {BrowserRouter, Route} from 'react-router-dom'
import {Login} from '../login/Login'
import {logoutTC} from '../login/auth-reducer'
import {AppPropsType, RequestStatusType} from '../../common/types'

import './App.css'

export function App({demo = false}: AppPropsType) {
	console.log('App render')

	const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
	const initialized = useSelector<RootStateType, boolean>(state => state.app.initialized)
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializedAppTC())
	}, [initialized])

	const logoutHandler = useCallback(() => {
		dispatch(logoutTC())
	}, [])


	if (!initialized) {
		return <div style={{position: 'fixed', top: '50%', textAlign: 'center', width: '100%'}}>
			<CircularProgress/>
		</div>
	}

	return (
		<BrowserRouter>
			<div className={'App'}>
				<ErrorSnackBar/>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<Menu/>
						</IconButton>
						<Typography variant="h6">
							Todolist APP
						</Typography>
						{isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
					</Toolbar>
					{status === 'loading' && <LinearProgress color={'secondary'}/>}
				</AppBar>
				<Container fixed>
					<Route path={'/'} render={() => <TodolistsList demo={demo}/>}/>

					<Route exact path={'/login'} render={() => <Login/>}/>
				</Container>
			</div>
		</BrowserRouter>
	)
}
