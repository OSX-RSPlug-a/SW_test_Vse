import React from 'react';

import './style-init.css';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({searchText: e.target.value}, () => {
      this.props.searchText(this.state.searchText);
    });
  }
  
  render() {
    return (
      <div>
        <form className="Search" onSubmit={e => e.preventDefault()}>
          <input type="text" className="Search-box" placeholder="Filter names" onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    const {name, eye_color} = this.props;
    return (
      <div className='UserCard'>
        <div className='UserCardTop'>
            <i class="fas fa-user"></i>
        </div>
        <div className='UserCardBottom'>
          <h3>{name}</h3>
          <p>Eye color</p>
          <h5>{eye_color}</h5>
        </div>
      </div>
    );
  }
}

class NewUser extends React.Component {

  static defaultProps = {
    name: '',
    eye_color: '',
  }
  
  getNewUser = e => {
    fetch('https://swapi.co/api/people/?page=') 
      .then(response => response.json())
      .then(data => {
      let name = data.results[0].name;
      let eye_color = data.results[0].eye_color;
      this.props.gettingUser({name, eye_color});
    }) 
  }
  
  render() {
    return (
      <button 
        className='NewUserButton'
        onClick={this.getNewUser}
      >
        <h1 style={{fontSize: '5rem'}}>?</h1>
        <h2>Get random new user</h2>
        <p 
          style={{
            color: '#BDBDBD', 
            padding: '10px 0 20px',
            margin: '10px'
          }}
        >
         https://swapi.co/api/people/
        </p>
      </button>
    );
  }
}

class Personagem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          name: 'Mandalorian',
          eye_color: 'brown'
        },
        {
          name: 'Baby Yoda',
          eye_color: 'black',
        },        
        {
          name: 'Qui-Gon',
          eye_color: 'brown',
        },        
      ],
      searchText: ''
    }
  }
  
  gettingUser = res => {
    const users = [...this.state.users, res];
    this.setState({users});
  }
  
  searchText = res => {
    this.setState({searchText: res});
  }
  
  render() {
    return (
      <div className='App'>
       
        <header>

            <h1 class="title">Star Wars</h1>

            <p>Info cards about characters.</p>

        </header>

        <Search searchText={this.searchText} />
       
        <main className='listOfCards'>
          {
            this.state.users
            .filter(user => (
              user.name.toLowerCase().includes(this.state.searchText.toLowerCase())                     
            ))
            .map((user, index) => (
              <User key={index} name={user.name} eye_color={user.eye_color} />
            ))
          }
          <NewUser gettingUser={this.gettingUser} />
        </main> 
      </div>
    );
  }
}

export default Personagem;