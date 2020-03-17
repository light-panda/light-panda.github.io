import React from 'react'
import {DeleteIcon, EditIcon} from "../Icons/icons";

function Toolbox({className, innerProps, onDelete, onEdit}) {
    return (
        <div className={className} {...innerProps}>
            <EditIcon onClick={onEdit} className={'list__item__toolbox__edit'}/>
            <DeleteIcon onClick={onDelete} className={'list__item__toolbox__delete'}/>
        </div>
    )
}

export default Toolbox
