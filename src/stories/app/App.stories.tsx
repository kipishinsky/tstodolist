import React from "react";
import {App} from "../../components/app/App";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";

export default {
    title: 'app',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = () => {
    return <App />
}