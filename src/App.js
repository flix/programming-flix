import React from 'react'

import Welcome from './content/Welcome';
import Introduction from './content/Introduction';
import Lists from './content/Lists';
import DataTypes from './content/DataTypes';
import Namespaces from './content/Namespaces';
import Functions from "./content/Functions";
import Basics from "./content/Basics";
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";
import {Route} from "react-router";
import {Link} from "react-router-dom";

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

    getFlix() {
        return {connected: this.state.connected, run: this.runProgram.bind(this)};
    }

    render() {
        return (
            <div id="page">

                <Navbar expand="md" className="menu mb-4">
                    <Nav className="mr-lg-auto" navbar>
                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/introduction/">Introduction</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link}
                                     to="/basics/">Basics</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/functions/">Functions</NavLink></NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/datatypes/">Data Types</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/lists/">Lists</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/namespaces/">Namespaces</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>

                <Route path="/" exact render={() => <Welcome flix={this.getFlix()}/>}/>
                <Route path="/introduction/" render={() => <Introduction flix={this.getFlix()}/>}/>
                <Route path="/basics/" render={() => <Basics flix={this.getFlix()}/>}/>
                <Route path="/functions/" render={() => <Functions flix={this.getFlix()}/>}/>
                <Route path="/datatypes/" render={() => <DataTypes flix={this.getFlix()}/>}/>
                <Route path="/lists/" render={() => <Lists flix={this.getFlix()}/>}/>
                <Route path="/namespaces/" render={() => <Namespaces flix={this.getFlix()}/>}/>

            </div>
        );
    }
}

export default App