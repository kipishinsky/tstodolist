import React from "react";
import { action } from '@storybook/addon-actions';
import {ChangeTitleNameComponent} from "../../components/change-title-item/ChangeTitleNameComponent";


export default {
    title: 'ChangeTitleName Component',
    component: ChangeTitleNameComponent
}

const changeCallback = action('value changed');


export const ChangeTitleNameBaseExample = () => {
    return <ChangeTitleNameComponent
        changeTitleValue={'start value'}
        onChange={changeCallback}
    />
}