import React, {useState} from 'react';
import './App.css';
import {TLDTaskHookType, TodoList} from "./components/Todolist";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {v1} from 'uuid'; // генерит айдишки
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import { Menu } from '@material-ui/icons';


export type AppFilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок
export type AppTodoListsHookType = {
    todoListsId: string
    todoListsTitle: string
    todoListsFilter: AppFilterValuesType
}
export type AppTasksHookType = {
    [key: string]: Array<TLDTaskHookType>
}

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

function App() {
    
    let todoListId1 = v1(); let todoListId2 = v1();
    
    let [todoListsHook, setTodoListsHook] = useState <Array<AppTodoListsHookType>> ([
        {
            todoListsId: todoListId1,
            todoListsTitle: 'What to learn',
            todoListsFilter: 'All'
        },
        {
            todoListsId: todoListId2,
            todoListsTitle: 'What to buy',
            todoListsFilter: 'All'
        }
    ])
    let [tasksHook, setTasksHook] = useState <AppTasksHookType> ({
        [todoListId1]: [
            { tasksId: v1(), tasksTitle: "HTML&CSS", tasksIsDone: true},
            { tasksId: v1(), tasksTitle: "JS", tasksIsDone: true},
            { tasksId: v1(), tasksTitle: "React js", tasksIsDone: false}, // sadasdasdas
            { tasksId: v1(), tasksTitle: "TypeScript", tasksIsDone: true},
            { tasksId: v1(), tasksTitle: "Rest API", tasksIsDone: false},
            { tasksId: v1(), tasksTitle: "GraphQL", tasksIsDone: false}
        ],
        [todoListId2]: [
            {tasksId: v1(), tasksTitle: 'Milk', tasksIsDone: false},
            {tasksId: v1(), tasksTitle: 'Iphone', tasksIsDone: true},
            {tasksId: v1(), tasksTitle: 'React book', tasksIsDone: true},
            {tasksId: v1(), tasksTitle: 'Bicycle', tasksIsDone: false}
        ]
    })

    // удаление таски по id
    function removeTask (todoListsId: string, tasksId: string) {  /*
    в параметры функции передаем ID удаляемой таски (эта таска лежит в определенном тудулисте,
    поэтому указываем ID тудулиста, из которого удалили таску)
    */
        let newTasksHook = tasksHook[todoListsId]; /*
         новый массив тасок хука [у которого лежат 2 новых массива тудулистов,
         у которого лежат 2 новых массива тасок(без той таски, что удалили)]
        */
        tasksHook[todoListsId] = newTasksHook.filter (t => t.tasksId !== tasksId);
        setTasksHook({...tasksHook})
    }
    
    // добавление новой таски
    /*
        в параметры функции передаем newTitle который приходит из инпута,
        плюс приходят массив id-шников.
    */
    function addNewTask (tasksNewTitleInput: string, tasksId: string) {
        let newTodoListTasks = tasksHook[tasksId]; // достанем нужный массив по tasksHookID
        let newTask = {tasksId: v1(), tasksTitle: tasksNewTitleInput, tasksIsDone: false}; // перезапишем в этом объекте массив для нужного тудулиста копией,
        tasksHook[tasksId] = [newTask, ...newTodoListTasks];
        setTasksHook({...tasksHook})
    }
    
    // change Status - изменить статус таски, изменить статус в isDone
    function changeTaskStatus (tasksId: string, tasksIsDone: boolean, todoListsId: string) {
        let newTodoListTasks = tasksHook[todoListsId];
        let newTask = newTodoListTasks.find (t => t.tasksId === tasksId)
        if (newTask) {
            newTask.tasksIsDone = tasksIsDone;
            setTasksHook ({...tasksHook})
        }
    }
    
    // изменение названия таски
    function changeTaskTitle (tasksId: string, tasksTitle: string, todoListsId: string) {
        let newTodoListTasks = tasksHook[todoListsId];
        let newTask = newTodoListTasks.find (t => t.tasksId === tasksId)
        if (newTask) {
            newTask.tasksTitle = tasksTitle;
            setTasksHook ({...tasksHook})
        }
    }
    
    
    
    
    // меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
    function changeFilterTodolist (filterValue: AppFilterValuesType, todoListsId: string) { /*
            в функцию в параметры кладем FilterValuesType,
    */
        let newTodoList = todoListsHook.find ( tl => tl.todoListsId === todoListsId);
        if (newTodoList) {
            newTodoList.todoListsFilter = filterValue
            setTodoListsHook ([...todoListsHook])
        }
    }
    
    // удаление тудулиста
    function removeTodoList (todoListsId: string) {
        //засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodoListsHook(todoListsHook.filter(tl => tl.todoListsId != todoListsId));
        // удалим таски дяля этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasksHook[todoListsId]; // удаляем свойство из объекта, значение которого является массив тасок
        setTasksHook({...tasksHook})
    }
    
    // редактирование тудулиста
    function changeTodoListTitle (todoListsId: string, newChangeTitleValue: string) {
        const todoList = todoListsHook.find(tl => tl.todoListsId === todoListsId);
        if (todoList) {
            todoList.todoListsTitle = newChangeTitleValue;
            setTodoListsHook([...todoListsHook])
        }
    }

    // добавление нового тудулиста
    function addNewTodoList (newTodoListTitleInput: string) { //
        let newTodoListId = v1() // присваиваем новый id
        let newTodoList: AppTodoListsHookType = {todoListsId: newTodoListId, todoListsTitle: newTodoListTitleInput, todoListsFilter: 'All'}
        setTodoListsHook ([newTodoList, ...todoListsHook])
        setTasksHook ({
            ...tasksHook,
            [newTodoListId]: []
        })
    }
    
    return (
        
        <div className={'App'}>
            
            
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            
            
            
            <Container fixed>
                
                <Grid container style={{padding: '20px'}}>
                    <AddNewItemComponent addNewItem={addNewTodoList}/>
                </Grid>
    
                <Grid container spacing={3}>
                    
                    { todoListsHook.map((tl) => {
                            
                            let allTodoListTasks = tasksHook[tl.todoListsId]; /* берем все таски из 2 тудулистов */
                            let tasksForTodoList = allTodoListTasks;
                            if (tl.todoListsFilter === 'Active') { // при нажатии кнопки active, фильтр сравниваем из тудулиста
                                tasksForTodoList = allTodoListTasks.filter(t => !t.tasksIsDone) // если при фильтре у таски isDone = false, от пропустят таски только с false
                            }
                            if (tl.todoListsFilter === 'Completed') { // при нажатии кнопки Completed, фильтр сравниваем из тудулиста
                                tasksForTodoList = allTodoListTasks.filter(t => t.tasksIsDone) // если при фильтре у таски isDone = true, от пропустят таски только с true
                            }
                
                            return (
                                
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={tl.todoListsId}
                                            todoListsId={tl.todoListsId}
                                            todoListsTitle={tl.todoListsTitle} // заголовки компоненты
                                            tasks={tasksForTodoList}  // отфильтрованные таски по кнопкам
                                            removeTask={removeTask} //  удаление таски
                                            changeFilter={changeFilterTodolist} // юзабельность кнопок all active completed
                                            addNewTask={addNewTask} // добавление новой таски
                                            changeTaskStatus={changeTaskStatus} //передаем функцию, чтобы менять статус таске
                                            changeTaskTitle={changeTaskTitle} //передаем функцию, чтобы менять статус таске
                                            filterButton={tl.todoListsFilter} // передаем массив фильтров let [filter, setFilter] = useState <FilterValuesType>
                                            removeTodoList={removeTodoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                </Grid>
                
            </Container>
        </div>
    );
}

export default App;


