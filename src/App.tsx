import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {createHook} from "async_hooks";
import {v1} from "uuid";

// Ошибки:
// failed to compile: is not defined - не определено

export type FilterValuesType = "All" | "Active" | "Completed" ; // тип пропсов для кнопок

function App() {

    //стейт тасок
    let [tasks, setTasks] = useState ([   // массив тасок const - неизменяемо
        { id: v1(), title: "HTML&CSS", isDone: true},
        { id: v1(), title: "JS", isDone: true},
        { id: v1(), title: "React js", isDone: false},
        { id: v1(), title: "TypeScript", isDone: true},
        { id: v1(), title: "Rest API", isDone: false},
        { id: v1(), title: "GraphQL", isDone: false}
    ]);

    // удаление таски
    function removeTask (id: string) {
        let filteredTasks = tasks.filter( (t) => t.id !== id) // метод filter массива пробегает по всем объектам и заносит в новый объект только те элементы, которые удоволетворяют условиям. в данном случае по ID
        setTasks (filteredTasks);
    }

    // юзабельность кнопок алл, актив, комлитед
    let [filter, setFilter] = useState <FilterValuesType> ("All");
    let tasksForTodolist = tasks;
        if (filter === "Active") {
            tasksForTodolist = tasks.filter (t => t.isDone === false);
        }
        if (filter === "Completed") {
            tasksForTodolist = tasks.filter (t => t.isDone === true);
        }
    function changeFilter (value: FilterValuesType) {
        setFilter (value);
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


    return (
        <div className={'App'}>
            <Todolist
                title={"What to learn"} // заголовки компоненты
                tasks={tasksForTodolist}  // сами таски
                removeTask={removeTask} //  удаление таски
                changeFilter={changeFilter} // юзабельность кнопок all active completed
                addTask={addTask} // добавление таски
            />
        </div>
    );
}

export default App;
