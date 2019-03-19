import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import Warning from "../components/Warning";

class Fixpoints extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Fixpoints";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Fixpoints">

                <p>
                    A unique feature of Flix is its built-in support for fixpoint computations on <i>constraint on
                    relations</i> and <i>constraint on lattices</i>.
                </p>

                <SubSection name="Using Flix to Solve Constraints on Relations">

                    <p>
                        We can use Flix to solve fixpoints on relational constraints written at the top-level:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`/// Declare two predicate symbols.
rel DirectedEdge(x: Int, y: Int)
rel Connected(x: Int, y: Int)

/// Declare some edge facts.
DirectedEdge(1, 2).
DirectedEdge(2, 3).
DirectedEdge(2, 4).
DirectedEdge(3, 5).

// Declare some constraints.
Connected(x, y) :- DirectedEdge(x, y).
Connected(x, z) :- Connected(x, y), DirectedEdge(y, z).`}
                    </Editor>

                    <p>
                        Here we begin by declaring two predicate symbols:
                        <Code>DirectedEdge</Code> and <Code>Connected</Code> together with the types of their terms. The
                        program itself consists of four facts and two rules. The facts define a directed graph. The two
                        rules specify that for <Code>x</Code> and <Code>y</Code> to be connected there must be a direct
                        edge between them. Alternatively, for <Code>x</Code> and <Code>z</Code> to be
                        connected <Code>x</Code> and <Code>y</Code> must be connected and there must be a direct edge
                        from <Code>y</Code> to <Code>z</Code>.
                    </p>

                    <p>
                        Note: The expression "fixpoints on relational constraints" is equivalent to Datalog. That is,
                        when used in this way Flix works as an ordinary Datalog solver.
                    </p>

                    <DesignNote>
                        In Flix, all predicate symbols must be declared before they can be used. We are currently
                        debating whether or not this is a good thing.
                    </DesignNote>

                </SubSection>

                <SubSection name="Programming with First-class Constraints">

                    <p>
                        A unique feature of Flix is its support for <i>first-class constraints</i>.
                    </p>




                </SubSection>

                <SubSection name="Using Flix to Solve Constraints on Lattices">

                    <p>
                        Flix generalizes Datalog to support <i>constraints on lattices</i>:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`....
`}
                    </Editor>

                </SubSection>

                <DesignNote>
                    For more information about the fixpoint capabilities of Flix, we refer the reader to the <a
                    href="https://flix.dev/#/research/">research literature.</a>
                </DesignNote>

                <Warning>
                    Flix support for fixpoint computations is an ongoing research project and subject to change.
                </Warning>

            </Section>
        )
    }

}

export default Fixpoints
