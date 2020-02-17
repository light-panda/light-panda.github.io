import {CSSTransition, Transition} from "react-transition-group";
import React, {useState} from "react";
import Toolbox from "../Toolbox/Toolbox";
import classNames from 'classnames';
import mobile from "is-mobile";

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

function useHover() {
    const [hovered, set] = useState(false);
    const binder = {
        onMouseEnter: () => set(true),
        onMouseLeave: () => set(false)
    };
    return [binder, hovered];
}


const  TodoItem = React.forwardRef(({todo, itemsBeingDeleted, deleteItem, innerRef, innerProps, onClick}, ref) => {
    const [hoverProps, isHovered] = useHover()
    const [hoverToolboxProps, isToolboxHovered] = useHover()
    const [extended, setExtended] = useState(false)

    return (
        <Transition in={!!itemsBeingDeleted.find(item => item.id === todo.id)}
                    timeout={duration} onEntered={() => deleteItem({id: todo.id})}>
            {deletingState => (
                <div className={'list__item'}
                     ref={ref || innerRef} {...innerProps}>
                    <CSSTransition in={mobile() ? todo.selected : (isHovered || (isToolboxHovered && extended))} timeout={{enter: 0, exit: 500}}
                                   classNames={'list__item__toolbox'}
                                   onEntered={() => setExtended(true)}
                                   onExited={() => setExtended(false)}>
                        {() => (
                            <>
                                <Toolbox className={'list__item__toolbox'} innerProps={hoverToolboxProps} onDelete={deleteItem}/>
                                <li {...hoverProps} onClick={onClick} className={classNames('list__item__content', mobile() && todo.selected && 'list__item__content-selected')}
                                    style={{...defaultStyle, ...transitionStyles[deletingState]}}>
                                    {todo.text}
                                </li>
                            </>
                        )}
                    </CSSTransition>
                </div>
            )}
        </Transition>
    )
})

TodoItem.defaultProps = {
  selected: false
}

export default TodoItem
