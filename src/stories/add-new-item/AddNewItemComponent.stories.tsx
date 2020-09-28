import React from 'react'
import {AddNewItemComponent} from '../../components/generic-components/add-new-item/AddNewItemComponent'
import {action} from '@storybook/addon-actions'

export default {
	title: 'add item form component',
	component: AddNewItemComponent
}

const callback = action('button add was pressed inside the form')

export const AddNewItemComponentBaseExample = () => {
	return <AddNewItemComponent addNewItem={callback}/>
}

export const AddNewItemComponentDisabledExample = () => {
	return <AddNewItemComponent disabled={true} addNewItem={callback}/>
}