import React from 'react'

import './App.css';

import Welcome from './content/Welcome';
import Introduction from './content/Introduction';
import Lists from './content/Lists';
import DataTypes from './content/DataTypes';
import Functions from "./content/Functions";
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";
import {Route} from "react-router";
import {Link} from "react-router-dom";
import Concurrency from "./content/Concurrency";
import Fixpoints from "./content/Fixpoints";
import Records from "./content/Records";
import Namespaces from "./content/Namespaces";
import Interoperability from "./content/Interoperability";
import Effects from "./content/Effects";
import TipsAndTricks from "./content/TipsAndTricks";
import References from "./content/References";

const SocketAddress = 'wss://evaluator.flix.dev/ws';

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

        let data = {
            src: src
        };

        this.state.websocket.send(JSON.stringify(data));
    };

    getFlix() {
        return {connected: this.state.connected, run: this.runProgram.bind(this)};
    }

    render() {
        return (
            <div>
                <Navbar expand="md" color="light" className="menu mb-4">
                    <Nav className="mr-lg-auto" navbar>
                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/introduction/">Introduction</NavLink>
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
                            <NavLink tag={Link} to="/records/">Records</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/references/">References</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/namespaces/">Namespaces</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/concurrency/">Concurrency</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/effects/">Effects</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/fixpoints/">Fixpoints</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/interoperability/">Interoperability</NavLink>
                        </NavItem>

                        <NavItem className="pl-1 pr-1">
                            <NavLink tag={Link} to="/tipstricks/">Tips &amp; Tricks</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>

                <div id="page">

                    <Route path="/" exact render={() => <Welcome flix={this.getFlix()}/>}/>
                    <Route path="/introduction/" render={() => <Introduction flix={this.getFlix()}/>}/>
                    <Route path="/functions/" render={() => <Functions flix={this.getFlix()}/>}/>
                    <Route path="/datatypes/" render={() => <DataTypes flix={this.getFlix()}/>}/>
                    <Route path="/lists/" render={() => <Lists flix={this.getFlix()}/>}/>
                    <Route path="/records/" render={() => <Records flix={this.getFlix()}/>}/>
                    <Route path="/references/" render={() => <References flix={this.getFlix()}/>}/>
                    <Route path="/namespaces/" render={() => <Namespaces flix={this.getFlix()}/>}/>
                    <Route path="/concurrency/" render={() => <Concurrency flix={this.getFlix()}/>}/>
                    <Route path="/effects/" render={() => <Effects flix={this.getFlix()}/>}/>
                    <Route path="/fixpoints/" render={() => <Fixpoints flix={this.getFlix()}/>}/>
                    <Route path="/interoperability/" render={() => <Interoperability flix={this.getFlix()}/>}/>
                    <Route path="/tipstricks/" render={() => <TipsAndTricks flix={this.getFlix()}/>}/>

                </div>
            </div>
        );
    }
}

export default App