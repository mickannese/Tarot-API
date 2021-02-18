import React from 'react';
import axios from 'axios';

class Suits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submit: props.submit,
      current: props.current,
      wands: '',
      swords: '',
      pentacles: '',
      cups: '',
    }
  }

  handleType(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    axios.get(`/deck/${this.state.current}`).then(res => {
      let deck = res.data
      this.setState({
        wands: deck.suits.wands.meaning,
        swords: deck.suits.swords.meaning,
        pentacles: deck.suits.pentacles.meaning,
        cups: deck.suits.cups.meaning
      })
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.state.submit({
          name: this.state.current,
          suits: {
            wands: {
              name: 'Wands',
              meaning: this.state.wands
            },
            cups: {
              name: 'Cups',
              meaning: this.state.cups
            },
            swords: {
              name: 'Swords',
              meaning: this.state.swords
            },
            pentacles: {
              name: 'Pentacles',
              meaning: this.state.pentacles
            },
          }
        }
        )}>
          <div>Wands</div>
          <input className="suit-form-input" name='wands' placeholder="meaning for Wands" value={this.state.wands} onChange={this.handleType.bind(this)} ></input>
          <div>Cups</div>
          <input className="suit-form-input" name='cups' placeholder="meaning for Cups" value={this.state.cups} onChange={this.handleType.bind(this)} ></input>
          <div>Swords</div>
          <input className="suit-form-input" name='swords' placeholder="meaning for Swords" value={this.state.swords} onChange={this.handleType.bind(this)} ></input>
          <div>Pentacles</div>
          <input className="suit-form-input" name='pentacles' placeholder="meaning for Pentacles" value={this.state.pentacles} onChange={this.handleType.bind(this)} ></input>
          <input type="submit" value="Update Suits"></input>
        </form>
      </div>
    )
  }
}

export default Suits;