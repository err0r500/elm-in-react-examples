import React from 'react';
import SimpleCounter from "./simpleCounter";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            length: 1
        };
    };

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
