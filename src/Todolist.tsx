import React from "react";
import {FilterValuesType} from "./App";

type TaskType = { //type какого типа будут таски, использующиеся в PropsType  Array<TaskType>
    id: number
    title: string
    isDone: boolean
}

type PropsType = { // тип пропсов
    title: string // в title можно писать только строку
    tasks: Array<TaskType> // тип массив объектов // type TaskType
    // tasks: TaskType []  - можно так же писать и будет работать
    removeTask: (taskId: number) => void // удаление тасок происходит только по id и типы number
    changeFilter: (value: FilterValuesType ) => void // в changeFilter можно указать только строку и точное название ("All" |(<- или) "Active" |(<- или) "Completed") или алл или актив или комплетед. ТС будет следить за правильностью написания данных
}

export function Todolist (props: PropsType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться
    return (
        <div>
            <h3>{props.title}</h3> {/*заголовки тасок*/}
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map ( // метод map на основе всех элементов создает новый массив с видоизменными элементами (другими объектами)
                        (t) => <li>
                            <input
                                type="checkbox"
                                checked={t.isDone}/> {/*галки*/}
                            <span>{t.title}</span> {/*сами таски*/}
                            <button onClick={ () => {props.removeTask(t.id)} }>x</button> {/*при нажатии кнопки удаляется таска*/}
                        </li>)
                }
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter ("All")}}>All</button>
                <button onClick={ () => {props.changeFilter ("Active")}}>Active</button>
                <button onClick={ () => {props.changeFilter ("Completed")}}>Completed</button>
            </div>
        </div>
    )
}


