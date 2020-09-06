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
        ReactGA.pageview(window.location.pathname);
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

def getParents[r](): #{ ParentOf | r } = #{
    ParentOf("Pompey", "Strabo").
    ParentOf("Gnaeus", "Pompey").
    ParentOf("Pompeia", "Pompey").
    ParentOf("Sextus", "Pompey").
}

def getAdoptions[r](): #{ AdoptedBy | r } = #{
    AdoptedBy("Augustus", "Caesar").
    AdoptedBy("Tiberius", "Augustus").
}

def withAncestors[r](): #{ ParentOf, AncestorOf | r } = #{
    AncestorOf(x, y) :- ParentOf(x, y).
    AncestorOf(x, z) :- AncestorOf(x, y), AncestorOf(y, z).
}

def withAdoptions[r](): #{ AdoptedBy, AncestorOf | r } = #{
    AncestorOf(x, y) :- AdoptedBy(y, x).
}

def main(): #{ ParentOf, AncestorOf, AdoptedBy } =
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
                        #{"{ ParentOf | r }"}</Code> where <Code>r</Code> is row polymorphic type variable that
                        represent the rest of the predicates that the result of the function can be composed with.
                    </p>

                    <DesignNote>
                        The row polymorphic types are best understood as an over-approximation of the predicates that
                        may occur in a constraint system. For example, if a constraint system has
                        type <Code>{"#{ P }"}</Code> that does necessarily mean that it will refer to the
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

def getEdgesWithNumbers[r](): #{ LabelEdge[Int] | r } = #{
    LabelEdge("a", 1, "b").
    LabelEdge("b", 1, "c").
    LabelEdge("c", 2, "d").
}

def getEdgesWithColor[r](): #{ LabelEdge[Str] | r } = #{
    LabelEdge("a", "red", "b").
    LabelEdge("b", "red", "c").
    LabelEdge("c", "blu", "d").
}

def getRules[l](): #{ LabelEdge[l], LabelPath[l] } = #{
    LabelPath(x, l, y) :- LabelEdge(x, l, y).
    LabelPath(x, l, z) :- LabelPath(x, l, y), LabelPath(y, l, z).
}

def main1(): #{ LabelEdge[Int], LabelPath[Int] }  =
    solve getEdgesWithNumbers() <+> getRules()

