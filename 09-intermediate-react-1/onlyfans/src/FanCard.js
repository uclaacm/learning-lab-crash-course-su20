import React from 'react';

class FanCard extends React.Component {
    state = {
        fans: 0
    }
    becomeFanhandler = () => {
        this.setState((prevState) => {
            return {fans: prevState.fans + 1};
        });
    }
    render = () => {
        return (
            <div className="fan-card">
                <h2>{this.props.name}</h2>
                <p>
                    favourite fan: <a className="link" href={this.props.link}>{this.props.fan}</a>
                </p>
                <p>
                    current fans: {this.state.fans}
                </p>
                <button className="button" onClick={this.becomeFanhandler}>become a fan</button>
            </div>
        );
    }
}

export default FanCard;
