import React, {useEffect, useState} from 'react'
import './Todos.css'
import {randomHash} from "../../utils/random";
import {useLocalStorage} from "use-hooks";
import TodoItem from "./TodoItem";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Todos() {
  const [items, setItems] = useLocalStorage('todos', [])

  const [value, setValue] = useState('')

  const handleKeyDown = ({key}) => {
    if (key === 'Enter' && value.length > 0) {
      // add new item
      setItems([{id: randomHash(), text: value, editable: false}, ...items])
      // empty text input
      setValue('')
    }
  }

  const setEditable = ({id, editable}) => {
    setItems(items.map(item => item.id === id
      ? {...item, editable}
      : {...item, editable: false})
    )
  }

  const editItem = ({id, text}) => {
    setItems(items.map(item => item.id === id
        ? {...item, text, editable: false}
        : {...item, editable: false})
    )
  }

  const deleteItem = ({id}) => {
    setItems([
      ...items.filter(item => item.id !== id)
    ])
  }

  const toggleItemSelection = ({id}) => {
    setItems(items.map(item => item.id === id
      ? {...item, selected:!item.selected}
      : {...item, selected: false})
    )
  }

  const deselectAllItems = () => {
    setItems(items.map(item => ({...item, selected:false})))
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
    <div className={'container'} onTouchStart={deselectAllItems}>
      <input type="text" id="input" className="input-text" placeholder="Write an idea ..."
             value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={'droppable'}>
          {(provided) => (
            <div  {...provided.droppableProps} ref={provided.innerRef} className={'list-droppable'}>
                {items.map((todo, index) => (
                  <TodoItem todo={todo}
                            key={todo.id}
                            index={index}
                            deleteItem={() => deleteItem({id: todo.id})}
                            setEditable={(editable) => setEditable({id: todo.id, editable})}
                            editItem={(text) => editItem({id: todo.id, text})}
                            toggleItemSelection={() => toggleItemSelection(todo)}/>
                ))}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Todos