def main2(): #{ LabelEdge[Str], LabelPath[Str] }  =
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
    let f1 = #{
        ColorEdge(1, "blue", 2).
        ColorEdge(2, "blue", 3).
    };
    let r1 = #{
        ColorPath(x, c, y) :- ColorEdge(x, c, y).
        ColorPath(x, c, z) :- ColorPath(x, c, y), ColorEdge(y, c, z).
    };
    let r2 = #{
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
                        Flix supports not only <i>constraints on relations</i>, but also <i>constraints on lattices</i>.
                        To create such constraints, we must first define the lattice operations (the partial order,
                        the least upper bound, and so on) as functions, associate them with a type, and then declare the
                        predicate symbols that have lattice semantics. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`enum Sign {
              case Top,

    case Neg, case Zer, case Pos,

              case Bot
}

def equ(e1: Sign, e2: Sign): Bool = e1 == e2

def leq(e1: Sign, e2: Sign): Bool = match (e1, e2) with {
    case (Bot, _)   => true
    case (Neg, Neg) => true
    case (Zer, Zer) => true
    case (Pos, Pos) => true
    case (_, Top)   => true
    case _          => false
}

def lub(e1: Sign, e2: Sign): Sign = match (e1, e2) with {
    case (Bot, x)   => x
    case (x, Bot)   => x
    case (Neg, Neg) => Neg
    case (Zer, Zer) => Zer
    case (Pos, Pos) => Pos
    case _          => Top
}

def glb(e1: Sign, e2: Sign): Sign = match (e1, e2) with {
    case (Top, x)   => x
    case (x, Top)   => x
    case (Neg, Neg) => Neg
    case (Zer, Zer) => Zer
    case (Pos, Pos) => Pos
    case _          => Bot
}

let Sign<> = (Bot, Top, equ, leq, lub, glb)

lat A(x: Str, s: Sign)
lat B(x: Str, s: Sign)
lat R(x: Str, s: Sign)

A("a"; Pos).
B("a"; Top).
A("b"; Neg).

R("c"; s) :- A("a"; s).
R("c"; s) :- A("b"; s).
R("d"; s) :- A(x; s), B(x; s).
`}
                    </Editor>

                    <p>
                        The program above defines an enum for the elements of the sign lattice and then defines each of
                        the lattice operations as functions. Here <Code>equ</Code> is equality, <Code>leq</Code> is the
                        partial order, <Code>lub</Code> is the least upper bound, and <Code>glb</Code> is the greatest
                        lower bound.
                    </p>

                    <p>Next the program associates the <Code>Sign</Code> type with the lattice components.</p>

                    <p>
                        Finally, the program defines three predicate symbols <Code>A</Code>, <Code>B</Code>,
                        and <Code>C</Code> with lattice interpretations. The program then defines three facts and three
                        rules. The two first rules require that in the fact <Code>R("c",
                        s)</Code> the <Code>s</Code> element must be at least the least upper bound
                        of <Code>s1</Code> and <Code>s2</Code> for any facts <Code>A("a", s1)</Code> and <Code>A("b",
                        s2)</Code>. Thus we compute the fact <Code>R("c", Top)</Code>. The last rule, on the other hand
                        requires that in the fact <Code>R("d", s)</Code> s must be the greatest lower bound
                        of <Code>s1</Code> and <Code>s2</Code> for any facts <Code>A(x, s1)</Code> and <Code>B(x,
                        s2)</Code>. Thus we compute the fact <Code>R("d", Pos)</Code>.
                    </p>

                    <Warning>
                        The syntax <Code>let Sign&lt;&gt; = (Bot, Top, equ, leq, lub, glb)</Code> used to associate
                        the <Code>Sign</Code> type with lattice operations will be deprecated in the future, once we add
                        type classes.
                    </Warning>

                </SubSection>

                <SubSection name="Reading Facts from a Text File">

                    <p>
                        A common task is to read facts from a file, e.g. from a comma-separated file (CSV)), and
                        parse these into a set of facts for further computation. The program below shows how this can be
                        accomplished.
                    </p>

                    <Editor flix={this.props.flix}>
                        {`/// Declare two relations that represents edges and paths in a graph.
rel DirectedEdge(x: Str, y: Str)
rel DirectedPath(x: Str, y: Str)

/// A list that contains edge facts which will be written to disk.
def getData(): List[Str] =
    "a, b" :: "b, c" :: "c, d" :: Nil

/// A function that writes edge facts to disk.
def writeData(path: Path): Result[Unit, Path.IOError] & Impure =
    Path.writeLines(path, getData())

/// A function that parses a comma-separated string into an edge fact.
def getEdgeFact(s: Str): #{ DirectedEdge, DirectedPath } & Impure =
    let parts = String.split(s, ",");
    let src = parts[0];
    let dst = parts[1];
    DirectedEdge(src, dst).

/// A function that parses a list of strings into a set of facts.
def getEdgeFacts(l: List[Str]): #{ DirectedEdge, DirectedPath } & Impure =
    match l with {
        case Nil => #{ }
        case x :: xs => getEdgeFact(x) <+> getEdgeFacts(xs)
    }

/// A function to read and parse a CSV file with edge facts.
def readFacts(path: Path): Result[#{ DirectedEdge, DirectedPath },
                                  Path.IOError] & Impure =
    Result.map(getEdgeFacts, Path.readLines(path))

/// The main function.
def main(): #{ DirectedEdge, DirectedPath } & Impure =
    // The path to file we will write to and then read from.
    let path = Path.new("facts.csv");

    // The constraint we want to compute with.
    let rules = #{
        DirectedPath(x, y) :- DirectedEdge(x, y).
        DirectedPath(x, z) :- DirectedPath(x, y), DirectedEdge(y, z).
    };

    // First, write the edge facts to disk.
    match writeData(path) with {
        case Ok(()) =>
            // Second, read the edge facts back into memory.
            match readFacts(path) with {
                case Ok(facts) =>
                    // Third, compute the fixpoint of the facts and rules.
                    solve (facts <+> rules)
                case Err(_) => ??? // implement proper error handling.
            }
        case Err(_) => ??? // implement proper error handling.
    }
`}
                    </Editor>

                    <p>
                        The program defines two relations, <code>DirectedEdge</code> and <code>DirectedPath</code>,
                        where our intention is to compute the <code>DirectedPath</code> relation
                        using <code>DirectedEdge</code> facts stored in a CSV file. For completeness, the program
                        creates a file <code>facts.csv</code> into which the list returned by <code>getData</code> is
                        written. The interesting parts of the program are <code>getEdgeFact</code> which parses a single
                        comma-separated string into a <code>DirectedEdge</code> fact.
                        The <code>getEdgeFacts</code> builds on the previous function and parses a list of strings into
                        a set of <code>DirectedEdge</code> facts.
                        The <code>readFacts</code> uses <code>Path.readLines</code> to read the file into memory as a
                        list of strings and then uses the former function to parse this into a set
                        of <code>DirectedEdge</code> facts. Finally, the main function composes the facts with the rules
                        for computing the transitive closure and computes the fixpoint.
                    </p>

                    <Warning>
                        For simplicity, the error-handling is deliberately kept to a minimum, but in a real program the
                        error cases should be handled more carefully.
                    </Warning>

                    <DesignNote>
                        There is currently no mechanism to export a constraint set to a text file.
                        We hope to address this in the future.
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

export default Fixpoints
