import React from 'react'
import _ from 'lodash/fp'

import AceEditor from 'react-ace'
import Card, {CardContent} from 'material-ui/Card'
import Grid from 'material-ui/Grid';
import {LinearProgress} from 'material-ui/Progress'
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';


import 'brace/mode/scala'
import 'brace/theme/crimson_editor'
import 'brace/theme/xcode'

const SocketAddress = 'ws://localhost:8085';

let websocket;

class App extends React.Component {

    render() {
        return (
            <div id="page">
                <h1>Programming Flix</h1>
                <Section1/>
                <Section2/>
                <Section3/>
            </div>
        );
    }
}

class Section1 extends React.Component {

    render() {
        return (
            <Paper className="section" elevation={4}>
                <h3>Section I: Introduction to Flix</h3>

                Flix is a functional programming language inspired by Scala, OCaml, and Haskell.

                <p> Here is an example of how to add two numbers: </p>

                <Editor>
                    def f(): Int = 42 + 21
                </Editor>


            </Paper>
        )
    }

}

class Section2 extends React.Component {

    render() {
        return (
            <Paper className="section"  elevation={4}>
                <h3>Section II: Programming with Lists</h3>



                <p> And here is how to construct a list of integers: </p>

                <Editor src="def f(): List[Int] = 1 :: 2 :: Nil"/>


            </Paper>
        )
    }

}

class Section3 extends React.Component {

    render() {
        return (
            <Paper className="section" elevation={4}>
                <h3>Section III: Data Types</h3>

            </Paper>
        )
    }

}

class Editor extends React.Component {
    state = {
        input: this.props.src || this.props.children,
        output: undefined,
        waiting: false
    };

    componentDidMount() {
        websocket = new window.WebSocket(SocketAddress);
        websocket.onmessage = event => {
            this.setState({waiting: false, output: JSON.parse(event.data)})
        }
    }

    handleSendMessage = _.debounce(1000, () => {
        this.setState({waiting: true}, () => {
            websocket.send(this.state.input)
        })
    });

    resultBox = () => {
        if (!this.state.output) {
            return <div/>
        } else {
            return <div>
                {this.state.output.status}, {this.state.output.result}, {this.state.output.message}
            </div>
        }
    };

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={6}>

                                <AceEditor
                                    style={{width: '100%', height: '30px'}}
                                    mode='scala'
                                    theme='xcode'
                                    showGutter={false}
                                    showPrintMargin={false}
                                    highlightActiveLine={false}
                                    onChange={input => this.setState({input}, this.handleSendMessage)}
                                    value={this.state.input}
                                    editorProps={{$blockScrolling: true}}/>
                                {this.state.waiting && <LinearProgress/>}

                            </Grid>

                            <Grid item xs={6}>
                                <Button onClick={this.handleSendMessage}>Run</Button>
                            </Grid>
                        </Grid>
                        {this.resultBox()}
                    </CardContent>
                </Card>
            </div>
        )
    }
}


export default App