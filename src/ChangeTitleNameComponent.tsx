import React, {useState} from "react";

type ChangeTitleNamePropsType = {
    title: string
}

export function ChangeTitleName(props: ChangeTitleNamePropsType) {

    let [editModeHook, setEditModeHook] = useState(false);

    const activateEditMode = () => {
        setEditModeHook(true)
    }

    return (
        editModeHook
            ? <input value={props.title}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}