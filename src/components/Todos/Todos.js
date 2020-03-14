import React, {useEffect, useState} from 'react'
import './Todos.css'
import {randomHash} from "../../utils/random";
import {useLocalStorage} from "use-hooks";
import TodoItem from "./TodoItem";
import QueueAnim from 'rc-queue-anim';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Todos() {
  const [items, setItems] = useLocalStorage('todos', [])
  const [itemsBeingDeleted, setItemsBeingDeleted] = useState([])

  const [value, setValue] = useState('')

  // removing eventual corrupted state elements
  useEffect(() => setItems(items.filter(item => item.deleting !== true)), [])

  const handleKeyDown = ({key}) => {
    if (key === 'Enter' && value.length > 0) {
      // add new item
      setItems([{id: randomHash(), text: value, done: false, deleting: false}, ...items])
      // empty text input
      setValue('')
    }
  }

  const deleteItem = ({id}) => {
    setItems([
      ...items.filter(item => item.id !== id)
    ])
  }

  const beginDelete = ({id}) => {
    setItemsBeingDeleted([
      ...itemsBeingDeleted,
      {id}
    ])
  }

  const selectItem = ({id}) => {
    setItems(items.map(item => item.id === id
      ? {...item, selected:!item.selected}
      : {...item, selected: false})
    )
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setItems(reorder(
      items,
      result.source.index,
      result.destination.index
    ));
  }

  return (
    <div className={'container'}>
      <input type="text" id="input" className="input-text" placeholder="Write an idea ..."
             value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'droppable'}>
          {(provided) => (
            <div  {...provided.droppableProps} ref={provided.innerRef} className={'list-droppable'}>
              <QueueAnim component={'ul'} className={'list'} type={['top', 'top']}
                         appear={false}>
                {items.map((todo, index) => (
                  <TodoItem todo={todo}
                            key={todo.id}
                            itemsBeingDeleted={itemsBeingDeleted}
                            index={index}
                            deleteItem={() => deleteItem({id: todo.id})}
                            onClick={() => selectItem(todo)}/>
                ))}
                {provided.placeholder}
              </QueueAnim>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Todos
