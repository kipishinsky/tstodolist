import React, {useReducer} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/Todolist";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {v1} from 'uuid'; // генерит айдишки
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoTitleAC,
    changeTodoListFilterAC,
    removeTodolistAC,
    todoListsReducer
} from './state/todolists-reducer';
import {addTasksAC, changeTasksAC, changeTitleTaskAC, removeTasksAC, tasksReducer} from './state/tasks-reducer';


export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок
export type TodoListsType = {
    todolistId: string
    todolistTitle: string
    todolistFilter: FilterValuesType
}
export type AppTasksType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {
    
    let todoListId1 = v1(); let todoListId2 = v1();
    
    let [todolists, dispatchTodolistsReducer] = useReducer ( todoListsReducer, [
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
    
    let [tasks, dispatchTasksReducer] = useReducer ( tasksReducer, {
        [todoListId1]: [
            { taskId: v1(), taskTitle: "HTML&CSS", taskIsDone: true},
            { taskId: v1(), taskTitle: "JS", taskIsDone: true},
            { taskId: v1(), taskTitle: "React js", taskIsDone: false},
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
    function removeTask (taskIdAC: string, todolistIdAC: string) {
        debugger
        dispatchTasksReducer(removeTasksAC (taskIdAC, todolistIdAC))
    }
    
    // добавление новой таски
    function addNewTask(tasksNewTitleInput: string, todoListId: string) {
        dispatchTasksReducer(addTasksAC(tasksNewTitleInput,  todoListId))
    }
    
    // change Status - изменить статус таски, изменить статус в isDone
    function changeTaskStatus(tasksId: string, tasksIsDone: boolean, todoListsId: string) {
        dispatchTasksReducer(changeTasksAC(tasksId, tasksIsDone, todoListsId))
    }
    
    // изменение названия таски
    function changeTaskTitle(tasksId: string, tasksTitle: string, todoListsId: string) {
        dispatchTasksReducer(changeTitleTaskAC(tasksId, tasksTitle, todoListsId))
    }
    
    
    
    
    // меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
    function changeFilterTodolist (filterValue: FilterValuesType, todoListsId: string) {
        dispatchTodolistsReducer(changeTodoListFilterAC(todoListsId, filterValue))
    }
    
    // удаление тудулиста
    function removeTodoList (todoListsId: string) {
        dispatchTodolistsReducer(removeTodolistAC(todoListsId))
        dispatchTasksReducer(removeTodolistAC(todoListsId))
    }
    
    // редактирование тудулиста
    function changeTodoListTitle (todoListsId: string, newChangeTitleValue: string) {
        dispatchTodolistsReducer(changeTodoTitleAC(todoListsId, newChangeTitleValue))
    }

    // добавление нового тудулиста
    function addNewTodoList (todolistTitleAC: string) {
        const action = addTodoListAC(todolistTitleAC)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
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
                    
                    { todolists.map( tl => {
                            
                            let allTodoListTasks = tasks[tl.todolistId]; /* берем все таски из 2 тудулистов */
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

export default AppWithReducers;


