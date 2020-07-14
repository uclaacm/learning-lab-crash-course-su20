import React from 'react';

class FeaturedFanCard extends React.Component {

    state = {
        sales: 0
    }
    componentDidMount = () =>{
        this.cleanup = setInterval(() => {
            let random = Math.floor(Math.random() * 100);
            this.setState((prevState) => {
                return {sales: prevState.sales + random};
            })
          }, 250);
    }

    componentWillUnmount = () => {
        this.cleanup();
    }
    render = () => {
        return (
            <div className="featured-fan-card">
                <div>
                    <img className="img-responsive" src={process.env.PUBLIC_URL + 'fan.png'} alt="a fan" />
                </div>
                <div>
                    <h2>Our best fan yet!</h2>
                    <p>
                        {this.state.sales} and counting sold!
                    </p>
                </div>
            </div>
        )
    }
}

export default FeaturedFanCard