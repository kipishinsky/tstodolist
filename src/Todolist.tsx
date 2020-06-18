import React, {ChangeEvent} from 'react';
import {AppFilterValuesType} from "./App";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {ChangeTitleName} from "./ChangeTitleNameComponent";

// условия типов пропсов для тасок
export type TaskHookType = { //type какого типа будут таски, использующиеся в PropsType  Array<TaskType>
    tasksHookID: string
    tasksHookTITLE: string
    tasksHookISDONE: boolean
}

// условия типов пропсов для функции тудулист
type PropsType = {
    todoListsHookID: string
    title: string // в title можно писать только строку
    tasks: Array<TaskHookType> // тип массив объектов // type TaskType
    removeTask: (todoListsHookID: string, tasksHookID: string,) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
    changeFilter: (value: AppFilterValuesType, todoListId: string) => void // в changeFilter можно указать только строку и точное название ("All" |(<- или) "Active" |(<- или) "Completed") или алл или актив или комплетед. ТС будет следить за правильностью написания данных
    addNewTask: (newTitle: string, todoListId: string) => void // функция которая принимает title string и ничего не возвращает
    changeTaskStatus: (tasksId: string, isDone: boolean, todoListId: string) => void //isDone меняет значения
    changeTaskTitle: (tasksId: string, newTitle: string, todoListId: string) => void //isDone меняет значения
    filter: AppFilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}


export function TodoList(props: PropsType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться

    // новое добавление таски
    const addNewTask = (addNewItemPropsTitle: string) => {
        props.addNewTask(addNewItemPropsTitle, props.todoListsHookID);
    }

    // кнопки
    const onAllClickHandler = () => {
        props.changeFilter('All', props.todoListsHookID)
    } // кнопка all отдает значение наверх и в APP уже меняется стейт
    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.todoListsHookID)
    } // кнопка Active отдает значение наверх и в APP уже меняется стейт
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed', props.todoListsHookID)
    } // кнопка Completed отдает значение наверх и в APP уже меняется стейт

    const removeTodoList = () => {
        props.removeTodoList(props.todoListsHookID)
    } // удаление тудулистов

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListsHookID, newTitle)
    } // удаление тудулистов


    return (
        <div>
            <div className={'deleteWrapper'}>
                <h3 className={'deleteTitle'}> <ChangeTitleName title={props.title} onChange={changeTodoListTitle}/></h3> {/*заголовки тасок*/}
                <button className={'deleteButton'} onClick={removeTodoList}>X</button>
            </div>
            <AddNewItemComponent addNewItem={addNewTask}/>
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

                        const onChangeTitle = (newValue: string) => {
                            props.changeTaskTitle(t.tasksHookID, newValue, props.todoListsHookID);
                       }

                        return (
                            <li key={t.tasksHookID} className={t.tasksHookISDONE ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeStatus}
                                    checked={t.tasksHookISDONE}/> {/*состояние галки*/}
                                <ChangeTitleName
                                    title={t.tasksHookTITLE}
                                    onChange={onChangeTitle}
                                />
                                <button onClick={onClickHandler}>x</button>{/* удаляем таску */}

                            </li>)

                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}



