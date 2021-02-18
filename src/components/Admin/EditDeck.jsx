import React from 'react';
import axios from 'axios';
import Suits from './Form/Suits.jsx';
import Minor from './Form/Minor.jsx';
import styled from 'styled-components';

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

class EditDeck extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
      deck: {},
      view: 1
    }
  }

  componentDidMount() {
    axios.get(`/deck/${this.state.current}`)
      .then(res => {
        this.setState({
          deck: res.data
        })
      })
  }

  submitForm(data) {
    const self = this;
    return function patch(e) {
      e.preventDefault();
      axios.patch(`/deck/${self.state.current}`, data)
        .then(() => {
          self.setState({
            view: self.state.view + 1
          })
        })
    }
  }

  clickForward(e) {
    e.preventDefault()
    if (this.state.view < 5) {
      this.setState({
        view: this.state.view + 1
      })
    }
  }

  clickBack(e) {
    e.preventDefault()
    if (this.state.view > 0) {
      this.setState({
        view: this.state.view - 1
      })
    }
  }

  switch() {
    const { view } = this.state;

    if (view === 1) {
      return <Suits current={this.state.current} submit={this.submitForm.bind(this)} />
    } else if (view === 2) {
      return <Minor current={this.state.current} suit={'Wands'} submit={this.submitForm.bind(this)} />
    } else if (view === 3) {
      return <Minor current={this.state.current} suit={'Cups'} submit={this.submitForm.bind(this)} />
    } else if (view === 4) {
      return <Minor current={this.state.current} suit={'Swords'} submit={this.submitForm.bind(this)} />
    } else if (view === 5) {
      return <Minor current={this.state.current} suit={'pentacles'} submit={this.submitForm.bind(this)} />
    } else if (view === 'wands') {
      return <EditDeck current={this.state.current} />
    }
  }


  render() {
    return (
      <div>
        <div>
          {this.state.current.toUpperCase()}
        </div>
        <div className="main">{this.switch()}</div>
        <ButtonBox>
          <InnerBox>
            <button onClick={this.clickBack.bind(this)} >{`<`}</button>
          </InnerBox>
          <InnerBox>
            <button onClick={this.clickForward.bind(this)}>{`>`}</button>
          </InnerBox>
        </ButtonBox>
      </div>
    )
  }
}

export default EditDeck;