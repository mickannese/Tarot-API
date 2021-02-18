import React from 'react';
import Deck from './Deck.jsx';
import EditDeck from './EditDeck.jsx';
import axios from 'axios';
import styled from 'styled-components';

const AdminDiv = styled.div`
background: rgba(50, 47, 77, 1);
margin-top: 20px;
border-radius: 10px;
min-height: 500px;
min-width: 400px;
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
overflow-y: scroll;
&::-webkit-scrollbar {
  width: 0.5em;
  height: 0.5em;
 }

 &::-webkit-scrollbar-thumb {
  background-color: rgba(118,118,118,.5);
  border-radius: 3px;

`

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      view: 'decks',
      current: '',
      addname: '',
      adddeck: ''

    }
  }

  componentDidMount() {
    axios.get('/deck')
      .then(res => {
        this.setState({
          decks: res.data.map(item => item.name)
        })
      })
  }

  switch() {
    const { view } = this.state;

    if (view === 'decks') {
      if (this.state.decks.length > 0) {
        return <div>{this.state.decks.map(deck => {
          return (<Deck deck={deck} delete={this.deleteDeck.bind(this)} edit={this.changeView.bind(this)} />)
        })}</div>
      } else {
        return <div>No Decks</div>
      }
    } else if (view === 'edit') {
      return <EditDeck current={this.state.current} />
    }
  }

  changeView(n, c = '') {
    this.setState({
      view: n,
      current: c
    });
  }

  handleType(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  submitAdd(e) {
    e.preventDefault()
    axios.post('/deck', { name: this.state.addname })
      .then((res) => {
        console.log(res)
        if (res.data === 'record exists') {
          alert('This name is already being used')
        } else {
          axios.get('/deck')
            .then(res => {
              this.setState({
                decks: res.data.map(item => item.name),
                addname: ''
              })
            })
        }
      })
  }


  deleteDeck(deck) {
    console.log(deck)
    axios.delete('/deck', { data: { name: deck } })
      .then(() => {
        axios.get('/deck')
          .then(res => {
            this.setState({
              decks: res.data.map(item => item.name),
              addname: ''
            })
          });
      })
  }

  render() {
    return (
      <div>
        <AdminDiv>
          <form onSubmit={this.submitAdd.bind(this)} className={this.state.view === 'decks' ? 'none' : 'invis'}>
            <input className="deck-name-input" name='addname' placeholder="Deck Name" value={this.state.addname} onChange={this.handleType.bind(this)} ></input>
            <input type="submit" value="Add Deck"></input>
          </form>
          {this.switch()}
        </AdminDiv>
      </div>
    )
  }
}

export default Admin;