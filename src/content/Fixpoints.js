import React from 'react'

import Code from '../components/Code';
import Editor from '../util/Editor';
import {Table} from "reactstrap";
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import SubSubSection from "../components/SubSubSection";
import Warning from "../components/Warning";

class Introduction extends React.Component {

    render() {
        return (
            <Section name="Fixpoints">

                <p>
                    A unique feature of Flix is its built-in support for fixpoint computations on <i>constraint on
                    relations</i> and <i>constraint on lattices</i>.
                </p>

                <SubSection name="Using Flix as a Datalog Solver">

                    <p>
                        We can use Flix as an ordinary Datalog solver by writing relational constraints at the
                        top-level:
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

                    <DesignNote>
                        In Flix, all predicate symbols must be declared before they can be used. We are currently
                        debating whether or not this is a good thing.
                        </DesignNote>

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

export default Introduction
