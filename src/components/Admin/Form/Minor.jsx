import React from 'react';
import CardDiv from './CardDiv.jsx';
import axios from 'axios';

class Minor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submit: props.submit,
      suit: props.suit,
      current: props.current,
      one: '',
      oneurl: '',
      two: '',
      twourl: '',
      three: '',
      threeurl: '',
      four: '',
      foururl: '',
      five: '',
      fiveurl: '',
      six: '',
      sixurl: '',
      seven: '',
      sevenurl: '',
      eight: '',
      eighturl: '',
      nine: '',
      nineurl: '',
      ten: '',
      tenurl: '',
      page: '',
      pageurl: '',
      knight: '',
      knighturl: '',
      queen: '',
      queenurl: '',
      king: '',
      kingurl: '',
      list: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King']
    }
  }

  componentDidMount() {
    axios.get(`/deck/${this.state.current}`).then(res => {
      let target = res.data.minor[this.state.suit.toLowerCase()]
      if (target.length > 0) {
        target.forEach(card => {
          let place = card.placement.toLowerCase();
          let urlstring = place + 'url'
          this.setState({
            [place]: card.meaning,
            [urlstring]: card.image
          })
        })
      }
    })
  }

  uploadFile(e) {
    e.preventDefault();
    let name = e.target.name
    let urlstring = name + 'url'
    console.log(this.state[name]);
    const formData = new FormData();
    formData.append("image", this.state[name]);
    axios.post('/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(result => {
      this.setState({
        [urlstring]: result.data
      })
    })
  }

  createList() {
    return this.state.list.map(card => {
      let place = card.toLowerCase();
      let urlstring = place + 'url'
      return { placement: card, meaning: this.state[place], image: this.state[urlstring] }
    })
  }

  handleType(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    e.preventDefault();
  }

  // submitForm(data, urlstring) {
  //   const self = this;
  //   return function patch(e) {
  //     e.preventDefault();
  //     console.log(data);
  //     console.log(e);
  // axios.patch(`/deck/${self.state.current}`, data)
  //   .then((res) => {
  //     console.log(res.data)
  //     self.setState({
  //       [urlstring]: res.data
  //     })
  //   })
  //

  render() {
    return (
      <div>
        {/* <form onSubmit={this.state.submit({
          name: this.state.current,
          minor: {
            [this.state.suit.toLowerCase()]: this.createList()
          }
        }
        )}> */}
        {this.state.list.map(card => {
          let place = card.toLowerCase();
          return <CardDiv card={card} suit={this.state.suit} val={this.state[place]} type={this.handleType.bind(this)} upload={this.uploadFile.bind(this)} submit={this.submitForm.bind(this)} />
        })}
        {/* </form> */}
      </div>
    )
  }
}

export default Minor;