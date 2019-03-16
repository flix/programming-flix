import React from 'react'

import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

import Code from '../components/Code';
import Editor from '../util/Editor';

class Introduction extends React.Component {

    render() {
        return (
            <div>
                <h1>Introduction to Flix</h1>

                <p>
                    Flix is a functional programming language inspired by Scala, OCaml and Haskell. The syntax of
                    Flix
                    will
                    be familiar to Scala programmers, whereas the type system is more similar to OCaml or Haskell.
                    Flix
                    also adopts features from other languages: From Rust, Eff, and Koka, Flix takes ideas for
                    dealing
                    with
                    resources and effects. From Go, Flix takes ideas for Go routines and channels.
                </p>

                <p>
                    Flix includes an experimental Datalog engine extended with user-defined lattices and monotone
                    functions.
                    This Datalog extension is the subject of on-going research. This tutorial only concerns the
                    functional
                    language of Flix. For the logic language, the reader is referred to recent research papers.
                </p>

                <p> Here is an example Flix program to show the flavour: </p>

                <Editor flix={this.props.flix}>
                    {`def main(): Bool = List.range(1, 100) |>
    List.map(x -> x * 2) |>
    List.exists(x -> x == 88)`}
                </Editor>


                <h2>Flix in Five Minutes</h2>

                <p>
                    Flix is a statically-typed functional programming language. The type system is based on
                    Hindley-Milner
                    which supports full type inference. Flix, as a design choices, forces the programmer to specify
                    types of
                    top-level definitions. Flix is a strict call-by-value language. Flix currently targets the JVM,
                    but
                    support for other targets are planned. Scope in Flix is lexical.
                </p>


                <p>Flix comes with a small standard library. The standard library is inspired by Scala and Haskell
                    and
                    mostly concerns collections.</p>

                <p>Flix is currently under heavy development, but early adopters are encouraged to try out the
                    language
                    and contribute their experiences.</p>

                <p>Flix is open source and freely available under the Apache 2.0 license</p>

                <h3>Language Design</h3>

                <p>
                    Flix, by design, omits certain features considered to be undesirable by the language designers.
                    Specifically, Flix does not, and likely will not support:
                </p>


                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={"25%"}>Feature</TableCell>
                            <TableCell>Rationale for Omission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><b>Null Values</b></TableCell>
                            <TableCell>Widely considered a design mistake by other contemporary languages. Easily
                                leads
                                to <Code>NullPointerExceptions</Code> all over the code. Use <Code>Option</Code>
                                instead.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Sub-Typing</b></TableCell>
                            <TableCell>Interferes with Hindley-Milner type inference.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>Implicit Coercions</b></TableCell>
                            <TableCell>Automatic coercions between primitive types easily leads to subtle
                                bugs.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <h2>Primitive Types</h2>

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
                            <TableCell>Float32</TableCell>
                            <TableCell><Code>0.0f32</Code>, <Code>21.42f32</Code>, <Code>-21.42f32</Code></TableCell>
                            <TableCell>A 32-bit floating point integer.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Float64</TableCell>
                            <TableCell><Code>0.0f64</Code>, <Code>21.42f64</Code>, <Code>-21.42f64</Code></TableCell>
                            <TableCell>A 64-bit floating point integer.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Int8</TableCell>
                            <TableCell><Code>0i8</Code>, <Code>1i8</Code>, <Code>-1i8</Code>, <Code>127i8</Code>, <Code>-128i8</Code></TableCell>
                            <TableCell>A signed 8-bit integer.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Int16</TableCell>
                            <TableCell><Code>0i16</Code>, <Code>123i16</Code>, <Code>-123i16</Code></TableCell>
                            <TableCell>A signed 16-bit integer.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Int32</TableCell>
                            <TableCell><Code>0i32</Code>, <Code>123i32</Code>, <Code>-123i32</Code></TableCell>
                            <TableCell>A signed 32-bit integer.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Int64</TableCell>
                            <TableCell><Code>0i64</Code>, <Code>123i64</Code>, <Code>-123i64</Code></TableCell>
                            <TableCell>A signed 64-bit integer.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Str</TableCell>
                            <TableCell><Code>"hello"</Code>, <Code>"world"</Code></TableCell>
                            <TableCell>A string value.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>BigInt</TableCell>
                            <TableCell><Code>0ii</Code>, <Code>123ii</Code>, <Code>-123ii</Code></TableCell>
                            <TableCell>An arbitrary precision integer.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <p><i>Note:</i> <Code>Float</Code> is shorthand for <Code>Float64</Code> and <Code>Int</Code> is
                    shorthand for
                    <Code>Int32</Code>. <Code>Float64</Code> and <Code>Int32</Code> values can be written without
                    suffix, i.e. <Code>123.0f64</Code> can simply be written as <Code>123.0</Code> and
                    <Code>123i32</Code> can be written as <Code>123</Code>.
                </p>

                <p><i>Design Note:</i> There is on-going debate whether to remove <Code>Int8</Code> and
                    <Code>Int16</Code> as these
                    are not currently supported by WebAssembly (which we may hope one day to have as a backend).</p>

                <h3>Unit</h3>

                <p>
                    The Unit value, written as <Code>()</Code>, is typically whenever no value of interested is needed.
                    For example, here is a function that returns the unit value:
                </p>

                <Editor flix={this.props.flix}>
                    def main(): Unit = ()
                </Editor>

                <h3>Booleans</h3>

                <p>
                    The <Code>Bool</Code> type has the two values <Code>true</Code> and <Code>false</Code>:
                </p>

                <Editor flix={this.props.flix}>
                    {`def t(): Bool = true
def main(): Bool = false`}
                </Editor>

                <p>
                    Booleans supports the usual operators:
                </p>

                <Editor flix={this.props.flix}>
                    {`def not(x: Bool): Bool = !x
def and(x: Bool, y: Bool): Bool = x && y
def or(x: Bool, y: Bool): Bool = x || y`}
                </Editor>

                <h3>Characters</h3>

                <p>
                    The <Code>Char</Code> type has values such as <Code>'a'</Code>, <Code>'b'</Code>, and so on:
                </p>

                <Editor flix={this.props.flix}>
                    {`def a(): Char = 'a'
def b(): Char = 'b'`}
                </Editor>

                <h3>The Floats: Float32 and Float64</h3>

                The floating point numbers come in 32-bit and 64-bit variants.

                <Editor flix={this.props.flix}>
                    {`def main(): Float32 = 123.0f32
def g(): Float64 = 123.0f64
def h(): Float = 123.0`}
                </Editor>

                <h3>The Integers: Int8, Int16, Int32, and Int64</h3>

            </div>
        )
    }

}

export default Introduction
