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
                        The above program demonstrates that Flix can be used as an ordinary Datalog solver.
                    </p>

                    <DesignNote>
                        In Flix, all predicate symbols must be declared before they can be used.
                    </DesignNote>

                </SubSection>

                <SubSection name="Stratified Negation">

                    <p>
                        Flix supports <i>stratified negation</i> which allow restricted use of negation in rule
                        bodies. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`rel Movie(title: Str)
rel StarringIn(title: Str, name: Str)
rel DirectedBy(title: Str, name: Str)
rel DirectorNotInMovie(title: Str)

Movie("The Hateful Eight").
Movie("Interstellar").

StarringIn("The Hateful Eight", "Samuel L. Jackson").
StarringIn("The Hateful Eight", "Kurt Russel").
StarringIn("The Hateful Eight", "Quentin Tarantino").
StarringIn("Interstellar", "Matthew McConaughey").
StarringIn("Interstellar", "Anne Hathaway").

DirectedBy("The Hateful Eight", "Quentin Tarantino").
DirectedBy("Interstellar", "Christopher Nolan").

DirectorNotInMovie(title) :-
    Movie(title), DirectedBy(title, name), not StarringIn(title, name).`}
                    </Editor>

                    <p>
                        The program defines four
                        predicates: <Code>Movie</Code>, <Code>StarringIn</Code>, <Code>DirectedBy</Code>,
                        and <Code>DirectorNotInMovie</Code>. It then provides several facts for the movies "The
                        Hateful Eight" and "Interstellar". The constraint, at the bottom, uses negation to select those
                        movies where the director has not appeared as a cast member.
                    </p>

                    <Warning>
                        Flix enforces that programs are stratified, i.e. a program must not have recursive dependencies
                        that form on which there is use of negation. If there is, the Flix compiler rejects the program.
                    </Warning>

                    <p>
                        The example below is <i>not</i> stratified and hence is rejected:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`rel A(x: Int)
rel B(x: Int)
rel C(x: Int)

A(x) :- B(x).
B(x) :- not A(x), C(x).`}
                    </Editor>

                </SubSection>

                <SubSection name="Programming with First-class Constraints">

                    <p>
                        A unique feature of Flix is its support for <i>first-class constraints</i>. A first-class
                        constraint is a value that can be constructed, passed around, composed with other constraints,
                        and ultimately solved. The solution to a constraint system is another constraint system which
                        can be further composed.
                    </p>

                    <p>
                        For a concrete example, consider the program below:
                    </p>


                    <Editor flix={this.props.flix}>
                        {`rel ParentOf(x: Str, y: Str)
rel AncestorOf(x: Str, y: Str)
rel AdoptedBy(x: Str, y: Str)

def getParents[r](): Schema { ParentOf | r } = {
    ParentOf("Pompey", "Strabo").
    ParentOf("Gnaeus", "Pompey").
    ParentOf("Pompeia", "Pompey").
    ParentOf("Sextus", "Pompey").
}

def getAdoptions[r](): Schema { AdoptedBy | r } = {
    AdoptedBy("Augustus", "Caesar").
    AdoptedBy("Tiberius", "Augustus").
}

def withAncestors[r](): Schema { ParentOf, AncestorOf | r } = {
    AncestorOf(x, y) :- ParentOf(x, y).
    AncestorOf(x, z) :- AncestorOf(x, y), AncestorOf(y, z).
}

def withAdoptions[r](): Schema { AdoptedBy, AncestorOf | r } = {
    AncestorOf(x, y) :- AdoptedBy(y, x).
}

def main(): Schema { ParentOf, AncestorOf, AdoptedBy } =
    let b = false;
    let c = getParents() <+> withAncestors();
    if (b)
        solve c
    else
        solve c <+> getAdoptions() <+> withAdoptions()`}
                    </Editor>

                    <p>
                        The program defines three predicate symbols: <Code>ParentOf</Code>, <Code>AncestorOf</Code>,
                        and <Code>AdoptedBy</Code>. The <Code>getParents</Code> function returns a collection of facts
                        that represent biological parents, whereas the <Code>getAdoptions</Code> function returns
                        a collection of facts that represent adoptions. The <Code>withAncestors</Code> function
                        returns two constraints that populate the <Code>AncestorOf</Code> relation using the
                        <Code>ParentOf</Code> relation. The <Code>withAdoptions</Code> function returns a constraint
                        that populates the <Code>ParentOf</Code> relation using the <Code>AdoptedBy</Code> relation.
                    </p>

                    <p>
                        In the <Code>main</Code> function the boolean <Code>b</Code> controls whether we solve a program
                        that only considers biological parents or if we include adoptions. This implemented by computing
                        the composition of the result of <Code>getParents</Code> with <Code>withAncestors</Code>, and
                        then branching on the boolean to decide whether to include the results
                        of <Code>getAdoptions</Code> and <Code>withAdoptions</Code>.
                    </p>

                    <p>
                        As can be seen, the types the functions are row-polymorphic. For example, the signature
                        of <Code>getParents</Code> is <Code>def getParents[r]():
                        Schema {"{ ParentOf | r }"}</Code> where <Code>r</Code> is row polymorphic type variable that
                        represent the rest of the predicates that the result of the function can be composed with.
                    </p>

                    <DesignNote>
                        The row polymorphic types are best understood as an over-approximation of the predicates that
                        may occur in a constraint system. For example, if a constraint system has
                        type <Code>{"Schema { P }"}</Code> that does necessarily mean that it will refer to the
                        predicate symbol <Code>P</Code>, but it does guarantee that it will refer to no other predicate
                        symbols.
                    </DesignNote>

                </SubSection>

                <SubSection name="Polymorphic First-class Constraints">

                    <p>
                        Another unique feature of Flix is its support for
                        first-class <i>polymorphic</i> constraints. That is, constraints where one or more
                        constraints are polymorphic in their term types. For example:
                    </p>


                    <Editor flix={this.props.flix}>
                        {`rel LabelEdge[l](x: Str, l: l, y: Str)
rel LabelPath[l](x: Str, l: l, y: Str)

def getEdgesWithNumbers[r](): Schema { LabelEdge[Int] | r } = {
    LabelEdge("a", 1, "b").
    LabelEdge("b", 1, "c").
    LabelEdge("c", 2, "d").
}

def getEdgesWithColor[r](): Schema { LabelEdge[Str] | r } = {
    LabelEdge("a", "red", "b").
    LabelEdge("b", "red", "c").
    LabelEdge("c", "blu", "d").
}

def getRules[l](): Schema { LabelEdge[l], LabelPath[l] } = {
    LabelPath(x, l, y) :- LabelEdge(x, l, y).
    LabelPath(x, l, z) :- LabelPath(x, l, y), LabelPath(y, l, z).
}

def main1(): Schema { LabelEdge[Int], LabelPath[Int] }  =
    solve getEdgesWithNumbers() <+> getRules()

def main2(): Schema { LabelEdge[Str], LabelPath[Str] }  =
    solve getEdgesWithColor() <+> getRules()`}
                    </Editor>

                    <p>
                        Here we declare two predicate symbols: <Code>LabelEdge</Code> and <Code>LabelPath</Code>.
                        Each predicate has a type parameter named <Code>l</Code> and is polymorphic in the "label"
                        type associated with the edge/path. Note how <Code>getEdgesWithNumbers</Code> returns a
                        collection of edge facts where the labels are integers,
                        whereas <Code>getEdgesWithColor</Code> returns a collection of facts where the labels are
                        strings. The <Code>getRules</Code> function is polymorphic and returns two rules that
                        compute the transitive closure of edges that have the same label. This function is used by
                        both <Code>main1</Code> and <Code>main2</Code> to compute the transitive closure of graphs
                        with different types of labels.
                    </p>

                </SubSection>

                <SubSection name="Pipelines of Fixpoint Computations">

                    <p>
                        The solution (i.e. fixpoint) of a constraint system is another constraint system. We can use
                        this to construct <i>pipelines</i> of fixpoint computations, i.e. to feed the result of one
                        fixpoint computation into another fixpoint computation. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`rel ColorEdge(x: Int, c: Str, y: Int)
rel ColorPath(x: Int, c: Str, y: Int)
rel ColorlessPath(x: Int, y: Int)

def main(): Bool =
    let f1 = {
        ColorEdge(1, "blue", 2).
        ColorEdge(2, "blue", 3).
    };
    let r1 = {
        ColorPath(x, c, y) :- ColorEdge(x, c, y).
        ColorPath(x, c, z) :- ColorPath(x, c, y), ColorEdge(y, c, z).
    };
    let r2 = {
        ColorlessPath(x, y) :- ColorPath(x, _, y).
    };
    let m1 = solve (f1 <+> r1);
    let m2 = solve (m1 <+> r2);
    m2 |= ColorlessPath(1, 3).`}
                    </Editor>

                    <p>
                        The program declares three predicates: <Code>ColorEdge</Code>, <Code>ColorPath</Code>,
                        and <Code>ColorlessPath</Code>. Our goal is to compute the transitive closure of the
                        colored edges and then afterwards construct a graph where the edges have no color. The program
                        defines two edge facts <Code>f1</Code>, then two rules to compute the transitive
                        closure <Code>r1</Code>, and finally a rule <Code>r2</Code> to copy all color path facts to
                        colorless path facts.
                    </p>

                    <p>
                        The program first computes the fixpoint of <Code>f1</Code> and <Code>r1</Code> which yields
                        the transitive closure of the colored graph. Next, the program takes that result, composes it
                        with the rule <Code>r2</Code>, and computes its fixpoint. The result is another constraint
                        system with (i) the original colored edge facts, (ii) the colored path facts, and (iii) the
                        colorless path facts. Finally, we ask if this constraint system contains the fact <Code>ColorlessPath(1,
                        3)</Code>.
                    </p>

                </SubSection>

                <SubSection name="Using Flix to Solve Constraints on Lattices">

                    <p>
                        TBD.
                    </p>

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
