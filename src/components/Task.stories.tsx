import React from "react";
import { action } from '@storybook/addon-actions';
import {Task} from "./Task";


export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action('change Task status');
const changeTaskTitleCallback = action('change Task title');
const removeTaskCallback = action('Task remove');


export const TaskBaseExample = () => {
    return <>
        <Task
            task={{taskId: '1', taskIsDone: true, taskTitle: 'CSS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId1'}
        />
        <Task
            task={{taskId: '2', taskIsDone: false, taskTitle: 'JS'}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={'todolistId2'}
        />
    </>
}