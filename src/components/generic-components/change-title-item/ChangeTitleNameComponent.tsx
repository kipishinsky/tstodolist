import React, {ChangeEvent, useState} from 'react'
import {TextField} from '@material-ui/core'
import {ChangeTitleNamePropsType} from '../../../utilities/types/generic-componets/gen-types'

export const ChangeTitleNameComponent = React.memo((props: ChangeTitleNamePropsType) => {

	console.log('ChangeTitleNameComponent render')

	let [editModeHook, setEditModeHook] = useState(false)
	let [titleChangeNameHook, setTitleChangeNameHook] = useState('')

	const activateEditMode = () => {
		setEditModeHook(true)
		setTitleChangeNameHook(props.changeTitleValue)
	}
	const activateViewMode = () => {
		setEditModeHook(false)
		props.onChange(titleChangeNameHook)
	}

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleChangeNameHook(e.currentTarget.value)
	}

	return (
		editModeHook ? <TextField
			value={titleChangeNameHook}
			onBlur={activateViewMode}
			autoFocus
			onChange={onChangeTitleHandler}/> : <span onDoubleClick={activateEditMode}>
			{props.changeTitleValue}
		</span>
	)
})