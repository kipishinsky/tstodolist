import React, {useCallback, useEffect} from 'react';
import {AddNewItemComponent} from '../../add-new-item/AddNewItemComponent';
import {ChangeTitleNameComponent} from '../../change-title-item/ChangeTitleNameComponent';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './tasks/Task';
import {FilterValuesType, TodolistsReducerType} from './todolists-reducer/todolists-reducer'
import {TaskStatuses, TaskType} from "../../../api/tasks/tasks-api";
import {getTasksThunkCreator} from "./tasks-reducer/tasks-reducer";
import {useDispatch} from "react-redux";

// условия типов пропсов для функции тудулист
type TodolistType = {
    todolist: TodolistsReducerType
    tasks: Array<TaskType> // тип массив объектов // type TaskType
    removeTask: (todoListsId: string, tasksId: string,) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
    changeFilter: (filterValue: FilterValuesType, todoListsId: string) => void // в changeFilter можно указать только строку и точное название ("All" |(<- или) "Active" |(<- или) "Completed") или алл или актив или комплетед. ТС будет следить за правильностью написания данных
    addNewTask: (tasksNewTitleInput: string, todoListId: string) => void // функция которая принимает title string и ничего не возвращает
    // addNewTask: (tasksHookNewTITLEInput: string, tasksId: string) => void // функция которая принимает title string и ничего не возвращает
    changeTaskStatus: (tasksId: string, status: TaskStatuses, todoListsId: string) => void // меняет галку таски
    changeTaskTitle: (tasksId: string, tasksTitle: string, todoListsId: string) => void   // меняет название таски
    removeTodoList: (todoListsId: string) => void  // удаление тудулиста
    changeTodoListTitle: (todoListsId: string, newChangeTitleValue: string) => void  // меняет название тудулиста
    demo?: boolean
}


export const TodoList = React.memo (function ({demo = false,...props}: TodolistType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться
    console.log(' TodoList render')

    //if (typeof props.demo === 'undefined') props.demo = false

    const dispatch = useDispatch()

    useEffect( () => {
        if (demo) {
            return
        }
        console.log('log  ' + props.todolist.id)
        dispatch(getTasksThunkCreator(props.todolist.id))
    },[])


    // новое добавление таски
    const addNewTask = useCallback((title: string) => {
        props.addNewTask(title, props.todolist.id); //callback функция прыгает в пропсы
    }, [props.addNewTask, props.todolist.id]);


	// кнопка all отдает значение наверх и в APP уже меняется стейт
    const onClickAllButton = useCallback (() => {
        props.changeFilter('All', props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);
	// кнопка Active отдает значение наверх и в APP уже меняется стейт
    const onClickActiveButton = useCallback (() => {
        props.changeFilter('Active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);
	// кнопка Completed отдает значение наверх и в APP уже меняется стейт
    const onClickComletedButton = useCallback (() => {
        props.changeFilter('Completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id]);
	
    
	// удаление тудулистов
    const removeTodoListCallBack = () => {
        props.removeTodoList(props.todolist.id)
    }

	// изменение названия тудулистов
    const changeTodoListTitleCallBack = useCallback ((newChangeTitleValue: string) => {
        props.changeTodoListTitle(props.todolist.id, newChangeTitleValue)
    }, [props.changeTodoListTitle, props.todolist.id])
    
    
    let tasksForTodoList = props.tasks;
    if (props.todolist.filter === 'Active') { // при нажатии кнопки active, фильтр сравниваем из тудулиста
        tasksForTodoList = props.tasks.filter( t => t.status === TaskStatuses.New) // если при фильтре у таски isDone = false, от пропустят таски только с false
    }
    if (props.todolist.filter === 'Completed') { // при нажатии кнопки Completed, фильтр сравниваем из тудулиста
        tasksForTodoList = props.tasks.filter( t => t.status === TaskStatuses.Completed) // если при фильтре у таски isDone = true, от пропустят таски только с true
    }

    return (
        <div>
            <h3> {/*заголовки тасок*/}
                <ChangeTitleNameComponent
                    changeTitleValue={props.todolist.title}
                    onChange={changeTodoListTitleCallBack}
                />
                <IconButton onClick={removeTodoListCallBack} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete />
                </IconButton>
            </h3>
            
            <AddNewItemComponent addNewItem={addNewTask} disabled={props.todolist.entityStatus === 'loading'}/> {/* добавление новой таски */}
            
            <ul>

                {   props.tasks.map ( (t) => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.todolist.id}
                        key={t.id}
                        />
                    )
                }
            </ul>
            <div>
				{/*подключенный Button из material ui*/}
                <Button variant={props.todolist.filter === 'All' ? 'contained' : 'text'} onClick={onClickAllButton} color={'inherit'} >All</Button>
                <Button variant={props.todolist.filter === 'Active' ? 'contained' : 'text'} onClick={onClickActiveButton} color={'primary'} >Active</Button>
                <Button variant={props.todolist.filter === 'Completed' ? 'contained' : 'text'} onClick={onClickComletedButton} color={'secondary'} >Completed</Button>
            </div>
        </div>
    )
})


