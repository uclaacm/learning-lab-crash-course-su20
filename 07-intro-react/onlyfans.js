import React from 'react';
import logo from './logo.svg';
import './App.css';


// function FanClubMaker(props){
//   return (
//     <div>
//       {props.name} fan club!
//     </div>
//   )
// }

class FanClubMaker extends React.Component {
  state = {
    onlyFans: 0
  }
  clickHandler = () => {
    this.setState({onlyFans: this.state.onlyFans + 1})
  }
  render = () => {
    return (
        <div>
          <hr />
            {this.props.name} fan club!
            <p>
              only fans: {this.state.onlyFans}
            </p>
            <button onClick={this.clickHandler}>im an only fan</button>
        </div>
    )
  }
}

const listOfPeople = ["leo", "arjun", "lisha", "nisha", "rithika"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          listOfPeople.map((x) => {
            return <FanClubMaker name={x} key={x} />
          })
        }
      </header>
    </div>
  );
}

export default App;
