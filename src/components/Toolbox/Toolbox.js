import React from 'react'
import {ColorIcon, DeleteIcon, EditIcon} from "../Icons/icons";

function Toolbox({className, innerProps, onDelete, onEdit, onColor}) {
    return (
        <div className={className} {...innerProps}>
            <ColorIcon onClick={onColor} className={'list__item__toolbox__color'}/>
            <EditIcon onClick={onEdit} className={'list__item__toolbox__edit'}/>
            <DeleteIcon onClick={onDelete} className={'list__item__toolbox__delete'}/>
        </div>
    )
}

export default Toolbox
