import {CSSTransition} from "react-transition-group";
import React, {useState} from "react";
import Toolbox from "../Toolbox/Toolbox";
import classNames from 'classnames';
import mobile from "is-mobile";
import {Draggable} from "react-beautiful-dnd";
import Editable from "../Editable";
import {useSpring, animated} from 'react-spring';
import useMeasure from "../../utils/useMeasure";

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


const  TodoItem = React.forwardRef(({todo, deleteItem, toggleItemSelection, index, setEditable, editItem}) => {
    const [hoverProps, isHovered] = useHover()
    const [deleting, setDeleting] = useState(false)
    const [hoverToolboxProps, isToolboxHovered] = useHover()
    const [extended, setExtended] = useState(false)

    const [{ref}, { height }] = useMeasure()

    // list__item has hardcoded padding: 8px so we put + 2*8 here to take padding into account
    // the height value comes from the ResizeObserver API so we can't get the padding value, nor box-sizing: border-box;
    // nor replace the padding by a margin because it would break drag&drop behavior
    const deletingStyle = useSpring({opacity: deleting ? 0 : 1, marginTop: deleting ? -(height + 2*8) : 0})

    const handleTouchStart = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleItemSelection();
    }

    return (
        <Draggable key={todo.id} draggableId={todo.id} index={index} isDragDisabled={mobile() ? false : (!isHovered || isToolboxHovered)}>
            {(provided) => (
                <animated.div className={'list__item'}
                              ref={el => {ref.current = el; provided.innerRef(el)}}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{...provided.draggableProps.style, ...provided.dragHandleProps ? provided.dragHandleProps.style : {}, ...deletingStyle}}
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
