import React from 'react';
import Elm from 'react-elm-components'
import {Counter} from './elm/Counter'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    }

    incDecHandler = function () {
    };

    elmPorts = (ports) => {
        // will trigger the subscription in Counter.elm
        this.incDecHandler = (by) => ports.incDecClicked.send(by);

        // will receive the count from Counter.elm
        ports.countOut.subscribe((n) => {
            this.setState(() => {
                return {count: n}
            });
        });
    };

    render() {
        return <div>
            <Elm src={Counter} ports={this.elmPorts}/>

            <button onClick={() => this.incDecHandler(1)}>+</button>
            <button onClick={() => this.incDecHandler(-1)}>-</button>
            <div>
                {this.state.count}
            </div>
        </div>
    }
}

export default App;
