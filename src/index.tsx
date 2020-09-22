import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './index.css'

import {Provider} from 'react-redux'
import {store} from './components/app/store'
import {App} from './components/app/App'

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>, document.getElementById('root'))

serviceWorker.unregister()
