import React from 'react';
import {Counter} from './elm/Counter'

class SimpleCounter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 12,
        };
    }

    // the subscription handler has to be extracted in order to identify it during the unsubscribe
    updateStateCount = (n) => {
        this.setState(() => {
            return {count: n}
        });
    };

    componentWillMount() {
        this.ports = Counter.worker().ports;

        // will trigger the subscription in CounterComponent.elm
        this.incDecHandler = (by) => this.ports.incDecClicked.send(by);

        // will receive the count from CounterComponent.elm
        this.ports.countOut.subscribe(this.updateStateCount)
    }

    componentWillUnmount() {
        // release the subscription to avoid memory leak (seems enough)
        this.ports.countOut.unsubscribe(this.updateStateCount);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.incDecHandler(1)}>+</button>
                <button onClick={() => this.incDecHandler(-1)}>-</button>
                <div>{this.state.count}</div>
            </div>
        )
    }
}

export default SimpleCounter;
