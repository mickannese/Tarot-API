import React from 'react';
import axios from 'axios';
import Admin from './Admin/Admin.jsx';
import Reader from './Reader/Reader.jsx';
import styled from 'styled-components';

const Sidebar = styled.div`
margin-left: 20px;
margin-top: 20px;
display: flex;
flex-direction: column;
position: fixed;
min-height: 150px;
min-width: 120px;
text-align: center;
align-items: center;
background-color: rgba(118,118,118,.5);
border-radius: 10px
`

const Logo = styled.div`
text-align: center;
text-color: #bbbbbb;
width: 100%;
font-size: 40px;
`

const WrapMain = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'client'
    }
  }

  changeView(option, current) {
    if (option === 'feed') {
      axios.get('/api/blogs')
        .then(result => {
          this.setState({
            view: 'feed',
            data: result.data
          })
        })
    }
    this.setState({
      view: option
    });
  }

  switch() {
    const { view } = this.state;

    if (view === 'client') {
      return <Reader />
    } else if (view === 'admin') {
      return <Admin data={this.state.data} />
    }
  }

  render() {
    return (
      <div>
        <Sidebar>
          <div>
            <Logo
              onClick={() => this.changeView('feed')}>
              The Chariot
            </Logo>
          </div>
          <div>
            <span className={this.state.view === 'client'
              ? 'nav-selected'
              : 'nothing'}
              onClick={() => this.changeView('client')}>
              Tarot
            </span>
          </div>
          <div>
            <span className={this.state.view === 'admin'
              ? 'nav-selected'
              : 'nav-unselected'}
              onClick={() => this.changeView('admin')}>
              Admin
            </span>
          </div>
        </Sidebar>
        <WrapMain>
          <div></div>
          <div>{this.switch()}</div>
          <div></div>
        </WrapMain>
      </div>
    )
  }
}

export default App;