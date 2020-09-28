import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {setErrorAC} from '../../../store/reducers/app/app-reducer'
import {RootStateType} from '../../../store/store'

const Alert = (props: AlertProps) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ErrorSnackBar = () => {

	const dispatch = useDispatch()

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setErrorAC({error: null}))
	}

	const error = useSelector<RootStateType, string | null>(state => state.app.error)

	const isOpen = error !== null

	return (
		<Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				{error}
			</Alert>
		</Snackbar>
	)
}
