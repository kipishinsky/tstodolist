import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

// условия типов пропсов для тасок
export type TaskType = { //type какого типа будут таски, использующиеся в PropsType  Array<TaskType>
    id: string
    title: string
    isDone: boolean
}

// условия типов пропсов для функции тудулист
type PropsType = {
    title: string // в title можно писать только строку
    tasks: Array<TaskType> // тип массив объектов // type TaskType
    // tasks: TaskType []  - можно так же писать и будет работать
    removeTask: (taskId: string) => void // удаление тасок происходит только по id и типу string. принимает айдишник и ничего не возращает
    changeFilter: (value: FilterValuesType ) => void // в changeFilter можно указать только строку и точное название ("All" |(<- или) "Active" |(<- или) "Completed") или алл или актив или комплетед. ТС будет следить за правильностью написания данных
    addNewTask: (title: string) => void // функция которая принимает title string и ничего не возвращает
    changeTaskStatus: (id: string, isDone: boolean) => void //isDone меняет значения
    filter: FilterValuesType
}


export function Todolist (props: PropsType) { // props: any - что угодно, тоесть не задали четко тип, который будет отслеживаться

    //стейт новых тасок.
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState < string | null > (null)

    /* cтарое добавление новой таски
    const addTask = () => { // в callback функции отдаем значение наверх в стейт апп
        props.addTask(newTaskTitle); // в пропсах к нам приходит функция добавления новой таски. в эту функцию мы кладем значения новой таски из стейта новых тасок и передаем это в колбеках
        setNewTaskTitle(''); // зануляем значение в input == очистить значение в стейте
    }*/

    // новое добавление таски с защитой от пустого инпута
    const addTaskClickButton = () => {
      if (newTaskTitle.trim() !== '') {
          props.addNewTask(newTaskTitle);
          setNewTaskTitle('');
      } else {
          setError('Title is required');
      }
        // const addTaskClickButton = () => { // callback функция при нажатии +
        //  if (newTaskTitle.trim() !== '') { // если при добавлении таски в поле ввода введенные значения без пробелов не равны пустой строке
        //      props.addNewTask(newTaskTitle);; // то вызови функцию addNewTask и положи в нее newTaskTitle ( то значение, которое пришло из инпута и прошло проверку)
        //      setNewTaskTitle(''); // потом сетни в стейт дефолтное значение с пустой строкой
        //  } else { // иначе
        //           setError('Title is required'); // выведи надпись
        //  }
   }

    // читаем введенные значения в инпуте и отправляем его наверх в апп с помощью колбек функции
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // e: ChangeEvent<HTMLInputElement> - сюда приходят значения с поля ввода ( простыми словами введенные, пользователем, значения.) ChangeEvent происходит с инпутом (HTMLInputElement)
        // берем текушие значения из инпута(e: ChangeEvent<HTMLInputElement>)  и преобразуем их в функцию (setNewTaskTitle) добавления нового значения в title. значение отлавливаем из inputa (e.currentTarget.value)
        setNewTaskTitle(e. //event сокрщ. е. - любое событие, которое происходит в объектной модели документа
            currentTarget. // обработчик события (ловим событие) e.currentTarget Определяет элемент, в котором в данный момент обрабатывается событие, при движении события внутри DOM. currentTarget: это элемент, на который вы фактически связали событие. Это никогда не изменится. target: какой бы элемент ни был на самом деле нажат. Он может меняться, поскольку это может быть внутри элемента, к которому было связано событие.
            value); // мы можем получить данные из этого поля ввода. А после, например, вывести их в консоль
    }

    // добавляем таску с ENTER
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { //берем событие с клавиатуры из инпута  (e: KeyboardEvent<HTMLInputElement>) KeyboardEvent происходит с инпутом (HTMLInputElement)
        setError(null);
        if (e.charCode === 13) { // charCode это значение кнопок клавы на машином языке, понять номер каждой клавиши можно на сайте https://keycode.info/. если нажатие клавиши на клаве ентер, то по чаркоду это 13, если это равно по типу 13 то добавь новую таску
            addTaskClickButton(); // добавь таску
        }
    }

    // кнопки
    const onAllClickHandler = () => {props.changeFilter ("All")} // кнопка all отдает значение наверх и в APP уже меняется стейт
    const onActiveClickHandler = () => {props.changeFilter ("Active")} // кнопка Active отдает значение наверх и в APP уже меняется стейт
    const onCompletedClickHandler = () => {props.changeFilter ("Completed")} // кнопка Completed отдает значение наверх и в APP уже меняется стейт

    return (
        <div>
            <h3>{props.title}</h3> {/*заголовки тасок*/}
            <div>
                <input //поле ввода
                    onChange={onChangeHandler} // callback // onChange показывает и позволяет изменять значения поля ввода
                    value={newTaskTitle} // callback // получаем данные из поля ввода
                    onKeyPress={onKeyPressHandler} // callback // (onKeyPress - когда клавиша нажата. onKeyDown - когда клавиша нажата, но не отпущена. onKeyUp когда клавиша поднята. onKeyDown+onKeyUp = onKeyPress) при нажатии enter добавляем таску
                />
                <button
                    onClick={addTaskClickButton} //при нажатии на кнопку вызываем функцию addTask и отдаем значение обратно наверх, где сработает функция добавления таски (addTask для app)
                >+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map ((t) => { // метод map на основе всех элементов создает новый массив с видоизменными элементами (другими объектами)

                        const onClickHandler = () => props.removeTask(t.id) //при нажатии кнопки удаляется таска. ВАЖНО функция removeTask вызывается и туда залетают параметры с id и улетает назад в колбеке

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus (t.id, newIsDoneValue);
                            // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //    let newIsDoneValue = e.currentTarget.checked;
                            //    props.changeTaskStatus (t.id, newIsDoneValue);
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}/> {/*состояние галки*/}
                                <span>{t.title}</span> {/*сами таски*/}
                                <button onClick={onClickHandler}>x</button>
                            </li>)
                        })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}


