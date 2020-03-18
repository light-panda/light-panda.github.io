import {CSSTransition} from "react-transition-group";
import React, {useEffect, useState} from "react";
import Toolbox from "../Toolbox/Toolbox";
import classNames from 'classnames';
import mobile from "is-mobile";
import {Draggable} from "react-beautiful-dnd";
import Editable from "../Editable";
import {useSpring, animated} from 'react-spring';
import mergeRefs from "react-merge-refs";
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

const callEach = (...functions) => {
    return (el) => {
        functions.forEach(func => console.log(func) || typeof func === 'function' && func(el))
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

let done = false

const  TodoItem = React.forwardRef(({todo, deleteItem, toggleItemSelection, index, setEditable, editItem}, _) => {
    const [hoverProps, isHovered] = useHover()
    const [deleting, setDeleting] = useState(false)
    const [hoverToolboxProps, isToolboxHovered] = useHover()
    const [extended, setExtended] = useState(false)

    const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })

    const deletingStyle = useSpring({
        opacity: deleting ? 0 : 1,
        marginTop: deleting ? -height : 0,
        onRest: props => {
            if (props.opacity <= 0) {
                deleteItem()
            }
        }
    })

    const handleTouchStart = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleItemSelection();
    }

    return (
        <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={deleting || (mobile() ? false : (!isHovered || isToolboxHovered))}>
            {(provided) => (
                <animated.div className={'list__item'}
                              ref={mergeRefs([ref, provided.innerRef])}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                  ...provided.draggableProps.style,
                                  ...provided.dragHandleProps ? provided.dragHandleProps.style : {},
                                  ...deletingStyle,
                                  pointerEvents: deleting ? 'none' : ''
                              }}
                >
                    <div className={'list__item__sticker'} {...hoverProps}>
                        <CSSTransition in={mobile() ? todo.selected : (isHovered || (isToolboxHovered && extended))} timeout={{enter: 0, exit: mobile() ? 0 : 500}}
                                       classNames={'list__item__toolbox'}
                                       onEntered={() => setExtended(true)}
                                       onExited={() => setExtended(false)}>
                            {() => (
                                <>
                                    <Toolbox className={'list__item__toolbox'} innerProps={hoverToolboxProps} onDelete={() => setDeleting(true)} onEdit={() => setEditable(true)}/>
                                    <li onTouchStart={handleTouchStart}
                                        className={classNames('list__item__content', mobile() && todo.selected && 'list__item__content-selected')}>
                                        <Editable value={todo.text} editable={todo.editable} onSave={editItem} setEditable={setEditable}/>
                                    </li>
                                </>
                            )}
                        </CSSTransition>
                    </div>
                </animated.div>
            )}
        </Draggable>
    )
})

TodoItem.defaultProps = {
  selected: false,
  toggleItemSelection: () => {}
}

export default TodoItem
