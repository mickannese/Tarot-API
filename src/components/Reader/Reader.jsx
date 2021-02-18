import React from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import styled from 'styled-components';

const ReaderDiv = styled.div`
margin-top: 20px;
background: rgba(50, 47, 77, 1);
border-radius: 10px;
max-height: 800px;
max-width: 600px;
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
`

const ButtonBox = styled.div`
margin-top: 20px;
background: rgba(50, 47, 77, 1);
border-radius: 10px;
display:flex;
flex-direction: row;
max-width: 600px;
min-height: 40px
`
const InnerBox = styled.div`
display: flex;
min-height: 40px;
align-items: center;
text-align: center;
justify-content: center;
width: 100%;
height: 100%
`


class Reader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      current: '',
      load: {},
      cards: [],
      currCard: {}
    }
  }

  componentDidMount() {
    axios.get('/deck')
      .then(res => {
        let list = res.data.map(item => item.name)
        this.setState({
          decks: list,
          current: list[0]
        })
      })
      .then(() => {
        axios.get(`/deck/${this.state.current}`)
          .then(res => {
            let cards = res.data.minor.cups;
            let newc = cards.concat(res.data.minor.swords, res.data.minor.pentacles, res.data.minor.wands, res.data.major);
            this.setState({
              load: res.data,
              cards: newc
            })
          })
      })
  }

  //fisher yates
  getRandom() {
    let list = this.state.cards;
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = list[i]
      list[i] = list[j]
      list[j] = temp
    }
    let rand = Math.floor(Math.random() * (list.length - 1))
    this.setState({
      currCard: list[rand]
    })
  }

  reading() {
    const { currCard } = this.state;
    if (currCard !== {}) {
      return <Card card={this.state.currCard} />
    }
  }


  render() {
    return (
      <div>
        <ReaderDiv>
          {this.reading()}
        </ReaderDiv>
        <ButtonBox>
          <InnerBox>
            <select className='deck-slider'>
              {this.state.decks.map(deck => {
                return <option value={deck}>{deck}</option>
              })}
            </select>
          </InnerBox>
          <InnerBox>
            <button onClick={this.getRandom.bind(this)} >reading</button>
          </InnerBox>
        </ButtonBox>
      </div>
    )
  }
}

export default Reader;