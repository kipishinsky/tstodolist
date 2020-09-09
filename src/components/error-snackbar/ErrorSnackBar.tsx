import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../app/store'
import {setStatusAC} from '../app/app-reducer'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackBar() {
	const [open, setOpen] = React.useState(false)
	const dispatch = useDispatch()

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setStatusAC('loading'))
		//setOpen(false)
	}

	const error = useSelector<RootStateType, string>( state => state.app.status)

	const isOpen = error !== null

	return (

		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				This is a success message!
			</Alert>
		</Snackbar>
	)
}
