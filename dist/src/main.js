var React = require('react')
var ReactDOM = require('react-dom');
var RecentMass = require('./RecentMass');
var http = require("superagent")

class RecentMassView extends React.Component {
  render() {
    return <h1>Latest Mass {this.props.mass}</h1>
  }
}

class InputMass extends React.Component {

  handleClick(event) {
    event.preventDefault() 

    var massInput = document.getElementById("massInput")
    var mass = massInput.value
    massInput.value = ""

    if (mass > 0) {

      RecentMass.recordPounds(mass).then(function(record) {
        renderHome(mass)
      })
      .catch(function(error) {
        console.error("error")
      })
    }
  }

  render() {
    return <div>
      <form onSubmit={this.handleClick}>
        <input id="massInput" name="mass" type="number" placeholder="record lbs" step="0.01"/>
        <button onClick={this.handleClick}>Submit</button>
      </form>
    </div>
  }
}

function renderHome(mass) {

  ReactDOM.render(

    <div>
      <RecentMassView
        mass={mass}
      />
      <hr/>
      <InputMass />
    </div>,

    document.getElementById("content")
  );

}

RecentMass.fetch().then(renderHome)

