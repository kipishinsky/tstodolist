import React from "react";
import {AddNewItemComponent} from "./AddNewItemComponent";
import { action } from '@storybook/addon-actions';


export default {
    title: 'AddItemForm Component',
    component: AddNewItemComponent
}

const callback = action('button add was pressed inside the form');

export const AddNewItemComponentBaseExample = (props: any) => {
    return <AddNewItemComponent addNewItem={callback}/>
}