import React from 'react';
import styled from 'styled-components';

const CardBox = styled.div`
margin-top: 5px;
margin-bottom: 5px;
display: flex;
width: 500px;
text-align: center;
align-items: center;
justify-content: center;
height: 300px
`

const Wrapper = styled.div`
display: grid;
grid-display-rows: 1fr 8fr 1fr;
justify-content: space-around;
text-align: center;
height: 500px;
width: 500px
`

const TextBox = styled.div`
overflow-y: scroll;
&::-webkit-scrollbar {
  width: 0.5em;
  height: 0.5em;
 }

 &::-webkit-scrollbar-thumb {
  background-color: rgba(118,118,118,.5);
  border-radius: 3px;
`

const CardImg = styled.img`
position: relative;
height: 300px;
width: auto;
border-radius: 10px
`

const Card = (props) => {
  let name;
  let keys = Array.from(Object.keys(props.card));
  if (keys.indexOf('suit') > -1) {
    name = `${props.card.placement} of ${props.card.suit}`
  } else {
    name = props.card.name
  }

  console.log(name)
  return (
    <Wrapper>
      <TextBox>
        {name}
      </TextBox>
      <CardBox>
        <CardImg src={props.card.image} />
      </CardBox>
      <TextBox>
        {props.card.meaning}
      </TextBox>
    </Wrapper>
  )
}

export default Card;