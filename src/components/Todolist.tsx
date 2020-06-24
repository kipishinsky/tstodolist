import React, {ChangeEvent} from 'react';
import {AppFilterValuesType} from "../App";
import {AddNewItemComponent} from "./AddNewItemComponent";
import {ChangeTitleNameComponent} from "./ChangeTitleNameComponent";
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

// условия типов пропсов для тасок
export type TLDTaskHookType = { //type какого типа будут таски, использующиеся в PropsType  Array<TaskType>
    tasksHookID: string
    tasksHookTITLE: string
    tasksHookISDONE: boolean
}

// условия типов пропсов для функции тудулист
type TLDPropsType = {
    todoListsHookID: string
    todoListsHookTITLE: string // в title можно писать только строку
    tasks: Array<TLDTaskHookType> // тип массив объектов // type TaskType
    removeTask: (todoListsHookID: string, tasksHookID: string,) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
    changeFilter: (filterValue: AppFilterValuesType, todoListsHookID: string) => void // в changeFilter можно указать только строку и точное название ("All" |(<- или) "Active" |(<- или) "Completed") или алл или актив или комплетед. ТС будет следить за правильностью написания данных
    addNewTask: (tasksHookNewTITLEInput: string, tasksHookID: string) => void // функция которая принимает title string и ничего не возвращает
    changeTaskStatus: (tasksHookID: string, tasksHookISDONE: boolean, todoListsHookID: string) => void // меняет галку таски
    changeTaskTitle: (tasksHookID: string, taskTypeTitle: string, todoListsHookID: string) => void   // меняет название таски
    filterButton: AppFilterValuesType // кнопки
    removeTodoList: (todoListsHookID: string) => void  // удаление тудулиста
    changeTodoListTitle: (todoListsHookID: string, newChangeTitleValue: string) => void  // меняет название тудулиста
}


export function TodoList(props: TLDPropsType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться

    // новое добавление таски
    const addNewTaskCallBack = (addNewItemPropsTitle: string) => {
        props.addNewTask(addNewItemPropsTitle, props.todoListsHookID); //callback функция прыгает в пропсы
    }

    
	// кнопка all отдает значение наверх и в APP уже меняется стейт
    const onAllClickHandlerCallBack = () => {
        props.changeFilter('All', props.todoListsHookID)
    }
	
    
	// кнопка Active отдает значение наверх и в APP уже меняется стейт
    const onActiveClickCallBack = () => {
        props.changeFilter('Active', props.todoListsHookID)
    }
	
    
	// кнопка Completed отдает значение наверх и в APP уже меняется стейт
    const onCompletedClickCallBack = () => {
        props.changeFilter('Completed', props.todoListsHookID)
    }
	
    
	// удаление тудулистов
    const removeTodoListCallBack = () => {
        props.removeTodoList(props.todoListsHookID)
    }
	
    
	// изменение названия тудулистов
    const changeTodoListTitleCallBack = (newChangeTitleValue: string) => {
        props.changeTodoListTitle(props.todoListsHookID, newChangeTitleValue)
    }


    return (
        <div>
            <h3> {/*заголовки тасок*/}
            
				{/*меняет название заголовка тудулиста*/}
                <ChangeTitleNameComponent
                    changeTitleValue={props.todoListsHookTITLE}
                    onChange={changeTodoListTitleCallBack}
                />
                <IconButton onClick={removeTodoListCallBack}> {/*кнопки подключаемые из материал ui */}
                    <Delete /> {/*кнопки подключаемые из материал ui */}
                </IconButton>
            </h3>
            {/*добавили иконку удаления, с библиотеками
            // with yarn
            yarn add @material-ui/core
            
            // with yarn
            yarn add @material-ui/icons
            */}
            
            <AddNewItemComponent addNewItem={addNewTaskCallBack}/> {/* добавление новой таски */}
            
            <ul>
                {
                    props.tasks.map((t) => { // метод map на основе всех элементов создает новый массив с видоизменными элементами (другими объектами)

                        const onClickHandler = () => props.removeTask(props.todoListsHookID, t.tasksHookID) //при нажатии кнопки удаляется таска. ВАЖНО функция removeTask вызывается и туда залетают параметры с id и улетает назад в колбеке
	
						// меняет галку таски
						const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
							let newIsDoneValue = e.currentTarget.checked;
							props.changeTaskStatus(t.tasksHookID, newIsDoneValue, props.todoListsHookID);
						}
						// меняет название таски
						const onChangeTitle = (newItemValue: string) => {
							props.changeTaskTitle(t.tasksHookID, newItemValue, props.todoListsHookID);
						}

                        return (
                            <li key={t.tasksHookID} className={t.tasksHookISDONE ? 'is-done' : ''}>
	
								{/*подключенный checkbox из material ui*/}
                                <Checkbox
                                    color={'primary'}
                                    onChange={onChangeStatus}
                                    checked={t.tasksHookISDONE}/> {/*состояние галки*/}
                                <ChangeTitleNameComponent
                                    changeTitleValue={t.tasksHookTITLE}
                                    onChange={onChangeTitle}
                                />
                                {/*добавили иконку удаления, с библиотеками
                                // with yarn
                                yarn add @material-ui/core
                                
                                // with yarn
                                yarn add @material-ui/icons
                                */}
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>)

                    })
                }
            </ul>
            <div>
				{/*подключенный Button из material ui*/}
                <Button variant={props.filterButton === 'All' ? 'contained' : 'text'} onClick={onAllClickHandlerCallBack} color={'inherit'} >All</Button>
                <Button variant={props.filterButton === 'Active' ? 'contained' : 'text'} onClick={onActiveClickCallBack} color={'primary'} >Active</Button>
                <Button variant={props.filterButton === 'Completed' ? 'contained' : 'text'} onClick={onCompletedClickCallBack} color={'secondary'} >Completed</Button>
            </div>
        </div>
    )
}



