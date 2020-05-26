import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {createHook} from "async_hooks";

// Ошибки:
// failed to compile: is not defined - не определено

export type FilterValuesType = "All" | "Active" | "Completed" ;

function App() {

    let [tasks, setTasks] = useState ([   // массив тасок const - неизменяемо
        { id: 1, title: "HTML&CSS", isDone: true},
        { id: 2, title: "JS", isDone: true},
        { id: 3, title: "React js", isDone: false},
        { id: 4, title: "TypeScript", isDone: true},
        { id: 5, title: "Rest API", isDone: false},
        { id: 6, title: "GraphQL", isDone: false}
    ]);


    function removeTask (id: number) {  // удаление таски
        let filteredTasks = tasks.filter( (t) => t.id !== id) // метод filter массива пробегает по всем объектам и заносит в новый объект только те элементы, которые удоволетворяют условиям. в данном случае по ID
        setTasks (filteredTasks);
    }


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



    return (
        <div className="App">
            <Todolist
                title={"What to learn"} // заголовки компоненты
                tasks={tasksForTodolist}  // сами таски
                removeTask={removeTask} //  удаление таски
                changeFilter={changeFilter} // юзабельность кнопок all active completed
            />
        </div>
    );
}

export default App;
