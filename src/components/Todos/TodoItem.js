import {CSSTransition, Transition} from "react-transition-group";
import React, {useState} from "react";
import Toolbox from "../Toolbox/Toolbox";
import classNames from 'classnames';
import mobile from "is-mobile";
import {Draggable} from "react-beautiful-dnd";
import Editable from "../Editable";

const duration = 400

const defaultStyle = {
    transition: `top ${duration}ms ease-in-out, left ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    opacity: 1,
    position: 'relative',
    top: '0px',
    left: '0px'
}

const transitionStyles = {
    entering: {opacity: 0, top: '-20px', left: '0px'},
};

const callEach = (...functions) => {
    return (el) => {
        functions.forEach(func => func(el))
    }
}

function useHover() {
    const [hovered, set] = useState(false);
    const binder = {
        onMouseEnter: () => set(true),
        onMouseLeave: () => set(false)
    };
    return [binder, hovered];
}


const  TodoItem = React.forwardRef(({todo, itemsBeingDeleted, deleteItem, toggleItemSelection, index, setEditable, editItem}, ref) => {
    const [hoverProps, isHovered] = useHover()
    const [hoverToolboxProps, isToolboxHovered] = useHover()
    const [extended, setExtended] = useState(false)


    const handleTouchStart = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleItemSelection();
    }

    return (
        <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={mobile() ? false : (!isHovered || isToolboxHovered)}>
            {(provided) => (
                <Transition in={!!itemsBeingDeleted.find(item => item.id === todo.id)}
                            timeout={duration} onEntered={() => deleteItem({id: todo.id})}>
                    {deletingState => (
                        <div className={'list__item'} ref={el => callEach(ref,provided.innerRef)(el)} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className={'list__item__sticker'} {...hoverProps}>
                                <CSSTransition in={mobile() ? todo.selected : (isHovered || (isToolboxHovered && extended))} timeout={{enter: 0, exit: mobile() ? 0 : 500}}
                                               classNames={'list__item__toolbox'}
                                               onEntered={() => setExtended(true)}
                                               onExited={() => setExtended(false)}>
                                    {() => (
                                        <>
                                            <Toolbox className={'list__item__toolbox'} innerProps={hoverToolboxProps} onDelete={deleteItem} onEdit={() => setEditable(true)}/>
                                            <li onTouchStart={handleTouchStart} className={classNames('list__item__content', (mobile() && todo.selected || !mobile() && isHovered && false) && 'list__item__content-selected')}
                                                style={{...defaultStyle, ...transitionStyles[deletingState]}}>
                                                <Editable value={todo.text} editable={todo.editable} onSave={editItem} setEditable={setEditable}/>
                                            </li>
                                        </>
                                    )}
                                </CSSTransition>
                            </div>
                        </div>
                    )}
                </Transition>
            )}
        </Draggable>
    )
})

TodoItem.defaultProps = {
  selected: false,
  toggleItemSelection: () => {}
}

export default TodoItem
