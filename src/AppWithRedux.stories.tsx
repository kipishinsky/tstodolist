import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}