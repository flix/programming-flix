import React from 'react'
import ReactGA from 'react-ga';

import Code from '../components/Code';
import Editor from '../util/Editor';
import {Table} from "reactstrap";
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import SubSubSection from "../components/SubSubSection";

class Basics extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Basics";
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <Section name="Basics">

                <p>
                    We now cover some of the basics of the Flix programming language.
                </p>

                <SubSection name="Primitive Types">
                    <p>
                        Flix supports the usual primitive types known from most languages:
                    </p>

                    <Table>
                        <thead>
                        <tr>
                            <th>Type</th>
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

                    <p>
                        <Code>Float</Code> is shorthand for <Code>Float64</Code> and <Code>Int</Code> is
                        shorthand for <Code>Int32</Code>. <Code>Float64</Code> and <Code>Int32</Code> values can be
                        written without suffix, i.e. <Code>123.0f64</Code> can simply be written
                        as <Code>123.0</Code> and <Code>123i32</Code> can be written as <Code>123</Code>.
                    </p>

                    <SubSubSection name="Unit">

                        <p>
                            The Unit type has exactly one value written as <Code>()</Code>.
                        </p>

                        <p>
                            Here is a function that returns <Code>()</Code>:
                        </p>

                        <Editor flix={this.props.flix}>
                            def main(): Unit = ()
                        </Editor>

                        <p>
                            And here is an example where Unit is used in a data type:
                        </p>

                        <Editor flix={this.props.flix}>
                            def main(): Result[Str, Unit] = Ok("Hello World!")
                        </Editor>

                    </SubSubSection>

                    <SubSubSection name="Booleans">

                        <p>
                            The <Code>Bool</Code> type has the two values <Code>true</Code> and <Code>false</Code>:
                        </p>


                        <Editor flix={this.props.flix}>
                            {`def t(): Bool = true
def f(): Bool = false`}
                        </Editor>

                        <p>
                            The booleans supports the usual operators:
                        </p>

                        <Editor flix={this.props.flix}>
                            {`def not(x: Bool): Bool = !x
def and(x: Bool, y: Bool): Bool = x && y
def or(x: Bool, y: Bool): Bool = x || y`}
                        </Editor>

                    </SubSubSection>

                    <SubSubSection name="Characters">

                        <p>
                            The <Code>Char</Code> type has values such as <Code>'a'</Code>, <Code>'b'</Code>, and so on:
                        </p>

                        <Editor flix={this.props.flix}>
                            {`def a(): Char = 'a'
def b(): Char = 'b'`}
                        </Editor>

                        <p>
                            We currently don't support any operations on characters, other than those supported
                            indirectly by the Java Standard Library, but that may change in the future.
                        </p>

                        <DesignNote>
                            A <Code>Str</Code> is <i>not</i> a list of characters.
                        </DesignNote>

                    </SubSubSection>

                    <SubSubSection name="The Floats: Float32 and Float64">

                        <p>
                            The floating point numbers come in 32-bit and 64-bit variants.
                        </p>

                        <p>
                            Here is an example:
                        </p>

                        <Editor flix={this.props.flix}>
                            {`def main(): Float32 = 123.0f32
def g(): Float64 = 123.0f64
def h(): Float = 123.0`}
                        </Editor>

                        <p>
                            The floating point numbers support the usual operations:
                        </p>

                        <Editor flix={this.props.flix}>
                            {`def main(): Float64 = 0.5 + (0.3 * 0.1)`}
                        </Editor>

                        <DesignNote>
                            We have plans to support a BigDecimal or similar data type in the future.
                        </DesignNote>

                    </SubSubSection>

                    <SubSubSection name="The Integers: Int8, Int16, Int32, and Int64">
                        TBD
                    </SubSubSection>

                    <SubSubSection name="Strings">
                        TBD
                    </SubSubSection>

                    <SubSubSection name="Big Integers">
                        TBD
                    </SubSubSection>

                </SubSection>
            </Section>
        )
    }

}

export default Basics
