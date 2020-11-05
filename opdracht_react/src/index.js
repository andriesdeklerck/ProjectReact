import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.firstName + " " + this.state.lastName);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} />
          Last Name:
          <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class SelectedButton extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()} >{PickedColor(this.props.value)}
      </button>
    );
  }
}

function PickedColor(i) {
  var kleur = "";
  switch (i) {
    case 0:
      kleur = "blue";
      break;
    case 1:
      kleur = "green";
      break;
    case 2:
      kleur = "red";
      break;
    case 3:
      kleur = "yellow";
      break;
    case 4:
      kleur = "pink";
      break;
    case 5:
      kleur = "orange";
      break;
    case 6:
      kleur = "purple";
      break;
    case 7:
      kleur = "brown";
      break;
    default:
  }
  return kleur;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorsToChoose: Array(8).fill(null),
      makedGuess: Array(4),
      settedGame: Array(),
      a: 0
    };
  }

  handleClick(i) {
    document.getElementById("gameColor").style.background = i;
    const selectedColor = this.state.colorsToChoose.slice();
    selectedColor[i] = PickedColor(i);
    this.setState({ colorsToChoose: selectedColor });
    if (this.state.a < 4) {
      this.state.makedGuess[this.state.a] = PickedColor(i);
    }
    this.state.a++;
  }

  setGame() {
    this.setState({
      settedGame: this.state.settedGame.concat(this.state.makedGuess)
    });
  }

  renderButton(i) {
    return (
      <SelectedButton
        value={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderButton(0)}
        {this.renderButton(1)}
        {this.renderButton(2)}
        {this.renderButton(3)}
        {this.renderButton(4)}
        {this.renderButton(5)}
        {this.renderButton(6)}
        {this.renderButton(7)}
        {/* <AddToBoard value={this.props.selectedColor} /> */}
        <div id="gameColor">Selected color</div>
        <button onClick={() => this.setGame()}>Set Color</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Name />,
  document.getElementById('user')
);

ReactDOM.render(
  <Game />,
  document.getElementById('game')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();