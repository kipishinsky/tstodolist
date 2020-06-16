import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {ChangeTitleName} from "./ChangeTitleNameComponent";

// условия типов пропсов для тасок
export type TaskType = { //type какого типа будут таски, использующиеся в PropsType  Array<TaskType>
    id: string
    title: string
    isDone: boolean
}

// условия типов пропсов для функции тудулист
type PropsType = {
    id: string
    title: string // в title можно писать только строку
    tasks: Array<TaskType> // тип массив объектов // type TaskType
    removeTask: (tasksId: string, todoListId: string) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
    changeFilter: (value: FilterValuesType, todoListId: string) => void // в changeFilter можно указать только строку и точное название ("All" |(<- или) "Active" |(<- или) "Completed") или алл или актив или комплетед. ТС будет следить за правильностью написания данных
    addNewTask: (newTitle: string, todoListId: string) => void // функция которая принимает title string и ничего не возвращает
    changeTaskStatus: (tasksId: string, isDone: boolean, todoListId: string) => void //isDone меняет значения
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}


export function TodoList(props: PropsType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться

    // новое добавление таски
    const addNewTask = (addNewItemPropsTitle: string) => {
        props.addNewTask(addNewItemPropsTitle, props.id);
    }

    // кнопки
    const onAllClickHandler = () => {
        props.changeFilter('All', props.id)
    } // кнопка all отдает значение наверх и в APP уже меняется стейт
    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.id)
    } // кнопка Active отдает значение наверх и в APP уже меняется стейт
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed', props.id)
    } // кнопка Completed отдает значение наверх и в APP уже меняется стейт

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    } // удаление тудулистов

    return (
        <div>
            <div className={'deleteWrapper'}>
                <h3 className={'deleteTitle'}>{props.title}</h3> {/*заголовки тасок*/}
                <button className={'deleteButton'} onClick={removeTodoList}>X</button>
            </div>
            <AddNewItemComponent addNewItem={addNewTask}/>
            <ul>
                {
                    props.tasks.map((t) => { // метод map на основе всех элементов создает новый массив с видоизменными элементами (другими объектами)

                        const onClickHandler = () => props.removeTask(t.id, props.id) //при нажатии кнопки удаляется таска. ВАЖНО функция removeTask вызывается и туда залетают параметры с id и улетает назад в колбеке

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                            // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //    let newIsDoneValue = e.currentTarget.checked;
                            //    props.changeTaskStatus (t.id, newIsDoneValue);
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}/> {/*состояние галки*/}
                                <ChangeTitleName title={t.title} />
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



