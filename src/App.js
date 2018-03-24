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

class App extends React.Component {

    state = {
        websocket: new window.WebSocket(SocketAddress)
    };

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
                <h1>Programming Flix</h1>
                <Section1 runProgram={this.runProgram}/>
                <Section2 runProgram={this.runProgram}/>
                <Section3 runProgram={this.runProgram}/>
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

                <Editor runProgram={this.props.runProgram}>
                    def f(): Int = 42 + 21
                </Editor>

            </Paper>
        )
    }

}

class Section2 extends React.Component {

    render() {
        return (
            <Paper className="section" elevation={4}>
                <h3>Section II: Programming with Lists</h3>

                <p>
                    The bread and butter of functional programming is list processing. A list is either the empty list,
                    written as <Code>Nil</Code>, or a cons cell, written as <Code>x :: xs</Code> where <Code>x</Code> is
                    the head element and <Code>xs</Code> is the tail of the list. List is a polymorphic type so that you
                    can have a list of integers, written as <Code>List[Int]</Code>, or a list of strings written
                    as <Code>List[Str]</Code>.
                </p>

                <p> We can construct the empty list of integer as follows: </p>

                <Editor runProgram={this.props.runProgram}>
                    def f(): List[Int] = Nil
                </Editor>

                <p> And we can construct a list with the integers 1, 2, and 3 as follows: </p>

                <Editor runProgram={this.props.runProgram}>
                    def f(): List[Int] = 1 :: 2 :: 3 :: Nil
                </Editor>

                <p>
                    We can also construct a list of strings with the
                    strings <Code>"Hello"</Code> and <Code>"World"</Code>:
                </p>

                <Editor runProgram={this.props.runProgram}>
                    def f(): List[Str] = "Hello" :: "World" :: Nil
                </Editor>

                <p>Given a list there are many useful operations we can perform on it.</p>

                <p>For example, we can compute the length of the list as follows:</p>

                <Editor runProgram={this.props.runProgram}>
                    def f(): Int = List.length(1 :: 2 :: 3 :: Nil)
                </Editor>

                <p>We can also reverse the order of elements in the list:</p>

                <Editor runProgram={this.props.runProgram}>
                    def f(): List[Int] = List.reverse(1 :: 2 :: 3 :: Nil)
                </Editor>

            </Paper>
        )
    }

}

class Section3 extends React.Component {

    render() {
        return (
            <Paper className="section" elevation={4}>
                <h3>Section III: Data Types</h3>

                <h4>Enumerated Types</h4>

                <Editor runProgram={this.props.runProgram} lines={5}>
                    {`enum Color {
    case Red,
    case Blue
}

def f(): Color = Red`}
                </Editor>

                <h4>Recursive Types</h4>

                <h4>Polymorphic Types</h4>

            </Paper>
        )
    }

}


class Code extends React.Component {
    render() {
        return (
            <span className="code">{this.props.children}</span>
        )
    }
}

class Editor extends React.Component {
    state = {
        input: this.props.children,
        output: undefined,
        waiting: false
    };

    run = () => {
        this.setState({waiting: true}, () => {
            const src = this.state.input;
            this.props.runProgram(src, data =>
                this.setState({waiting: false, output: data})
            );
        })
    };

    debounced = _.debounce(1000, this.run);

    onChange = input => {
        this.setState({input}, this.debounced);
    };

    onClick = () => {
        this.run();
    };

    resultBox = () => {
        if (!this.state.output) {
            return <div/>
        } else {
            return <div>
                {this.state.output.status}, {this.state.output.result}, {this.state.output.message}
            </div>
        }
    };

    getHeight = () => (this.props.lines || 1) * 23;

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={10}>

                                <AceEditor
                                    style={{width: '100%', height: this.getHeight() + 'px'}}
                                    mode='scala'
                                    theme='xcode'
                                    showGutter={false}
                                    showPrintMargin={false}
                                    highlightActiveLine={false}
                                    onChange={this.onChange}
                                    value={this.state.input}
                                    editorProps={{$blockScrolling: true}}/>
                                {this.state.waiting && <LinearProgress/>}

                            </Grid>

                            <Grid item xs={2}>
                                <Button onClick={this.onClick}>Run</Button>
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