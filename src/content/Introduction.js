import React from 'react'

import Code from '../components/Code';
import Editor from '../util/Editor';
import {Table} from "reactstrap";

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

                <h2>Primitive Types</h2>

                Flix comes with a range of built-in primitive types mostly adapted from those already available on the
                Java Virtual Machine. The table below lists the currently implemented primitive types and their syntax:

                <Table>
                    <thead>
                    <tr>
                        <th>Primitive Type</th>
                        <th>Syntax</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Unit</td>
                        <td><Code>()</Code></td>
                        <td>The unit value.</td>
                    </tr>
                    <tr>
                        <td>Bool</td>
                        <td><Code>true</Code>, <Code>false</Code></td>
                        <td>A boolean value.</td>
                    </tr>
                    <tr>
                        <td>Char</td>
                        <td><Code>'a'</Code>, <Code>'b'</Code>, <Code>'c'</Code></td>
                        <td>A character value.</td>
                    </tr>
                    <tr>
                        <td>Float32</td>
                        <td><Code>0.0f32</Code>, <Code>21.42f32</Code>, <Code>-21.42f32</Code></td>
                        <td>A 32-bit floating point integer.</td>
                    </tr>
                    <tr>
                        <td>Float64</td>
                        <td><Code>0.0f64</Code>, <Code>21.42f64</Code>, <Code>-21.42f64</Code></td>
                        <td>A 64-bit floating point integer.</td>
                    </tr>
                    <tr>
                        <td>Int8</td>
                        <td>
                            <Code>0i8</Code>, <Code>1i8</Code>, <Code>-1i8</Code>, <Code>127i8</Code>, <Code>-128i8</Code>
                        </td>
                        <td>A signed 8-bit integer.</td>
                    </tr>
                    <tr>
                        <td>Int16</td>
                        <td><Code>0i16</Code>, <Code>123i16</Code>, <Code>-123i16</Code></td>
                        <td>A signed 16-bit integer.</td>
                    </tr>
                    <tr>
                        <td>Int32</td>
                        <td><Code>0i32</Code>, <Code>123i32</Code>, <Code>-123i32</Code></td>
                        <td>A signed 32-bit integer.</td>
                    </tr>
                    <tr>
                        <td>Int64</td>
                        <td><Code>0i64</Code>, <Code>123i64</Code>, <Code>-123i64</Code></td>
                        <td>A signed 64-bit integer.</td>
                    </tr>
                    <tr>
                        <td>Str</td>
                        <td><Code>"hello"</Code>, <Code>"world"</Code></td>
                        <td>A string value.</td>
                    </tr>
                    <tr>
                        <td>BigInt</td>
                        <td><Code>0ii</Code>, <Code>123ii</Code>, <Code>-123ii</Code></td>
                        <td>An arbitrary precision integer.</td>
                    </tr>
                    </tbody>
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
