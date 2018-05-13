import React from 'react';
import SimpleCounterWithContext from "./simpleCounterWithContext";
import Elm from 'react-elm-components'
import {Counter} from './elm/Counter'

import {ElmContext} from "./context"

class AppWithContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incDecHandler: function () {
            },
            count: 10,
        };
    };

    elmPorts = (ports) => {
        // will trigger the subscription in CounterComponent.elm
        this.setState(() => {
            return {incDecHandler: (by) => ports.incDecClicked.send(by)}
        });

        // will receive the count from CounterComponent.elm
        ports.countOut.subscribe((n) => {
            this.setState(() => {
                return {
                    count: n
                }
            });
        });
    };

    render() {
        return (
            <div>
                With Shared Context :
                <Elm src={Counter} ports={this.elmPorts}/>

                <ElmContext.Provider value={this.state}>
                    <SimpleCounterWithContext/>
                    <SimpleCounterWithContext/>
                </ElmContext.Provider>
            </div>
        )
    }
}

export default AppWithContext;
