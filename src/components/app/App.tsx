import React, {useCallback, useEffect} from 'react'
import {
	AppBar, CircularProgress, LinearProgress,
	Button, Container, IconButton, Toolbar, Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {Todolists} from '../todolists-lists/Todolists'
import {Login} from '../auth/Login'
import {ErrorSnackBar} from '../generic-components/error-snackbar/ErrorSnackBar'
import {useDispatch, useSelector} from 'react-redux'
import {initializedAppTC} from '../../store/thunk/app/app-thunks'
import {logoutTC} from '../../store/thunk/auth/auth-thunks'
import {BrowserRouter, Route} from 'react-router-dom'

import {RootStateType} from '../../store/store'
import {AppPropsType} from '../../utilities/types/app/app-types'
import {RequestStatusType} from '../../utilities/types/error-status/err-st-types'

export const App = ({demo = false}: AppPropsType) => {
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
						<IconButton
							edge="start"
							color="inherit"
							aria-label="menu">
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
					<Route
						path={'/'}
						render={() => <Todolists demo={demo}/>}/>
					<Route
						exact path={'/auth'}
						render={() => <Login/>}/>
				</Container>
			</div>
		</BrowserRouter>
	)
}
