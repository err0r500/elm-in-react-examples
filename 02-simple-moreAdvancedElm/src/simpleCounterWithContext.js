import React from 'react';
import {ElmContext} from "./context"

class SimpleCounterWithContext extends React.Component {
    render() {
        return (
            <ElmContext.Consumer>
                {ctx => (
                    <div>
                        <button onClick={() => ctx.incDecHandler(1)}>+</button>
                        <button onClick={() => ctx.incDecHandler(-1)}>-</button>
                        <div>{ctx.count}</div>
                    </div>
                )
                }
            </ElmContext.Consumer>
        )
    }
}

export default SimpleCounterWithContext;
