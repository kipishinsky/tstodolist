import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/reducers/tasks-reducer'
import {todoListsReducer} from '../../state/reducers/todolists-reducer'
import {v1} from 'uuid'
import {RootStateType, store} from "../../state/store";


const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {todolistId: "todolistId1", todolistTitle: "What to learn", todolistFilter: "all"},
        {todolistId: "todolistId2", todolistTitle: "What to buy", todolistFilter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {taskId: v1(), taskTitle: "HTML&CSS", taskIsDone: true},
            {taskId: v1(), taskTitle: "JS", taskIsDone: true}
        ],
        ["todolistId2"]: [
            {taskId: v1(), taskTitle: "Milk", taskIsDone: true},
            {taskId: v1(), taskTitle: "React Book", taskIsDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    debugger
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
