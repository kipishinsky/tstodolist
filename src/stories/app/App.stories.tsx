import React from "react";
import {App} from "../../components/app/App";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = () => {
    return <App />
}