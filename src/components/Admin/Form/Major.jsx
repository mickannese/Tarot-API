import React from 'react';

class Suits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
      wands: '',
      wandsurl: '',
      swords: '',
      swordsurl: '',
      pentacles: '',
      pentaclessurl: '',
      cups: '',
      cupsurl: ''
    }
  }

  componentDidMount() {
    axios.get(`/deck/${this.state.current}`).then(res => {
      let deck = res.data
      if (deck.suits.length !== 0) {
        this.setState({
          wands: res.data.suits
        })

      }
    })
  }

  render() {
    return (
      <div>
        <form>

        </form>
      </div>
    )
  }
}

export default Suits;