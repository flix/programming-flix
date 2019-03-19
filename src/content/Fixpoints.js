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
        solve c <+> getAdoptions() <+> withAdoptions()
`}
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

                    <SubSection name="Polymorphic First-class Constraints">



                    </SubSection>

                    <Editor flix={this.props.flix}>
                        {`/// Declare two polymorphic predicate symbols.
/// Here an edge and a path are labelled with some type \`l\`.
rel LabelEdge[l](x: Str, l: l, y: Str)
rel LabelPath[l](x: Str, l: l, y: Str)

/// Returns a set of edge facts labelled with numbers.
/// Note that the return type is \`closed\` which means that the
/// facts can *only* be used within a constraint system that
/// has labelled edges and paths of ints.
def getEdgesWithNumbers(): Schema { LabelEdge[Int], LabelPath[Int] } = {
    LabelEdge("a", 1, "b").
    LabelEdge("b", 1, "c").
    LabelEdge("c", 2, "d").
}

/// Returns a set of edge facts labelled with colors (strings).
/// Note that the return type is \`open\` (polymorphic) which
/// means that the facts can be used within any constraint
/// as long as the edges are labelled with strings.
def getEdgesWithColor[r](): Schema { LabelEdge[Str] | r } = {
    LabelEdge("a", "red", "b").
    LabelEdge("b", "red", "c").
    LabelEdge("c", "blu", "d").
}

/// Returns a set of polymorphic rules to compute the transitive
/// closure of edges with the *same* label.
def getRules[l](): Schema { LabelEdge[l], LabelPath[l] } = {
    LabelPath(x, l, y) :- LabelEdge(x, l, y).
    LabelPath(x, l, z) :- LabelPath(x, l, y), LabelPath(y, l, z).
}

/// Computes the fixpoint of the two sets of facts with the rules.
/// Note that polymorphism allow us to use \`getRules\`
/// with both types of facts.
def main(): Unit =
    let r1 = solve getEdgesWithColor() <+> getRules();
    let r2 = solve getEdgesWithNumbers() <+> getRules();
    ()

/// However, the type system ensures that we do not mix facts of
/// different type:
def main2(): Unit =
    /// Uncomment to see that the composition does not type check:
    /// let r1 = solve getEdgesWithColor() <+> getEdgesWithNumbers();
    ()
`}
                    </Editor>


                    <Editor flix={this.props.flix}>
                        {`// Declare three predicate symbols.
rel ColorEdge(x: Int, c: Str, y: Int)
rel ColorPath(x: Int, c: Str, y: Int)
rel ColorlessPath(x: Int, y: Int)

def main(): Bool =
    // Introduce some facts for colored paths.
    let f1 = {
        ColorEdge(1, "blue", 2).
        ColorEdge(2, "blue", 3).
    };
    // Introduce some rules for computing paths.
    let r1 = {
        ColorPath(x, c, y) :- ColorEdge(x, c, y).
        ColorPath(x, c, z) :- ColorPath(x, c, y), ColorEdge(y, c, z).
    };
    // Introduce some rules for computing colorless paths.
    let r2 = {
        ColorlessPath(x, y) :- ColorPath(x, _, y).
    };
    // Compute all the color paths.
    let m1 = solve (f1 <+> r1);

    // Use that result to compute colorless paths.
    let m2 = solve (m1 <+> r2);

    // Check that there is a path from 1 to 3.
    m2 |= ColorlessPath(1, 3).
`}
                    </Editor>


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
