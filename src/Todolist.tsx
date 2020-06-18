import React, {ChangeEvent} from 'react';
import {AppFilterValuesType} from "./App";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {ChangeTitleNameComponent} from "./ChangeTitleNameComponent";

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
    changeTaskStatus: (tasksHookID: string, tasksHookISDONE: boolean, todoListsHookID: string) => void //isDone меняет значения
    changeTaskTitle: (tasksHookID: string, taskTypeTitle: string, todoListsHookID: string) => void //isDone меняет значения
    filterButton: AppFilterValuesType
    removeTodoList: (todoListsHookID: string) => void
    changeTodoListTitle: (todoListsHookID: string, newChangeTitleValue: string) => void
}


export function TodoList(props: TLDPropsType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться

    // новое добавление таски
    const addNewTaskCallBack = (addNewItemPropsTitle: string) => {
        props.addNewTask(addNewItemPropsTitle, props.todoListsHookID); //callback функция прыгает в пропсы
    }

    // кнопки
    const onAllClickHandlerCallBack = () => {
        props.changeFilter('All', props.todoListsHookID)
    } // кнопка all отдает значение наверх и в APP уже меняется стейт
    const onActiveClickCallBack = () => {
        props.changeFilter('Active', props.todoListsHookID)
    } // кнопка Active отдает значение наверх и в APP уже меняется стейт
    const onCompletedClickCallBack = () => {
        props.changeFilter('Completed', props.todoListsHookID)
    } // кнопка Completed отдает значение наверх и в APP уже меняется стейт

    const removeTodoListCallBack = () => {
        props.removeTodoList(props.todoListsHookID)
    } // удаление тудулистов

    const changeTodoListTitleCallBack = (newChangeTitleValue: string) => {
        props.changeTodoListTitle(props.todoListsHookID, newChangeTitleValue)
    } // удаление тудулистов


    return (
        <div>
            <div className={'deleteWrapper'}>
                <h3 className={'deleteTitle'}> <ChangeTitleNameComponent changeTitleValue={props.todoListsHookTITLE} onChange={changeTodoListTitleCallBack}/></h3> {/*заголовки тасок*/}
                <button className={'deleteButton'} onClick={removeTodoListCallBack}>X</button>
            </div>
            <AddNewItemComponent addNewItem={addNewTaskCallBack}/>
            <ul>
                {
                    props.tasks.map((t) => { // метод map на основе всех элементов создает новый массив с видоизменными элементами (другими объектами)

                        const onClickHandler = () => props.removeTask(props.todoListsHookID, t.tasksHookID) //при нажатии кнопки удаляется таска. ВАЖНО функция removeTask вызывается и туда залетают параметры с id и улетает назад в колбеке

                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.tasksHookID, newIsDoneValue, props.todoListsHookID);
                            // const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            //    let newIsDoneValue = e.currentTarget.checked;
                            //    props.changeTaskStatus (t.id, newIsDoneValue);
                        }

                        const onChangeTitle = (newItemValue: string) => {
                            props.changeTaskTitle(t.tasksHookID, newItemValue, props.todoListsHookID);
                       }

                        return (
                            <li key={t.tasksHookID} className={t.tasksHookISDONE ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeStatus}
                                    checked={t.tasksHookISDONE}/> {/*состояние галки*/}
                                <ChangeTitleNameComponent
                                    changeTitleValue={t.tasksHookTITLE}
                                    onChange={onChangeTitle}
                                />
                                <button onClick={onClickHandler}>x</button>{/* удаляем таску */}

                            </li>)

                    })
                }
            </ul>
            <div>
                <button className={props.filterButton === 'All' ? 'active-filter' : ''} onClick={onAllClickHandlerCallBack}>All</button>
                <button className={props.filterButton === 'Active' ? 'active-filter' : ''} onClick={onActiveClickCallBack}>Active</button>
                <button className={props.filterButton === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClickCallBack}>Completed</button>
            </div>
        </div>
    )
}



