import React, {useReducer} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/Todolist";
import {AddNewItemComponent} from "./components/AddNewItemComponent";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoTitleAC,
    changeTodoListFilterAC,
    removeTodolistAC,
} from './state/reducers/todolists-reducer';
import {addTasksAC, changeTasksAC, changeTitleTaskAC, removeTasksAC, tasksReducer} from './state/reducers/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './state/store';


export type FilterValuesType = 'All' | 'Active' | 'Completed' ; // тип значения фильтров (пропсов) для кнопок
export type TodoListsType = {
    todolistId: string
    todolistTitle: string
    todolistFilter: FilterValuesType
}
export type AppTasksType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    
    const dispatch = useDispatch();
    
    const todolists = useSelector <RootStateType, Array<TodoListsType>> (state => state.todolists )
    const tasks = useSelector <RootStateType, AppTasksType>( state => state.tasks)
    

    // удаление таски по id
    function removeTask (taskIdAC: string, todolistIdAC: string) {
        dispatch(removeTasksAC (taskIdAC, todolistIdAC))
    }
    
    // добавление новой таски
    function addNewTask(tasksNewTitleInput: string, todoListId: string) {
        dispatch(addTasksAC(tasksNewTitleInput,  todoListId))
    }
    
    // change Status - изменить статус таски, изменить статус в isDone
    function changeTaskStatus(tasksId: string, tasksIsDone: boolean, todoListsId: string) {
        dispatch(changeTasksAC(tasksId, tasksIsDone, todoListsId))
    }
    
    // изменение названия таски
    function changeTaskTitle(tasksId: string, tasksTitle: string, todoListsId: string) {
        dispatch(changeTitleTaskAC(tasksId, tasksTitle, todoListsId))
    }
    
    
    
    
    // меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
    function changeFilterTodolist (filterValue: FilterValuesType, todoListsId: string) {
        dispatch(changeTodoListFilterAC(todoListsId, filterValue))
    }
    
    // удаление тудулиста
    function removeTodoList (todoListsId: string) {
        dispatch(removeTodolistAC(todoListsId))
    }
    
    // редактирование тудулиста
    function changeTodoListTitle (todoListsId: string, newChangeTitleValue: string) {
        dispatch(changeTodoTitleAC(todoListsId, newChangeTitleValue))
    }

    // добавление нового тудулиста
    function addNewTodoList (todolistTitleAC: string) {
        dispatch(addTodoListAC(todolistTitleAC))
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
                            
                            let AllTodolistTasks = tasks[tl.todolistId]; /* берем все таски из 2 тудулистов */
                            let tasksForTodoList = AllTodolistTasks;
                            if (tl.todolistFilter === 'Active') { // при нажатии кнопки active, фильтр сравниваем из тудулиста
                                tasksForTodoList = AllTodolistTasks.filter( t => !t.taskIsDone) // если при фильтре у таски isDone = false, от пропустят таски только с false
                            }
                            if (tl.todolistFilter === 'Completed') { // при нажатии кнопки Completed, фильтр сравниваем из тудулиста
                                tasksForTodoList = AllTodolistTasks.filter( t => t.taskIsDone) // если при фильтре у таски isDone = true, от пропустят таски только с true
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

export default AppWithRedux;


