import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from '@material-ui/core';
import { AddBox } from "@material-ui/icons";

type AddNewItemPropsType = {
    addNewItem: (callBackFunction: string) => void
}

export function AddNewItemComponent (props: AddNewItemPropsType) {

    //стейт новых тасок.
    const [addNewItemListHook, setAddNewItemListHook] = useState('');
    const [errorItemListHook, setErrorItemListHook] = useState<string | null>(null)

    // добавление нового тудулиста
    const addNewItem = () => {
        if (addNewItemListHook.trim() !== '') {
            props.addNewItem(addNewItemListHook);
            setAddNewItemListHook('');
        } else {
            setErrorItemListHook('Title is required');
        }
    }

    // читаем введенные значения в инпуте и отправляем его наверх в апп с помощью колбек функции
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // e: ChangeEvent<HTMLInputElement> - сюда приходят значения с поля ввода ( простыми словами введенные, пользователем, значения.) ChangeEvent происходит с инпутом (HTMLInputElement)
        // берем текушие значения из инпута(e: ChangeEvent<HTMLInputElement>)  и преобразуем их в функцию (setNewTaskTitle) добавления нового значения в title. значение отлавливаем из inputa (e.currentTarget.value)
        setAddNewItemListHook(e.//event сокрщ. е. - любое событие, которое происходит в объектной модели документа
            currentTarget.// обработчик события (ловим событие) e.currentTarget Определяет элемент, в котором в данный момент обрабатывается событие, при движении события внутри DOM. currentTarget: это элемент, на который вы фактически связали событие. Это никогда не изменится. target: какой бы элемент ни был на самом деле нажат. Он может меняться, поскольку это может быть внутри элемента, к которому было связано событие.
            value); // мы можем получить данные из этого поля ввода. А после, например, вывести их в консоль
    }

    // добавляем тудулист с ENTER
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { //берем событие с клавиатуры из инпута  (e: KeyboardEvent<HTMLInputElement>) KeyboardEvent происходит с инпутом (HTMLInputElement)
        setErrorItemListHook(null);
        if (e.charCode === 13) { // charCode это значение кнопок клавы на машином языке, понять номер каждой клавиши можно на сайте https://keycode.info/. если нажатие клавиши на клаве ентер, то по чаркоду это 13, если это равно по типу 13 то добавь новую таску
            addNewItem(); // добавь новый элемент
        }
    }
    return (
        <div>
            <TextField //поле ввода
                variant={'outlined'}
                error={!!errorItemListHook} // добавление подсветки ошибки
                value={addNewItemListHook} // callback // получаем данные из поля ввода
                onChange={onChangeHandler} // callback // onChange показывает и позволяет изменять значения поля ввода
                onKeyPress={onKeyPressHandler} // callback // (onKeyPress - когда клавиша нажата. onKeyDown - когда клавиша нажата, но не отпущена. onKeyUp когда клавиша поднята. onKeyDown+onKeyUp = onKeyPress) при нажатии enter добавляем таску
                label={'Enter text'}
                helperText={errorItemListHook}
            />
            <IconButton // новые кнопки из библиотеки material ui
                onClick={addNewItem} // добавление нового тудулиста
                color={'primary'}
            > <AddBox /> </IconButton>
        </div>
    )
}