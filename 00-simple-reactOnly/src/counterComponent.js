import React from 'react';

class CounterComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    };

    incDecHandler = (by) => {
        this.setState((prevState) => ({
            count: prevState.count + by
        }));
    };

    render() {
        return (
            <div>
                <button onClick={() => this.incDecHandler(1)}>+</button>
                <button onClick={() => this.incDecHandler(-1)}>-</button>
                <div>
                    {this.state.count}
                </div>
            </div>
        )
    }
}

export default CounterComponent;
