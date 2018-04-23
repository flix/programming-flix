import React from 'react'

import Welcome from './content/Welcome';
import Introduction from './content/Introduction';
import ProgrammingWithLists from './content/ProgrammingWithLists';
import DataTypes from './content/DataTypes';
import Namespaces from './content/Namespaces';
import Functions from "./content/Functions";

const SocketAddress = 'ws://flix.aau.dk:8080';

class App extends React.Component {

    constructor() {
        super();

        console.log("Connecting to: " + SocketAddress);

        this.state = {
            websocket: new window.WebSocket(SocketAddress)
        };

        this.state.websocket.onopen = event => {
            console.log("Connected to: " + SocketAddress);
            this.connected = true;
        };
    }

    runProgram = (src, f) => {
        this.state.websocket.onmessage = event => {
            console.log("Received reply from: " + SocketAddress);
            const data = JSON.parse(event.data);

            console.log(data);
            f(data);
        };

        if (!this.connected) {
            console.log("Not connected yet");
            return;
        }
        this.state.websocket.send(src);
    };

    render() {
        return (
            <div id="page">
                <div className="title">Programming Flix</div>
                <Welcome runProgram={this.runProgram}/>
                <Introduction runProgram={this.runProgram}/>
                <Functions runProgram={this.runProgram}/>
                <ProgrammingWithLists runProgram={this.runProgram}/>
                <DataTypes runProgram={this.runProgram}/>
                <Namespaces runProgram={this.runProgram}/>
            </div>
        );
    }
}

export default App