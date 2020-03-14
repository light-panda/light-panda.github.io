import React, {useState, useRef, useEffect} from 'react';
import ContentEditable from "react-contenteditable";

function InlineEdit({onSave, value, className, transformValue}) {
  const [text, setText] = useState(value);
  const [editable, setEditable] = useState(false);
  const input = useRef(null);
  useEffect(() => (
    text
      ? onSave(text)
      : setEditable(true)
  ), [text]);
  useEffect(() => {
    editable && input.current && input.current.focus()
    if (editable) {
      document.execCommand('selectAll', false, null)
    }
  }, [editable])

  const handleChange = (event) => {
    setText(transformValue(event.target.value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditable(false);
      input.current && input.current.blur();
    }
  }

  const handleDoubleClick = () => {
    setEditable(true);
  }

  const handleBlur = (event) => {
    setEditable(false);
    event.target.scrollLeft = 0;
  }

  const handlePaste = (event) => {
    event.preventDefault();

    // get text representation of clipboard
    const text = (event.originalEvent || event).clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand("insertHTML", false, text);
  }

  const handleClick = (event) => {
    event.stopPropagation()
  }

  return (
    <ContentEditable tagName={'span'} onKeyDown={handleKeyDown} onChange={handleChange} innerRef={input}
                     html={text || ''} onDoubleClick={handleDoubleClick} disabled={!editable}
                     className={className}
                     onBlur={handleBlur} onPaste={handlePaste} onClick={handleClick}/>
  )
}

InlineEdit.defaultProps = {
  onSave: () => {
  },
  transformValue: e => e
}

export default InlineEdit;
