import React from 'react';

function Greeter(props) {
    return (
        <div className="my-component">
            Hi there { props.name }!
        </div>
    )
}
  
export default Greeter;