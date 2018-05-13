import React from 'react';
import CounterComponent from "./counterComponent";

class App extends React.Component {
    render() {
        return (
            <div>
                <CounterComponent/>
                <CounterComponent/>
            </div>
        )
    }
}

export default App;
