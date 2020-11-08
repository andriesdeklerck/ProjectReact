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
        <div class="form-group">
          <h3 class="text-success">First Name:</h3>
          <input name="firstName" class="form-control" type="text" value={this.state.firstName} onChange={this.handleChange} />
        </div>
        <div class="form-group">
          <h3 class="text-success">Last Name:</h3>
          <input name="lastName" class="form-control" type="text" value={this.state.lastName} onChange={this.handleChange} />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    );
  }
}

class SelectedButton extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()} class="btn btn-lg m-1" style={{ background: PickedColor(this.props.value) }}></button>
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

var tbl = document.createElement('table');

function ready() {
  tbl.setAttribute('class', 'table table-striped')
  tbl.setAttribute('id', 'tabel');

  var orderArrayHeader = ["Color 1", "Color 2", "Color 3", "Color 4", "Right color", "Right place"];
  var thead = document.createElement('thead');
  tbl.appendChild(thead);
  for (var i = 0; i < orderArrayHeader.length; i++) {
    thead.appendChild(document.createElement("th")).
      appendChild(document.createTextNode(orderArrayHeader[i]));
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorsToChoose: Array(8).fill(null),
      makedGuess: Array(4),
      settedGame: Array(),
      a: 0,
      tries: 0,
      rightColor: 0,
      rightPlace: 0
    };
  }

  handleClick(i) {
    const selectedColor = this.state.colorsToChoose.slice();
    selectedColor[i] = PickedColor(i);
    this.setState({ colorsToChoose: selectedColor });
    if (this.state.a < 4) {
      this.state.makedGuess[this.state.a] = PickedColor(i);
    }
    this.state.a++;
  }

  setGame() {
    //document.getElementById("myList").innerHTML = "";
    if (this.state.makedGuess[3] == null) {
      alert("Select 4 colors");
    } else {
      this.state.settedGame = Array();
      this.setState({
        settedGame: this.state.settedGame.concat(this.state.makedGuess)
      });
      this.state.makedGuess = Array(4);
      this.state.a = 0;
      this.state.value = !this.state.value;
      ready();
    }
  }

  makeGuess() {
    if (this.state.makedGuess[3] == null) {
      alert("Select 4 colors");
    } else {

      this.state.makedGuess.forEach(element => {
        if (this.state.settedGame.includes(element)) {
          this.state.rightColor += 1;
        }
      })

      for (let i = 0; i < 4; i++) {
        if (this.state.makedGuess[i] == this.state.settedGame[i]) {
          this.state.rightPlace += 1;
        }
      }

      for (var i = 0; i < 1; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < 4; j++) {
          var td0 = tr.insertCell();
          td0.appendChild(document.createTextNode(this.state.makedGuess[j]));
        }
        var td0 = tr.insertCell();
        td0.appendChild(document.createTextNode(this.state.rightColor - this.state.rightPlace));
        td0 = tr.insertCell();
        td0.appendChild(document.createTextNode(this.state.rightPlace));
      }
      document.getElementById("myList").appendChild(tbl);

      this.setState({
        tries: this.state.tries += 1,
        rightColor: 0,
        rightPlace: 0,
        a: 0
      });

      if (JSON.stringify(this.state.makedGuess) === JSON.stringify(this.state.settedGame)) {
        this.state.value = !this.state.value;
        alert('You have won: ' + this.state.makedGuess + " " + this.state.settedGame + " with " + this.state.tries + " tries.");
        this.state.tries = 0;
        this.state.rightPlace = 0;
        document.getElementById("tabel").innerHTML = "";
      }
      else {
        this.state.makedGuess = Array(4);
      }
    }
  }

  renderButton(i) {
    return (
      <SelectedButton
        value={i}
        onClick={() => this.handleClick(i)}
        test={this.state.test}
      />
    );
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {this.renderButton(0)}
            {this.renderButton(1)}
            {this.renderButton(2)}
            {this.renderButton(3)}
            {this.renderButton(4)}
            {this.renderButton(5)}
            {this.renderButton(6)}
            {this.renderButton(7)}
          </div>
          <button class="btn btn-success m-1 w-25" onClick={() => this.setGame()} disabled={this.state.value}>Set Color</button>
          <button class="btn btn-success m-1 w-25" onClick={() => this.makeGuess()}>Guess</button>
        </div>
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