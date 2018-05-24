import React, {Component} from 'react';
import SimpleCounter from "./simpleCounter";

class App extends React.Component {
    render() {
        return (
            <div>
                <SimpleCounter/>
                <SimpleCounter/>
            </div>
        )
    }
}

export default App;
