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

                <p>We can access the field of a record using the dot: </p>

                <Editor flix={this.props.flix}>{`def main(): Int = 
    let p = { x = 1, y = 2 };
    p.x + p.y`}</Editor>



            </Section>
        )
    }

}

export default Records
