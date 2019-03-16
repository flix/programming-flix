import React from 'react'

import Welcome from './content/Welcome';
import Introduction from './content/Introduction';
import ProgrammingWithLists from './content/ProgrammingWithLists';
import DataTypes from './content/DataTypes';
import Namespaces from './content/Namespaces';
import Functions from "./content/Functions";

const SocketAddress = 'wss://flix-evaluator.cs.au.dk/ws';

class App extends React.Component {

    constructor(props) {
        super(props);

        console.log("Connecting to: " + SocketAddress);

        this.state = {
            connected: false,
            websocket: null
        };

        try {
            this.state.websocket = new window.WebSocket(SocketAddress);

            this.state.websocket.onopen = event => {
                console.log("Connected to: " + SocketAddress);
                this.setState({connected: true})
            }
        } catch (ex) {
            console.log("Unable to connect: " + ex)
        }
    }

    runProgram = (src, f) => {
        if (!this.state.connected) {
            console.log("Not connected yet");
            return;
        }

        this.state.websocket.onmessage = event => {
            console.log("Received reply from: " + SocketAddress);
            const data = JSON.parse(event.data);

            console.log(data);
            f(data);
        };

        this.state.websocket.send(src);
    };

    render() {
        return (
            <div id="page">
                <Welcome flix={{connected: this.state.connected, run: this.runProgram.bind(this)}}/>
                <Introduction flix={{connected: this.state.connected, run: this.runProgram.bind(this)}}/>
                <Functions flix={{connected: this.state.connected, run: this.runProgram.bind(this)}}/>
                <ProgrammingWithLists flix={{connected: this.state.connected, run: this.runProgram.bind(this)}}/>
                <DataTypes flix={{connected: this.state.connected, run: this.runProgram.bind(this)}}/>
                <Namespaces flix={{connected: this.state.connected, run: this.runProgram.bind(this)}}/>
            </div>
        );
    }
}

export default App