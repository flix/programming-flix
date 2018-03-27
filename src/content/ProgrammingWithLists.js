import React from 'react'

import Code from '../components/Code';
import Editor from '../components/Editor';

class ProgrammingWithLists extends React.Component {

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

export default ProgrammingWithLists
