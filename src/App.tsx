import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/Todolist";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {v1} from 'uuid'; // генерит айдишки
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import { Menu } from '@material-ui/icons';


export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок
export type TodoListsType = {
    todolistId: string
    todolistTitle: string
    todolistFilter: FilterValuesType
}
export type AppTasksType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todoListId1 = v1(); let todoListId2 = v1();
    
    let [todoLists, setTodoLists] = useState <Array<TodoListsType>> ([
        {
            todolistId: todoListId1,
            todolistTitle: 'What to learn',
            todolistFilter: 'All'
        },
        {
            todolistId: todoListId2,
            todolistTitle: 'What to buy',
            todolistFilter: 'All'
        }
    ])
    let [tasksHook, setTasksHook] = useState <AppTasksType> ({
        [todoListId1]: [
            { taskId: v1(), taskTitle: "HTML&CSS", taskIsDone: true},
            { taskId: v1(), taskTitle: "JS", taskIsDone: true},
            { taskId: v1(), taskTitle: "React js", taskIsDone: false}, // sadasdasdas
            { taskId: v1(), taskTitle: "TypeScript", taskIsDone: true},
            { taskId: v1(), taskTitle: "Rest API", taskIsDone: false},
            { taskId: v1(), taskTitle: "GraphQL", taskIsDone: false}
        ],
        [todoListId2]: [
            {taskId: v1(), taskTitle: 'Milk', taskIsDone: false},
            {taskId: v1(), taskTitle: 'Iphone', taskIsDone: true},
            {taskId: v1(), taskTitle: 'React book', taskIsDone: true},
            {taskId: v1(), taskTitle: 'Bicycle', taskIsDone: false}
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
        tasksHook[todoListsId] = newTasksHook.filter (t => t.taskId !== tasksId);
        setTasksHook({...tasksHook})
    }
    
    // добавление новой таски
    /*
        в параметры функции передаем newTitle который приходит из инпута,
        плюс приходят массив id-шников.
    */
    function addNewTask (tasksNewTitleInput: string, tasksId: string) {
        debugger
        let newTodoListTasks = tasksHook[tasksId]; // достанем нужный массив по tasksHookID
        let newTask = {taskId: v1(), taskTitle: tasksNewTitleInput, taskIsDone: false}; // перезапишем в этом объекте массив для нужного тудулиста копией,
        tasksHook[tasksId] = [newTask, ...newTodoListTasks];
        setTasksHook({...tasksHook})
    }
    
    // change Status - изменить статус таски, изменить статус в isDone
    function changeTaskStatus (tasksId: string, tasksIsDone: boolean, todoListsId: string) {
        let newTodoListTasks = tasksHook[todoListsId];
        let newTask = newTodoListTasks.find (t => t.taskId === tasksId)
        if (newTask) {
            newTask.taskIsDone = tasksIsDone;
            setTasksHook ({...tasksHook})
        }
    }
    
    // изменение названия таски
    function changeTaskTitle (tasksId: string, tasksTitle: string, todoListsId: string) {
        let newTodoListTasks = tasksHook[todoListsId];
        let newTask = newTodoListTasks.find (t => t.taskId === tasksId)
        if (newTask) {
            newTask.taskTitle = tasksTitle;
            setTasksHook ({...tasksHook})
        }
    }
    
    
    
    
    // меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
    function changeFilterTodolist (filterValue: FilterValuesType, todoListsId: string) { /*
            в функцию в параметры кладем FilterValuesType,
    */
        let newTodoList = todoLists.find ( tl => tl.todolistId === todoListsId);
        if (newTodoList) {
            newTodoList.todolistFilter = filterValue
            setTodoLists ([...todoLists])
        }
    }
    
    // удаление тудулиста
    function removeTodoList (todoListsId: string) {
        //засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodoLists(todoLists.filter(tl => tl.todolistId != todoListsId));
        // удалим таски дяля этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasksHook[todoListsId]; // удаляем свойство из объекта, значение которого является массив тасок
        setTasksHook({...tasksHook})
    }
    
    // редактирование тудулиста
    function changeTodoListTitle (todoListsId: string, newChangeTitleValue: string) {
        const todoList = todoLists.find(tl => tl.todolistId === todoListsId);
        if (todoList) {
            todoList.todolistTitle = newChangeTitleValue;
            setTodoLists([...todoLists])
        }
    }

    // добавление нового тудулиста
    function addNewTodoList (newTodoListTitleInput: string) { //
        let newTodoListId = v1() // присваиваем новый id
        let newTodoList: TodoListsType = {todolistId: newTodoListId, todolistTitle: newTodoListTitleInput, todolistFilter: 'All'}
        setTodoLists ([newTodoList, ...todoLists])
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
                    
                    { todoLists.map((tl) => {
                            
                            let allTodoListTasks = tasksHook[tl.todolistId]; /* берем все таски из 2 тудулистов */
                            let tasksForTodoList = allTodoListTasks;
                            if (tl.todolistFilter === 'Active') { // при нажатии кнопки active, фильтр сравниваем из тудулиста
                                tasksForTodoList = allTodoListTasks.filter(t => !t.taskIsDone) // если при фильтре у таски isDone = false, от пропустят таски только с false
                            }
                            if (tl.todolistFilter === 'Completed') { // при нажатии кнопки Completed, фильтр сравниваем из тудулиста
                                tasksForTodoList = allTodoListTasks.filter(t => t.taskIsDone) // если при фильтре у таски isDone = true, от пропустят таски только с true
                            }
                
                            return (
                                
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodoList
                                            key={tl.todolistId}
                                            todolistId={tl.todolistId}
                                            todolistTitle={tl.todolistTitle} // заголовки компоненты
                                            tasks={tasksForTodoList}  // отфильтрованные таски по кнопкам
                                            removeTask={removeTask} //  удаление таски
                                            changeFilter={changeFilterTodolist} // юзабельность кнопок all active completed
                                            addNewTask={addNewTask} // добавление новой таски
                                            changeTaskStatus={changeTaskStatus} //передаем функцию, чтобы менять статус таске
                                            changeTaskTitle={changeTaskTitle} //передаем функцию, чтобы менять статус таске
                                            filterButton={tl.todolistFilter} // передаем массив фильтров let [filter, setFilter] = useState <FilterValuesType>
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


