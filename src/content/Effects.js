import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Editor from "../util/Editor";
import Code from "../components/Code";

class Effects extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Effects";
        ReactGA.pageview(window.location.pathname);
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

                <p>
                    The problem with the above program is that the <Code>map</Code> expression in the expression
                    statement has no side-effect and its result is silent discarded: it is redundant code. Probably
                    the programmer wanted the result to be used somehow.
                </p>

                <p>
                    NB: The above warning may not appear in the online evaluator (because redundancy checks are
                    disabled for convenience). If so, go to the Flix playground at <a
                    href="https://play.flix.dev/">play.flix.dev</a> and de-select
                    (allow) "unused code". You should now be able to see the same error message.
                </p>

            </Section>
        )
    }

}

export default Effects
