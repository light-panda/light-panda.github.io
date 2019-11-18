import React, {useEffect, useState} from 'react'
import './Todos.css'
import {randomHash} from "../../utils/random";
import {useLocalStorage} from "use-hooks";
import TodoItem from "./TodoItem";
import QueueAnim from 'rc-queue-anim';

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

  return (
    <div className={'container'}>
      <input type="text" id="input" className="input-text" placeholder="Write an idea ..."
             value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}/>
      <QueueAnim component={'ul'} className={'list'} type={['top','top']} appear={false}>
        {items.map(todo => (
          <TodoItem key={todo.id} todo={todo} itemsBeingDeleted={itemsBeingDeleted}
                    deleteItem={() => deleteItem({id: todo.id})}/>
        ))}
      </QueueAnim>
    </div>
  )
}

export default Todos
