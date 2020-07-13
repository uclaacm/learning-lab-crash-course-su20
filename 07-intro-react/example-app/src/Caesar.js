import React from 'react';

class Caesar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      plaintext: 'Input something!',
      shAmt: 0,
      output: 'Input something!',
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.computeShifted = this.computeShifted.bind(this);
  }
  
  onTextChange(e) {
    this.setState({
      plaintext: String(e.target.value),
    });
    this.computeShifted();
  }
  
  onRangeChange(e) {
    this.setState({
      shAmt: Number(e.target.value),
    });
    this.computeShifted();
  }

  computeShifted() {
    let newString = "";
    for (let c of this.state.plaintext) {
      newString += String.fromCharCode(c.charCodeAt(0) + this.state.shAmt);
    }

    this.setState({
      output: newString,
    });
  }
  
  render() {
    return (
      <div className='caesar-shift'>
        <input type='text' value={this.state.plaintext} onChange={this.onTextChange} />
        <input type='range' min='0' max='25' value={this.state.shAmt} onChange={this.onRangeChange} />
        <p>Shift amount is {this.state.shAmt}</p>
        <h3>{this.state.output}</h3>
      </div>
    )
  }
}  
  
export default Caesar;