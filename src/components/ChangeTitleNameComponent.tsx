import React, {ChangeEvent, useState} from "react";
import { TextField } from "@material-ui/core";

type ChangeTitleNamePropsType = {
    changeTitleValue: string
    onChange: (newItemValue: string) => void
}

export function ChangeTitleNameComponent (props: ChangeTitleNamePropsType) {

    let [editModeHook, setEditModeHook] = useState(false);
    let [titleChangeNameHook, setTitleChangeNameHook] = useState('')

    const activateEditMode = () => {
        setEditModeHook(true)
        setTitleChangeNameHook (props.changeTitleValue) // приходит старое значение из value
    }
    const activateViewMode = () => {
        setEditModeHook(false)
        props.onChange(titleChangeNameHook) // уходит новое значение
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleChangeNameHook(e.currentTarget.value)
    }


    return (
        editModeHook
            ? <TextField
                value={titleChangeNameHook}
                onBlur={activateViewMode}
                autoFocus
                onChange={onChangeTitleHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.changeTitleValue}</span>
    )
}