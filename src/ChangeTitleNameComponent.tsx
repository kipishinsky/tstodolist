import React, {ChangeEvent, useState} from "react";

type ChangeTitleNamePropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function ChangeTitleName (props: ChangeTitleNamePropsType) {

    let [editModeHook, setEditModeHook] = useState(false);
    let [titleChangeNameHook, setTitleChangeNameHook] = useState('')

    const activateEditMode = () => {
        setEditModeHook(true)
        setTitleChangeNameHook (props.title)
        debugger
    }
    const activateViewMode = () => {
        setEditModeHook(false)
        props.onChange(titleChangeNameHook)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleChangeNameHook(e.currentTarget.value)
    }


    return (
        editModeHook
            ? <input
                value={titleChangeNameHook}
                onBlur={activateViewMode}
                autoFocus
                onChange={onChangeTitleHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}