import React, {useEffect} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from 'formik'
import {loginTC} from './auth-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {setStatusAC} from '../app/app-reducer'
import {RootStateType} from '../app/store'
import { Redirect } from 'react-router-dom'

type LoginPropsType = {
	demo?: boolean
}

export const Login: React.FC <LoginPropsType> = ({demo=false}) => {

	const dispatch = useDispatch()
	const isLoggedIn = useSelector<RootStateType>(state => state.auth.isLoggedIn)

	const validate = (values: any) => {
		const errors = {
			email: '',
			password: ''
		}
		if (!values.email) {
			errors.email = 'Email address is required'
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Don\'t forget @ and enter domain data '
		}

		if (!values.password) {
			errors.password = 'Password is required'
		} else if (values.password) {
			errors.password = ''
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate,
		onSubmit: values => {
			debugger
			dispatch(loginTC(values))
		}
	})

	useEffect(() => {
		if (demo) {
			return
		}
		dispatch(setStatusAC('succeeded'))
	}, [])


	if(isLoggedIn) {
		return <Redirect to={'/'}/>
	}

	//debugger
	return <Grid container justify="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>Email: login.auth@yandex.ru</p>
						<p>Password: pentagon8000</p>
					</FormLabel>
					<FormGroup>
						<TextField
							label="Email"
							margin="normal"
							name="email"
							onChange={formik.handleChange}
							value={formik.values.email}
							//{...formik.getFieldProps('email')}
						/>
						{formik.errors.email ? <div>{formik.errors.email}</div> : null}
						<TextField
							type="password"
							label="Password"
							margin="normal"
							name="password"
							//onChange={formik.handleChange}
							//value={formik.values.password}
							{...formik.getFieldProps('password')}
						/>
						{formik.errors.password ? <div>{formik.errors.password}</div> : null}
						<FormControlLabel
							label={'Remember me'}
							control={<Checkbox/>}
							//name="rememberMe"
							//onChange={formik.handleChange}
							//value={formik.values.rememberMe}
							{...formik.getFieldProps('rememberMe')}
						/>
						<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}
