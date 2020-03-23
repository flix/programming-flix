import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Editor from "../util/Editor";

class Effects extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Effects";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Polymorphic Effects">

                <p>
                    Flix has a unique effect system that precisely tracks pure, impure, and effect polymorphic
                    functions.
                </p>

                <p>
                    The effect system enables the Flix compiler to warn about the following program:
                </p>

                <Editor flix={this.props.flix}>
                    {`def main(): Int =
    List.map(x -> x + 1, 1 :: 2 :: Nil);
    123`}
                </Editor>

                <p>
                    which when compiled (with redundancy checks enabled) gives the following error message:
                </p>

                <Editor flix={this.props.flix}>
                    {`-- Redundancy Error -------------------------------------------------- ???

>> Useless expression: It has no side-effect(s) and its result is discarded.

2 |     List.map(x -> x + 1, 1 :: 2 :: Nil);
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        useless expression.


Possible fixes:

  (1)  Use the result computed by the expression.
  (2)  Remove the expression statement.
  (3)  Introduce a let-binding with a wildcard name.`}
                </Editor>


            </Section>
        )
    }

}

export default Effects
