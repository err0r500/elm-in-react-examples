import React from 'react';
import Elm from 'react-elm-components'
import {Counter} from './elm/Counter'

class SimpleCounter extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 12,
        };
    }

    elmPorts = (ports) => {
        // will trigger the subscription in CounterComponent.elm
        this.incDecHandler = (by) => ports.incDecClicked.send(by);

        // will receive the count from CounterComponent.elm
        ports.countOut.subscribe((n) => {
            this.setState(() => {
                return {count: n}
            });
        });

    };

    render() {
        return (
            <div>
                <Elm src={Counter} ports={this.elmPorts}/>

                <button onClick={() => this.incDecHandler(1)}>+</button>
                <button onClick={() => this.incDecHandler(-1)}>-</button>
                <div>{this.state.count}</div>
            </div>
        )
    }
}

export default SimpleCounter;
