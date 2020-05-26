import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

import {v1} from "uuid"; // генерит айдишки

// Ошибки:
// failed to compile: is not defined - не определено

export type FilterValuesType = "All" | "Active" | "Completed" ; // тип значения фильтров (пропсов) для кнопок

function App() {

/*    <div Принцип работы setState>
        пример работы useState, useState это hook (хук)

        в useState сидит массив
        let arr = [tasks,setTasks] - tasks сам стейт. setTasks функция которая может менять массив tasks
        let arr = [ [{},{},{}], () => {}];

        пример:
            function useState (data) {
                return [ {},{},{}, () => {} ];
            }

        мы вызываем useState и передаем в него массив тасок useState({},{},{});

            function useState (data: any) {
               return [ data, () => {} ];
            }
        и массив тасок который мы передали упаковывается в новый массив data и создается функция которая может этот массив меня setData
        получается массив с массивами, к которому возможно обратиться
        let arr = [data, setData]'
        console.log (arr[0]);
        console.log (arr[1]);

        тем самым возвращаясь в начало примера можно трактовать это так:
        let tasks = arr[0];
        let setTasks = arr[1];

        function App () {
            let initTasks = [
                { id: 1, title: "HTML&CSS", isDone: true},
                { id: 2, title: "JS", isDone: true},
                { id: 3, title: "React js", isDone: false},
            ];
        }

        let arr = useState(initTasks);
        let tasks = arr[0];
        let setTasks = arr[1];

        при помощи функции setTasks мы может отправить в эту функции новый массив,
        который изменит основной массив тасок, в стейте, который йконтролируется реактом
        и реакт автоматически перезапустит перерисовку

        счетчик при помощи хука

        export function Counter () {
            console.log ('Counter rendered') // отслеживаем сколько раз отрисовалась компонента
            let arr = useState(5); // сохраняет 5ку как стартовое значение в своем стейте
            let data = arr[0] // 5, стартовая
            let setData = arr[1] // функция которая меняет счетчик, но нам ее нужно вызвать, а вызовем мы ее в div

            return (
                <div
                    onClick = { () => {setData(data+1)}} // вызывает функцию, которая меняет стейт и говорим ей, что к старому стейту добавть 1 и отрисуй занова
               >{data}</div> // отрисовывает пятерку изначально, но как только мы повесили onClick с функцией, будет происходить занова отрисовка стейта
               // counter rendered считает в консоле количество отрисовок после каждого клика
        }

        потом меняет в index.ts в отрисовке reactDOM.render(<Counter />) вместо app
        приложение стартует и мы видим 5ку
        отрисовка зависит от локального стейта а не от UI

    </div>*/

    //стейт тасок tasks массив тасок, setTasks функция, которая может поменять массив тасок
    let [tasks, setTasks] = useState <Array<TaskType>> ([   // массив тасок const - неизменяемо //  useState хранит массив <Array<TaskType>> (useState <Array<TaskType>>) , который к нам приходит через export из todolist и  обязательный инпут там, куда он пришел и используется. Тем самым мы указали тайп скрипту где нужно отслеживать все значения
        { id: v1(), title: "HTML&CSS", isDone: true},
        { id: v1(), title: "JS", isDone: true},
        { id: v1(), title: "React js", isDone: false},
        { id: v1(), title: "TypeScript", isDone: true},
        { id: v1(), title: "Rest API", isDone: false},
        { id: v1(), title: "GraphQL", isDone: false}
    ]);

    // менять значение кнопок алл, актив, комлитед
    let [filter, setFilter] = useState <FilterValuesType> ("All"); // со старта висит ALL.  useState хранит массив FilterValuesType (useState <FilterValuesType>)
    let tasksForTodolist = tasks; // не можем менять напрямую стейт тасок
        if (filter === "Active") { // при нажатии кнопки active
            tasksForTodolist = tasks.filter (t => t.isDone === false); // если при фильтре у таски isDone = false, от пропустят таски только с false
        }
        if (filter === "Completed") { // при нажатии кнопки Completed
            tasksForTodolist = tasks.filter (t => t.isDone === true); // если при фильтре у таски isDone = true, от пропустят таски только с true
        }

    // меняем данные кнопок не хардкодом, а при нажатии
    function changeFilter (value: FilterValuesType) { // принимает значение value. value строго типизированно FilterValuesType
        setFilter (value); // когда в value попадет значение через колбеки из нажатой кнопки в тудулисте: либо ALL, либо Active, либо Completed, то функция setFilter изменит стейт родителя и реакт запустит перерисовку
    }

    // добавление новой таски
    function addTask (title: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [task, ...tasks];
        setTasks (newTasks);
    }

    // удаление таски по id
    function removeTask (id: string) { // propsы строка
        let filteredTasks = tasks.filter( (t) => t.id !== id) // метод filter массива пробегает по всем объектам и
        // заносит в новый объект только те элементы, которые удоволетворяют условиям ( отрисовывается каждая таска которая не равна удаленному ID)
        setTasks (filteredTasks); // функция setTasks кидает отфильтрованный массив filteredTasks в стейт и раз мы изменили стейт, то реакт автоматически запускает перерисовку
    }


    return (
        <div className={'App'}>
            <Todolist
                title={"What to learn"} // заголовки компоненты
                tasks={tasksForTodolist}  // отфильтрованные таски по кнопкам
                removeTask={removeTask} //  удаление таски
                changeFilter={changeFilter} // юзабельность кнопок all active completed
                addTask={addTask} // добавление таски
            />
        </div>
    );
}

export default App;
