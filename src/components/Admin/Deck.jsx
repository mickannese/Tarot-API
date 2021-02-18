import React from 'react';

const Deck = (props) => {
  return (
    <div>
      <div>
        {props.deck}
      </div>
      <button onClick={() => { props.delete(props.deck) }}>delete</button>
      <button onClick={() => { props.edit('edit', props.deck) }}>edit</button>
    </div>
  )
}

export default Deck;