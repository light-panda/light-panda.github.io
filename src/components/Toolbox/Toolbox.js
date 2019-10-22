import React from 'react'
import {DeleteIcon, EditIcon} from "../Icons/icons";

function Toolbox({className, innerProps, onDelete}) {
    return (
        <div className={className} {...innerProps}>
            <EditIcon/>
            <DeleteIcon onClick={onDelete}/>
        </div>
    )
}

export default Toolbox
