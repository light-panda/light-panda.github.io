import React from 'react'
import {DeleteIcon, EditIcon} from "../Icons/icons";

function Toolbox({className, innerProps, onDelete}) {
    return (
        <div className={className} {...innerProps}>
            <EditIcon className={'list__item__toolbox__edit'}/>
            <DeleteIcon onClick={onDelete} className={'list__item__toolbox__delete'}/>
        </div>
    )
}

export default Toolbox
