import React, {useState} from 'react'
import './App.css'
import {v1} from 'uuid'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {FilterValuesType, TodolistsReducerType} from "../../state/reducers/todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks/tasks-api";
import {AddNewItemComponent} from "../add-new-item/AddNewItemComponent";
import {TodoList} from "../todolists/Todolist";


export type AppTasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsReducerType>>([
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0
        }
    ])

    let [tasks, setTasks] = useState<AppTasksType>({
        [todolistId1]: [
            {
                id: v1(),
                todoListId: todolistId1,
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0
            },
            {
                id: v1(),
                todoListId: todolistId1,
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0
            }
        ],
        [todolistId2]: [
            {
                id: v1(),
                todoListId: todolistId2,
                title: 'Milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0
            },
            {
                id: v1(),
                todoListId: todolistId2,
                title: 'React Book',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                completed: false,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0

            }
        ]
    })

    function removeTask(id: string, todoListId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todoListId]
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todoListId] = todolistTasks.filter(t => t.id != id)
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
    }

    function addNewTask(title: string, todolistId: string) {
        let task = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistId,
            completed: false,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        }
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId]
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks]
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId]
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id)
        //изменим таску, если она нашлась
        if (task) {
            task.status = status
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId]
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id)
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks})
        }
    }

    function changeFilterTodolist(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodoList(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id))
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id] // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks})
    }

    function changeTodoListTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title
            setTodolists([...todolists])
        }
    }

    function addNewTodoList(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistsReducerType = {
            id: newTodolistId, title: title, filter: 'All', addedDate: '',
            order: 0
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
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
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodoList = allTodolistTasks

                            if (tl.filter === 'Active') {
                                tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'Completed') {
                                tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        todolistId={tl.id}
                                        todolistTitle={tl.title} // заголовки компоненты
                                        tasks={tasksForTodoList}  // отфильтрованные таски по кнопкам
                                        removeTask={removeTask} //  удаление таски
                                        changeFilter={changeFilterTodolist} // юзабельность кнопок all active completed
                                        addNewTask={addNewTask} // добавление новой таски
                                        changeTaskStatus={changeTaskStatus} //передаем функцию, чтобы менять статус таске
                                        changeTaskTitle={changeTaskTitle} //передаем функцию, чтобы менять статус таске
                                        filterButton={tl.filter} // передаем массив фильтров let [filter, setFilter] = useState <FilterValuesType>
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App
