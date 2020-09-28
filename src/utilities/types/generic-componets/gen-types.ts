export type AddNewItemPropsType = {
	addNewItem: (title: string) => void
	disabled?: boolean
}

export type ChangeTitleNamePropsType = {
	changeTitleValue: string
	onChange: (newItemValue: string) => void
}
