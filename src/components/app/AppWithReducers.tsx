import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks/tasks-api";
import {
    addTasksAC,
    changeStatusTaskAC, changeTitleTaskAC,
    removeTasksAC,
    tasksReducer
} from "../../state/reducers/tasks-reducer/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC, changeTodoTitleAC,
    FilterValuesType, removeTodolistAC, todoListsReducer,

} from "../../state/reducers/todolists-reducer/todolists-reducer";
import {AddNewItemComponent} from "../add-new-item/AddNewItemComponent";
import {TodoList} from "../todolists/Todolist";



export type AppTasksType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todoListsReducer, [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "All",
            addedDate: '',
            order: 0},
        {
            id: todolistId2,
            title: "What to buy",
            filter: "All",
            addedDate: '',
            order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    });

    function removeTask(taskId: string, todolistId: string) {
        dispatchToTasks(removeTasksAC(taskId, todolistId))
    }

    function addNewTask(tasksNewTitleInput: string, todoListId: string) {
        dispatchToTasks(addTasksAC(tasksNewTitleInput,  todoListId));
    }

    function changeTaskStatus(tasksId: string, status: TaskStatuses, todoListsId: string) {
        dispatchToTasks(changeStatusTaskAC(tasksId, status, todoListsId));
    }

    function changeTaskTitle(tasksId: string, tasksTitle: string, todoListsId: string) {
        dispatchToTasks(changeTitleTaskAC(tasksId, tasksTitle, todoListsId));
    }

    function changeFilterTodolist(filterValue: FilterValuesType, todoListsId: string) {
        dispatchToTodolists(changeTodoListFilterAC(todoListsId, filterValue));
    }

    function removeTodoList(todoListsId: string) {
        dispatchToTasks(removeTodolistAC(todoListsId));
        dispatchToTodolists(removeTodolistAC(todoListsId));
    }

    function changeTodoListTitle(todoListsId: string, newChangeTitleValue: string) {
        dispatchToTodolists(changeTodoTitleAC(todoListsId, newChangeTitleValue));
    }

    function addNewTodoList(todolistTitleAC: string) {
        dispatchToTasks(addTodoListAC(todolistTitleAC));
        dispatchToTodolists(addTodoListAC(todolistTitleAC));
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
                <Grid container style={{padding: "20px"}}>
                    <AddNewItemComponent addNewItem={addNewTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodoList = allTodolistTasks;

                            if (tl.filter === "Active") {
                                tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "Completed") {
                                tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
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
    );
}

export default AppWithReducers;
