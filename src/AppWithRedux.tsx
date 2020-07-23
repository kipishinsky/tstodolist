import React, {useCallback, useReducer} from 'react';
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
import {addTasksAC, changeStatusTaskAC, changeTitleTaskAC, removeTasksAC, tasksReducer} from './state/reducers/tasks-reducer';
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
    console.log('AppWithRedux render')
    
    const dispatch = useDispatch();
    const todolists = useSelector <RootStateType, Array<TodoListsType>> (state => state.todolists )
    const tasks = useSelector <RootStateType, AppTasksType>( state => state.tasks)
    

    // удаление таски по id
    const removeTask = useCallback ((taskIdAC: string, todolistIdAC: string) => {
        dispatch(removeTasksAC (taskIdAC, todolistIdAC))
    }, [dispatch]);
    
    // добавление новой таски
    const addNewTask = useCallback ((tasksNewTitleInput: string, todoListId: string) => {
        dispatch(addTasksAC(tasksNewTitleInput,  todoListId))
    }, [dispatch]);
    
    // change Status - изменить статус таски, изменить статус в isDone
    const changeTaskStatus = useCallback ((tasksId: string, tasksIsDone: boolean, todoListsId: string) => {
        dispatch(changeStatusTaskAC(tasksId, tasksIsDone, todoListsId))
    }, [dispatch])
    
    // изменение названия таски
    const changeTaskTitle = useCallback ((tasksId: string, tasksTitle: string, todoListsId: string) => {
        dispatch(changeTitleTaskAC(tasksId, tasksTitle, todoListsId))
    }, [dispatch]);
    
    
    
    
    // меняем данные кнопок не хардкодом, а при нажатии (change Filter - изменить фильтр)
    const changeFilterTodolist = useCallback ((filterValue: FilterValuesType, todoListsId: string) => {
        dispatch(changeTodoListFilterAC(todoListsId, filterValue))
    }, [dispatch]);
    
    // удаление тудулиста
    const removeTodoList = useCallback ((todoListsId: string) => {
        dispatch(removeTodolistAC(todoListsId))
    }, [dispatch]);
    
    // редактирование тудулиста
    const changeTodoListTitle = useCallback ((todoListsId: string, newChangeTitleValue: string) => {
        dispatch(changeTodoTitleAC(todoListsId, newChangeTitleValue))
    }, [dispatch]);

    // добавление нового тудулиста
    const addNewTodoList = useCallback ((todolistTitleAC: string) => {
        dispatch(addTodoListAC(todolistTitleAC))
    }, [dispatch]);
    
    
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


