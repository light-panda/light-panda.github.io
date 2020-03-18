import {CSSTransition} from "react-transition-group";
import React, {useEffect, useState} from "react";
import Toolbox from "../Toolbox/Toolbox";
import classNames from 'classnames';
import mobile from "is-mobile";
import {Draggable} from "react-beautiful-dnd";
import Editable from "../Editable";
import {useSpring, animated, config} from 'react-spring';
import mergeRefs from "react-merge-refs";
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';

function useHover() {
    const [hovered, set] = useState(false);
    const binder = {
        onMouseEnter: () => set(true),
        onMouseLeave: () => set(false)
    };
    return [binder, hovered];
}

// TODO: shorten/tweak react-spring animation to avoid bouncy unwanted effect
// TODO: bug: & -> &amp due to react-linkify

const  TodoItem = React.forwardRef(({todo, deleteItem, toggleItemSelection, index, setEditable, editItem, setOut, setDeleting}, _) => {
    const [hoverProps, isHovered] = useHover()
    const [hoverToolboxProps, isToolboxHovered] = useHover()
    const [extended, setExtended] = useState(false)
    const [gettingIn, setGettingIn] = useState(false)

    const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })

    const listItemAnimatedStyle = useSpring({
        opacity: todo.deleting ? 0 : 1,
        marginTop: todo.deleting ? -(height + 2*8) : 0,
        ...(gettingIn ? {height: todo.out ? 0 : height} : {}),
        onRest: props => {
            if (props.opacity <= 0) {
                deleteItem()
            }
        }
    })

    const stickerAnimatedStyle = useSpring({
        marginTop: todo.out ? -80 : 0
    })

    useEffect(() => {
        if (todo.out) {
            setOut(false)
            setGettingIn(true)
        }
    }, [])

    const handleTouchStart = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleItemSelection();
    }

    return (
        <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={todo.deleting || (mobile() ? false : (!isHovered || isToolboxHovered))}>
            {(provided, snapshot) => (
                <animated.div className={'list__item'}
                              ref={mergeRefs([provided.innerRef])}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                  ...provided.draggableProps.style,
                                  ...provided.dragHandleProps ? provided.dragHandleProps.style : {},
                                  ...listItemAnimatedStyle,
                                  pointerEvents: todo.deleting ? 'none' : ''
                              }}
                >
                    <animated.div className={'list__item__sticker'}
                         ref={ref}
                         {...hoverProps}
                         style={{
                             ...stickerAnimatedStyle
                         }}
                    >
                        <CSSTransition in={mobile() ? todo.selected : (isHovered || snapshot.isDragging || (isToolboxHovered && extended))}
                                       timeout={{enter: 0, exit: mobile() ? 0 : 500}}
                                       classNames={'list__item__toolbox'}
                                       onEntered={() => setExtended(true)}
                                       onExited={() => setExtended(false)}>
                            {() => (
                                <>
                                    <Toolbox className={'list__item__toolbox'} innerProps={hoverToolboxProps} onDelete={() => setDeleting(true)} onEdit={() => setEditable(true)}/>
                                    <li onTouchStart={handleTouchStart}
                                        className={classNames('list__item__content', mobile() && todo.selected && 'list__item__content-selected')}
                                    >
                                        <Editable value={todo.text} editable={todo.editable} onSave={editItem} setEditable={setEditable} className={'list__item__content__editable'}/>
                                    </li>
                                </>
                            )}
                        </CSSTransition>
                    </animated.div>
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
