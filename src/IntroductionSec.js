import React from 'react'

import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

import Code from './Code';
import Editor from './Editor';

class IntroductionSec extends React.Component {

    render() {
        return (
            <div className="section">
                <h2>Introduction to Flix</h2>

                Flix is a functional programming language inspired by Scala, OCaml and Haskell. The syntax of Flix will
                be familiar to Scala programmers, whereas the type system is more similar to OCaml or Haskell. Flix
                also adopts features from other languages: From Rust, Eff, and Koka, Flix takes ideas for dealing with
                resources and effects. From Go, Flix takes ideas for Go routines and channels.

                <p> Here is a small taste of Flix: </p>

                <Editor runProgram={this.props.runProgram} lines={3}>
                    {`def f(): Bool = List.range(1, 100) |>
    List.map(x -> x * 2) |>
    List.exists(x -> x == 88)`}
                </Editor>

                <h3>Primitive Types</h3>

                Flix comes with a range of built-in primitive types mostly adapted from those already available on the
                Java Virtual Machine. The table below lists the currently implemented primitive types and their syntax:

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Primitive Type</TableCell>
                            <TableCell>Syntax</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Unit</TableCell>
                            <TableCell><Code>()</Code></TableCell>
                            <TableCell>The unit value.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Bool</TableCell>
                            <TableCell><Code>true</Code>, <Code>false</Code></TableCell>
                            <TableCell>A boolean value.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Char</TableCell>
                            <TableCell><Code>'a'</Code>, <Code>'b'</Code>, <Code>'c'</Code></TableCell>
                            <TableCell>A character value.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Int8</TableCell>
                            <TableCell><Code>0i8</Code>, <Code>1i8</Code>, <Code>-1i8</Code>, <Code>127i8</Code>, <Code>-128i8</Code></TableCell>
                            <TableCell>A signed 8-bit integer.</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

                NB: There is on-going debate whether to remove <Code>Int8</Code> and <Code>Int16</Code> as these are not
                currently supported by WebAssembly (which we may hope one day to have as a backend).

                <h4>The Unit Value</h4>

                The Unit value, written as <Code>()</Code>, is typically whenever no value of interested is needed.
                For example, here is a function that returns the unit value:

                <Editor runProgram={this.props.runProgram}>
                    def f(): Unit = ()
                </Editor>

                <h3>Control-Structures</h3>


            </div>
        )
    }

}

export default IntroductionSec
