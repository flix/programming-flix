import React from 'react'
import ReactGA from 'react-ga';

import Section from "../components/Section";
import Editor from "../util/Editor";
import Code from "../components/Code";

class Records extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Records";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Records">

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



            </Section>
        )
    }

}

export default Records
