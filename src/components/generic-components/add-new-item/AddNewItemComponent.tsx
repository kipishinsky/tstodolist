import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {AddBox} from '@material-ui/icons'
import {AddNewItemPropsType} from '../../../utilities/types/generic-componets/gen-types'

export const AddNewItemComponent = React.memo(({addNewItem, disabled}: AddNewItemPropsType) => {
	console.log('AddNewItemComponent render')

	const [addNewTitle, setAddNewTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addNewTask = () => {
		if (addNewTitle.trim() !== '') {
			addNewItem(addNewTitle)
			setAddNewTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setAddNewTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		}
		if (e.charCode === 13) {
			addNewTask()
		}
	}

	return (
		<div>
			<TextField
				variant={'outlined'}
				error={!!error}
				value={addNewTitle}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				label={'Enter text'}
				helperText={error}
				disabled={disabled}
			/>
			<IconButton
				onClick={addNewTask}
				color={'primary'}
				disabled={disabled}>

				<AddBox/>

			</IconButton>
		</div>
	)
})