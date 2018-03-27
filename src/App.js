import React from 'react'

import Welcome from './content/Welcome';
import Introduction from './content/Introduction';
import ProgrammingWithLists from './content/ProgrammingWithLists';
import DataTypes from './content/DataTypes';
import Namespaces from './content/Namespaces';


const SocketAddress = 'ws://localhost:8085';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            websocket: new window.WebSocket(SocketAddress)
        };

        this.state.websocket.onopen = event => {
            console.log("Successfully connected to: " + SocketAddress);
        };
    }

    runProgram = (src, f) => {
        this.state.websocket.onmessage = event => {
            const data = JSON.parse(event.data);
            f(data);
        };

        this.state.websocket.send(src);
    };

    render() {
        return (
            <div id="page">
                <div className="title">Programming Flix</div>
                <Welcome runProgram={this.runProgram}/>
                <Introduction runProgram={this.runProgram}/>
                <ProgrammingWithLists runProgram={this.runProgram}/>
                <DataTypes runProgram={this.runProgram}/>
                <Namespaces runProgram={this.runProgram}/>
            </div>
        );
    }
}

export default App