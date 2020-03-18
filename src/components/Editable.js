import React, {useState, useRef, useEffect} from 'react';
import ContentEditable from "react-contenteditable";
import Linkify from 'react-linkify';

function Editable({onSave, value, className, transformValue, editable, setEditable}) {
  const text = useRef(value);
  const input = useRef(null);

  useEffect(() => {
    editable && input.current && input.current.focus()
    if (editable) {
      // document.execCommand('selectAll', false, null)
    }
  }, [editable])

  const handleChange = (event) => {
    text.current = event.target.value;
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      input.current && input.current.blur();
    }
  }

  const handleBlur = (event) => {
    setEditable(false)
    onSave(text.current)
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

  if (!editable) {
    return (
      <Linkify
          componentDecorator={(href, text, key) => (
            <a href={href} key={key} target="_blank" rel="noopener noreferrer">{text}</a>
          )}>
        {text.current}
      </Linkify>
    )
  }

  return (
    <ContentEditable tagName={'span'} onKeyDown={handleKeyDown} onChange={handleChange} innerRef={input}
                     html={text.current || ''} disabled={!editable}
                     className={className}
                     onBlur={handleBlur} onPaste={handlePaste} onClick={handleClick}/>
  )
}

Editable.defaultProps = {
  onSave: () => {
  },
  transformValue: e => e,
  edit: false
}

export default Editable;
