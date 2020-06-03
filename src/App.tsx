import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {v1} from "uuid"; // генерит айдишки


export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

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

/*    //стейт тасок tasks массив тасок, setTasks функция, которая может поменять массив тасок
    let [tasks, setTasks] = useState <Array<TaskType>> ([   // массив тасок const - неизменяемо //  useState хранит массив <Array<TaskType>> (useState <Array<TaskType>>) , который к нам приходит через export из todolist и  обязательный инпут там, куда он пришел и используется. Тем самым мы указали тайп скрипту где нужно отслеживать все значения
        { id: v1(), title: "HTML&CSS", isDone: true},
        { id: v1(), title: "JS", isDone: true},
        { id: v1(), title: "React js", isDone: false},
        { id: v1(), title: "TypeScript", isDone: true},
        { id: v1(), title: "Rest API", isDone: false},
        { id: v1(), title: "GraphQL", isDone: false}
    ]);*/

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todolists, setTodolists] = useState <Array<TodolistsType>> ([
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'All'
            },

        {
            id: todoListId2,
            title: 'What to buy',
            filter: 'All'
            }
    ])


    let [tasks, setTasks] = useState ({
        [todoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true},
            { id: v1(), title: "JS", isDone: true},
            { id: v1(), title: "React js", isDone: false},
            { id: v1(), title: "TypeScript", isDone: true},
            { id: v1(), title: "Rest API", isDone: false},
            { id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Iphone', isDone: true},
            {id: v1(), title: 'React book', isDone: true},
            {id: v1(), title: 'Bicycle', isDone: false}
        ]
    })

    // меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
    function changeFilter (value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find ( tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value
            setTodolists ([...todolists])
        }
    }

    // добавление новой таски
    function addNewTask (title: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]; // достанем нужный массив по todolistID
        let task = {id: v1(), title: title, isDone: false}; // перезапишем в этом объекте массив для нужного тудулиста копией,
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks})
    }

    // удаление таски по id
    function removeTask (id: string, todoListId: string) {  // propsы строка

        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter (t => t.id != id);
        setTasks({... tasks})
    }

    // change Status - изменить статус, изменить статус таски в isDone
    function changeStatus (id: string, isDone: boolean, todoListId: string) { // функция changeStatus принимает строкой айдишник из библиотеки v1, isDone булевы
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find (t=> t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks ({... tasks})
        }
    }

    return (
        <div className={'App'}>
            {
                todolists.map ( (tl) => {
                    let allTodoListTasks = tasks[tl.id];
                    let tasksForTodoList = allTodoListTasks;
                    if (tl.filter === 'Active') { // при нажатии кнопки active
                        tasksForTodoList = allTodoListTasks.filter ( t => t.isDone === false) // если при фильтре у таски isDone = false, от пропустят таски только с false
                    }
                    if (tl.filter === 'Completed') { // при нажатии кнопки Completed
                        tasksForTodoList = allTodoListTasks.filter ( t => t.isDone === true) // если при фильтре у таски isDone = true, от пропустят таски только с true
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title} // заголовки компоненты
                            tasks={tasksForTodoList}  // отфильтрованные таски по кнопкам
                            removeTask={removeTask} //  удаление таски
                            changeFilter={changeFilter} // юзабельность кнопок all active completed
                            addNewTask={addNewTask} // добавление новой таски
                            changeTaskStatus={changeStatus} //передаем функцию, чтобы менять статус таске
                            filter={tl.filter} // передаем массив фильтров let [filter, setFilter] = useState <FilterValuesType>
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
