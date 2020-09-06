import React from 'react'
import ReactGA from 'react-ga';

import Section from "../components/Section";
import Editor from "../util/Editor";
import Code from "../components/Code";

class Records extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Records";
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <Section name="Programming with Records">

                <p> Flix supports statically-typed polymorphic extensible records. </p>

                <p> A record literal is written with curly braces: </p>

                <Editor flix={this.props.flix}>{`def main(): {x : Int, y: Int} = { x = 1, y = 2 }`}</Editor>

                <p>
                    Here the <Code>main</Code> functions returns a record with two
                    fields <Code>x</Code> and <Code>y</Code> both of type <Code>Int</Code>. The type of a record is also
                    written with curly braces, but separating the field name from its type with a colon, mirroring the
                    syntax of type ascriptions.
                </p>

                <p>
                    The field order in a record does not matter, hence the above record is equivalent to the record:
                </p>

                <Editor flix={this.props.flix}>{`def main(): {x : Int, y: Int} = { y = 2, x = 1 }`}</Editor>

                <p> We can access a field of a record using the dot: </p>

                <Editor flix={this.props.flix}>{`def main(): Int = 
    let p = { x = 1, y = 2 };
    p.x + p.y`}</Editor>

                <p>
                    The Flix type system ensures that we cannot accidentally access a field that does not exist.
                </p>

                <p>
                    Records are immutable. A record, once constructed, cannot have the values of any of its fields
                    changed.
                </p>

                <p>
                    We can, however, construct a new record with updated field values:
                </p>

                <Editor flix={this.props.flix}>{`def main(): Int = 
    let p1 = { x = 1, y = 2 };
    let p2 = { x = 3 | p1 };
    p1.x + p2.x`}</Editor>

                <p>
                    The expression <Code>{`{ x = 3 | p1 }`}</Code> updates the record <Code>p1</Code> with a new value
                    of its <Code>x</Code> field. Note that updating a field requires that the field exists on the record
                    (!) A record cannot be <i>updated</i> with a new field, but it can be <i>extended</i> with a new
                    field, as we shall see later.
                </p>

                <p> If we write a function that takes a record we must specify its fields: </p>

                <Editor flix={this.props.flix}>{`def f(r: {x: Int, y: Int}): Int = r.x + r.y`}</Editor>

                <p>
                    We can call this function with the
                    records <Code>{`{ x = 1, y = 2 }`}</Code> or <Code>{`{ y = 2, x = 1 }`}</Code>, but
                    we <i>cannot</i> call it with the record <Code>{`{ x = 1, y = 2, z = 3 }`}</Code>. The signature
                    of <Code>f</Code> demands a record with <i>exactly</i> two fields: <Code>x</Code> and <Code>y</Code>.
                    If we want to less this restriction, we can write a record polymorphic function:
                </p>

                <Editor flix={this.props.flix}>{`def f[s](r: {x: Int, y: Int | s}): Int = r.x + r.y`}</Editor>

                <p>
                    This function can be called with <i>any</i> record as long as it
                    has <Code>x</Code> and <Code>y</Code> fields of <Code>Int</Code> type.
                </p>

                <p> We can add a new field to an existing record as follows: </p>

                <Editor flix={this.props.flix}>{`def main(): Int = 
    let p1 = { x = 1, y = 2 };
    let p2 = { +z = 3 | p1 };
    p1.x + p1.y + p2.z`}</Editor>

                <p>
                    Here the expression <Code>{`{ +z = 3 | p1 }`}</Code> extends the record <Code>p1</Code> with a new
                    field <Code>z</Code> such that the result has three fields: <Code>x</Code>, <Code>y</Code>,
                    and <Code>z</Code> of <Code>Int</Code> type.
                </p>

                <p>
                    Similarly, we can remove a field from a record:
                </p>

                <Editor flix={this.props.flix}>{`def main(): Int = 
    let p1 = { x = 1, y = 2 };
    let p2 = { -y | p1 };
    p2.x`}</Editor>

                <p>
                    Here the record <Code>p2</Code> is similar to <Code>p1</Code> but without its <Code>y</Code> field.
                </p>

            </Section>
        )
    }

}

export default Records
