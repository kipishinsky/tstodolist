import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/reducers/tasks-reducer/tasks-reducer'
import {todoListsReducer} from '../../state/reducers/todolists-reducer/todolists-reducer'
import {v1} from 'uuid'
import {RootStateType, store} from "../../state/store";
import {TaskPriorities, TaskStatuses} from "../../api/tasks/tasks-api";


const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

const initialGlobalState: RootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "All", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "All", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: ''
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    debugger
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
