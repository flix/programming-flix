import React from 'react'
import _ from 'lodash/fp'

import Code from './Code';
import Editor from './Editor';

import IntroductionSec from './IntroductionSec';


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
                <div className="title">Programming Flix</div>
                <WelcomeSec runProgram={this.runProgram}/>
                <IntroductionSec runProgram={this.runProgram}/>
                <Section2 runProgram={this.runProgram}/>
                <Section3 runProgram={this.runProgram}/>
            </div>
        );
    }
}

class WelcomeSec extends React.Component {
    render() {
        return (
            <div className="section">
                Welcome to this interactive tutorial for the <a href="http://flix.github.io/">Flix</a> programming
                language!
            </div>)
    }
}



class Section2 extends React.Component {

    render() {
        return (
            <div className="section">
                <h3>II. Programming with Lists</h3>

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

                <p>We can append to lists using the <Code>List.append</Code> function as follows:</p>

                <Editor runProgram={this.props.runProgram} lines={4}>
                    {`def f(): List[Int] =
    let xs = (1 :: 2 :: 3 :: Nil);
    let ys = (4 :: 5 :: 6 :: Nil);
        List.append(xs, ys)`}
                </Editor>

                <p>Or, alternatively, we can use the built-in append operator <Code>:::</Code> as follows:</p>

                <Editor runProgram={this.props.runProgram} lines={4}>
                    {`def f(): List[Int] =
    let xs = (1 :: 2 :: 3 :: Nil);
    let ys = (4 :: 5 :: 6 :: Nil);
        xs ::: ys`}
                </Editor>

            </div>
        )
    }

}

class Section3 extends React.Component {

    render() {
        return (
            <div className="section">
                <h3>III. Data Types</h3>

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

            </div>
        )
    }

}

export default App