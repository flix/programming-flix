import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import Warning from "../components/Warning";
import CodeBlock from "../util/CodeBlock";

class Fixpoints extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Fixpoints";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Fixpoints">

                <p>
                    A unique feature of Flix is its built-in support for fixpoint computations on <i>constraint on
                    relations</i> and <i>constraint on lattices</i>.
                </p>

                <p>
                    We assume that the reader is already familiar with Datalog and focus on the Flix specific features.
                </p>

                <SubSection name="Using Flix to Solve Constraints on Relations">

                    <p>
                        We can use Flix to solve a fixpoint computation inside a function.
                    </p>

                    <p>
                        For example, given a set of edges <Code>s</Code>, a <Code>src</Code> node,
                        and <Code>dst</Code> node, compute if there is a path from <Code>src</Code> to <Code>dst</Code>.
                        We can elegantly solve this problem as follows:
                    </p>

                    <CodeBlock>
                        {`def isConnected(s: Set[(Int32, Int32)], src: Int32, dst: Int32): Bool =
    let rules = #{
        Path(x, y) :- Edge(x, y).
        Path(x, z) :- Path(x, y), Edge(y, z).
    };
    let edges = project s into Edge;
    let paths = query edges, rules select true from Path(src, dst);
    not (paths |> Array.isEmpty)

def main(): Unit & Impure =
    let s = Set#{(1, 2), (2, 3), (3, 4), (4, 5)};
    let src = 1;
    let dst = 5;
    if (isConnected(s, src, dst)) {
        println("Found a path between \${src} and \${dst}!")
    } else {
        println("Did not find a path between \${src} and \${dst}!")
    }`}
                    </CodeBlock>

                    <p>
                        The <Code>isConnected</Code> function behaves like any other function: We can call it with a
                        set of edges (<Code>Int32</Code>-pairs), an <Code>Int32</Code> source node, and
                        an <Code>Int32</Code> destination node. What is interesting about <Code>isConnected</Code> is
                        that its implementation uses a small Datalog program to solve the task at hand.
                    </p>

                    <p>
                        In the <Code>isConnected</Code> function, the local variable <Code>rules</Code> holds a Datalog
                        program fragment that consists of two rules which define the <Code>Path</Code> relation. Note
                        that the predicate symbols, <Code>Edge</Code> and <Code>Path</Code> do not have to be
                        explicitly introduced; they are simply used. The local variable <Code>edges</Code> holds a
                        collection of edge facts that are obtained by taking all the tuples in the set <Code>s</Code>
                        &nbsp;and turning them into <Code>Edge</Code> facts. Next, the local variable <Code>paths</Code>
                        &nbsp;holds the result of computing the fixpoint of the facts and rules
                        (<Code>edges</Code> and <Code>rules</Code>) and selecting the Boolean <Code>true</Code>&nbsp;
                        <i>if</i> there is a <Code>Path(src, dst)</Code> fact. Note that here <Code>src</Code>&nbsp;
                        and <Code>dst</Code> are the lexically-bound function parameters. Thus, <Code>paths</Code>&nbsp;
                        is either an empty array (no paths were found) or a one-element array (a path was found),
                        and we simply return this fact.
                    </p>

                    <p>
                        Flix is strongly typed. Any attempt to use predicate symbol with terms of the wrong type (or
                        with the wrong arity) is caught by the type checker. Note also that Flix supports type
                        inference, hence we did not have to declare the type of <Code>Edge</Code> nor
                        of <Code>Path</Code>.
                    </p>

                </SubSection>

                <SubSection name="Stratified Negation">

                    <p>
                        Flix supports <i>stratified negation</i> which allow restricted use of negation in rule
                        bodies. For example:
                    </p>

                    <CodeBlock>
                        {`def main(): Unit & Impure =
    let movies = #{
        Movie("The Hateful Eight").
        Movie("Interstellar").
    };
    let actors = #{
        StarringIn("The Hateful Eight", "Samuel L. Jackson").
        StarringIn("The Hateful Eight", "Kurt Russel").
        StarringIn("The Hateful Eight", "Quentin Tarantino").
        StarringIn("Interstellar", "Matthew McConaughey").
        StarringIn("Interstellar", "Anne Hathaway").
    };
    let directors = #{
        DirectedBy("The Hateful Eight", "Quentin Tarantino").
        DirectedBy("Interstellar", "Christopher Nolan").
    };
    let rule = #{
        MovieWithoutDirector(title) :- 
            Movie(title), 
            DirectedBy(title, name), 
            not StarringIn(title, name).
    };
    query movies, actors, directors, rule 
        select title from MovieWithoutDirector(title) |> println
`}
                    </CodeBlock>

                    <p>
                        The program defines three local variables that contain information about movies, actors, and
                        directors. The local variable <Code>rule</Code> contains a rule that captures all movies where
                        the director does not star in the movie. Note the use negation in this rule. The query returns
                        an array with the string <Code>"Interstellar"</Code> because Christopher Nolan did not
                        star in that movie.
                    </p>

                    <DesignNote>
                        Flix enforces that programs are stratified, i.e. a program must not have recursive dependencies
                        that form on which there is use of negation. If there is, the Flix compiler rejects the program.
                    </DesignNote>

                </SubSection>

                <SubSection name="Programming with First-class Constraints">

                    <p>
                        A unique feature of Flix is its support for <i>first-class constraints</i>. A first-class
                        constraint is a value that can be constructed, passed around, composed with other constraints,
                        and ultimately solved. The solution to a constraint system is another constraint system which
                        can be further composed.
                    </p>

                    <p>
                        For example:
                    </p>

                    <CodeBlock>
                        {`def getParents(): #{ ParentOf(String, String) | r } = #{
    ParentOf("Pompey", "Strabo").
    ParentOf("Gnaeus", "Pompey").
    ParentOf("Pompeia", "Pompey").
    ParentOf("Sextus", "Pompey").
}

def getAdoptions(): #{ AdoptedBy(String, String) | r } = #{
    AdoptedBy("Augustus", "Caesar").
    AdoptedBy("Tiberius", "Augustus").
}

def withAncestors(): #{ ParentOf(String, String), 
                        AncestorOf(String, String) | r } = #{
    AncestorOf(x, y) :- ParentOf(x, y).
    AncestorOf(x, z) :- AncestorOf(x, y), AncestorOf(y, z).
}

def withAdoptions(): #{ AdoptedBy(String, String), 
                        AncestorOf(String, String) | r } = #{
    AncestorOf(x, y) :- AdoptedBy(x, y).
}

def main(): Unit & Impure =
    let c = false;
    if (c) {
        query getParents(), getAdoptions(), withAncestors() 
            select (x, y) from AncestorOf(x, y) |> println
    } else {
        query getParents(), getAdoptions(), withAncestors(), withAdoptions()
            select (x, y) from AncestorOf(x, y) |> println
    }
`}
                    </CodeBlock>

                    <p>
                        The program uses three predicate symbols: <Code>ParentOf</Code>, <Code>AncestorOf</Code>,
                        and <Code>AdoptedBy</Code>. The <Code>getParents</Code> function returns a collection of facts
                        that represent biological parents, whereas the <Code>getAdoptions</Code> function returns
                        a collection of facts that represent adoptions. The <Code>withAncestors</Code> function
                        returns two constraints that populate the <Code>AncestorOf</Code> relation using the&nbsp;
                        <Code>ParentOf</Code> relation. The <Code>withAdoptions</Code> function returns a constraint
                        that populates the <Code>ParentOf</Code> relation using the <Code>AdoptedBy</Code> relation.
                    </p>

                    <p>
                        In the <Code>main</Code> function the local variable <Code>c</Code> controls whether we query a
                        Datalog program that only considers biological parents or if we include adoptions.
                    </p>

                    <p>
                        As can be seen, the types the functions are row-polymorphic. For example, the signature
                        of <Code>getParents</Code> is <Code>def getParents():
                        #{"{ ParentOf | r }"}</Code> where <Code>r</Code> is row polymorphic type variable that
                        represent the rest of the predicates that the result of the function can be composed with.
                    </p>

                    <DesignNote>
                        The row polymorphic types are best understood as an over-approximation of the predicates that
                        may occur in a constraint system. For example, if a constraint system has
                        type <Code>{"#{ A(String), B(Int32, Int32) }"}</Code> that does necessarily mean that it will
                        contain facts or rules that use the predicate symbols <Code>A</Code> or <Code>B</Code>, but it
                        does guarantee that it will not contain any fact or rule that refer to a predicate
                        symbol <Code>C</Code>.
                    </DesignNote>

                </SubSection>

                <SubSection name="Polymorphic First-class Constraints">

                    <p>
                        Another unique feature of Flix is its support for
                        first-class <i>polymorphic</i> constraints. That is, constraints where one or more
                        constraints are polymorphic in their term types. For example:
                    </p>

                    <CodeBlock>
                        {`def edgesWithNumbers(): #{ LabelledEdge(String, Int32 , String) | r } = #{
    LabelledEdge("a", 1, "b").
    LabelledEdge("b", 1, "c").
    LabelledEdge("c", 2, "d").
}

def edgesWithColor(): #{ LabelledEdge(String, String, String) | r } = #{
    LabelledEdge("a", "red", "b").
    LabelledEdge("b", "red", "c").
    LabelledEdge("c", "blu", "d").
}

def closure(): #{ LabelledEdge(String, l, String), 
                  LabelledPath(String, l, String) } with Boxable[l] = #{
    LabelledPath(x, l, y) :- LabelledEdge(x, l, y).
    LabelledPath(x, l, z) :- LabelledPath(x, l, y), LabelledPath(y, l, z).
}

def main(): Unit & Impure =
    query edgesWithNumbers(), closure() 
        select (x, l, z) from LabelledPath(x, l, z) |> println;
    query edgesWithColor(), closure() 
        select (x, l, z) from LabelledPath(x, l, z) |> println
`}
                    </CodeBlock>

                    <p>
                        Here we use two predicate symbols: <Code>LabelledEdge</Code> and <Code>LabelledPath</Code>.
                        Each predicate has a type parameter named <Code>l</Code> and is polymorphic in the "label"
                        type associated with the edge/path. Note how <Code>edgesWithNumbers</Code> returns a
                        collection of edge facts where the labels are integers,
                        whereas <Code>edgesWithColor</Code> returns a collection of facts where the labels are
                        strings. The <Code>closure</Code> function is polymorphic and returns two rules that
                        compute the transitive closure of edges that have the same label.
                    </p>

                    <p>
                        The Flix type system ensures that we cannot accidentally mix edges (or paths) with different
                        types of labels.
                    </p>

                    <DesignNote>
                        The <Code>Boxable</Code> type class constraint simply requires that each label type
                        has <Code>Eq</Code>, <Code>Order</Code>, and <Code>ToString</Code> instances.
                    </DesignNote>

                </SubSection>

                <SubSection name="Projecting Facts into Datalog">

                    <p>
                        Flix provides a flexible mechanism that allows functional data structures (such as lists, sets,
                        and maps) to be converted into Datalog facts.
                    </p>

                    <p>
                        For example, given a Flix list of pairs we can convert it to a collection of Datalog facts:
                    </p>

                    <CodeBlock>{`let l = (1, 2) :: (2, 3) :: Nil;
let p = project l into Edge`}</CodeBlock>

                    <p>
                        where <Code>l</Code> has type <Code>List[(Int32, Int32)]</Code>.
                        The <Code>project</Code> expression converts <Code>l</Code> into a Datalog constraint
                        set <Code>p</Code> of type <Code>{"#{ Edge(Int32, Int32) | ...}"}</Code>.
                    </p>

                    <p>
                        The <Code>project</Code> expression works with any type that implements
                        the <Code>Foldable</Code> type class. Consequently, it can be used with lists, sets, maps, and
                        so forth.
                    </p>

                    <p>
                        The <Code>project</Code> expression can operate on multiple collections simultaneously. For
                        example:
                    </p>

                    <CodeBlock>{`let names = "Lucky Luke" :: "Luke Skywalker" :: Nil;
let jedis = "Luke Skywalker" :: Nil;
let p = project names, jedis into Name, Jedi`}</CodeBlock>

                    <p>
                        where <Code>p</Code> has type <Code>{"#{ Name(String), Jedi(String) | ...}"}</Code>.
                    </p>

                </SubSection>

                <SubSection name="Pipelines of Fixpoint Computations">

                    <p>
                        The solution (i.e. fixpoint) of a constraint system is another constraint system. We can use
                        this to construct <i>pipelines</i> of fixpoint computations, i.e. to feed the result of one
                        fixpoint computation into another fixpoint computation. For example:
                    </p>

                    <CodeBlock>
                        {`def main(): Unit & Impure =
    let f1 = #{
        ColorEdge(1, "blue", 2).
        ColorEdge(2, "blue", 3).
        ColorEdge(3, "red", 4).
    };
    let r1 = #{
        ColorPath(x, c, y) :- ColorEdge(x, c, y).
        ColorPath(x, c, z) :- ColorPath(x, c, y), ColorEdge(y, c, z).
    };
    let r2 = #{
        ColorlessPath(x, y) :- ColorPath(x, _, y).
    };
    let m = solve f1, r1 project ColorPath;
    query m, r2 select (x, y) from ColorlessPath(x, y) |> println
`}
                    </CodeBlock>

                    <p>
                        The program uses three predicates: <Code>ColorEdge</Code>, <Code>ColorPath</Code>,
                        and <Code>ColorlessPath</Code>. Our goal is to compute the transitive closure of the
                        colored edges and then afterwards construct a graph where the edges have no color.
                    </p>

                    <p>
                        The program first computes the fixpoint of <Code>f1</Code> and <Code>r1</Code> and projects out
                        the <Code>ColorPath</Code> fact. The result is stored in <Code>m</Code>. Next, the program
                        queries <Code>m</Code> and <Code>r2</Code>, and selects all <Code>ColorlessPath</Code> facts.
                    </p>

                </SubSection>

                <SubSection name="Using Flix to Solve Constraints on Lattices">

                    <p>
                        Flix supports not only <i>constraints on relations</i>, but also <i>constraints on lattices</i>.
                        To create such constraints, we must first define the lattice operations (the partial order,
                        the least upper bound, and so on) as functions, associate them with a type, and then declare the
                        predicate symbols that have lattice semantics.
                    </p>

                    <p>
                        We begin with the definition of the <Code>Sign</Code> data type:
                    </p>

                    <CodeBlock>
                        {`enum Sign {
              case Top,

    case Neg, case Zer, case Pos,

              case Bot
}`}
                    </CodeBlock>

                    <p>
                        We need to define the usual <Code>Eq</Code>, <Code>Order</Code>,
                        and <Code>ToString</Code> instances for this new type. (The order instance is unrelated to the
                        partial order instance we will later define, and is simply used to sort elements for pretty
                        printing etc.)
                    </p>

                    <CodeBlock>
                        {`instance Boxable[Sign]

instance Eq[Sign] {
    pub def eq(x: Sign, y: Sign): Bool = match (x, y) {
        case (Bot, Bot) => true
        case (Neg, Neg) => true
        case (Zer, Zer) => true
        case (Pos, Pos) => true
        case (Top, Top) => true
        case _          => false
    }
}

instance Order[Sign] {
    pub def compare(x: Sign, y: Sign): Comparison = 
        let num = w -> match w {
            case Bot => 0
            case Neg => 1
            case Zer => 2
            case Pos => 3
            case Top => 4
        };
        num(x) <=> num(y)
}

instance ToString[Sign] {
    pub def toString(x: Sign): String = match x {
        case Bot => "Bot"
        case Neg => "Neg"
        case Zer => "Zer"
        case Pos => "Pos"
        case Top => "Top"
    }
}`}
                    </CodeBlock>

                    <p>
                        With these type class instances in place, we can now define the lattice operations
                        on <Code>Sign</Code>.
                    </p>

                    <p>
                        We define the bottom element and the partial order:
                    </p>

                    <CodeBlock>
                        {`instance LowerBound[Sign] {
    pub def minValue(): Sign = Bot
}

instance PartialOrder[Sign] {
    pub def lessEqual(x: Sign, y: Sign): Bool =
        match (x, y) {
            case (Bot, _)   => true
            case (Neg, Neg) => true
            case (Zer, Zer) => true
            case (Pos, Pos) => true
            case (_, Top)   => true
            case _          => false
        }
}`}
                    </CodeBlock>

                    <p>
                        Next, we define the least upper bound and greatest lower bound:
                    </p>

                    <CodeBlock>
                        {`
instance JoinLattice[Sign] {
    pub def leastUpperBound(x: Sign, y: Sign): Sign = 
        match (x, y) {
            case (Bot, _)   => y
            case (_, Bot)   => x
            case (Neg, Neg) => Neg
            case (Zer, Zer) => Zer
            case (Pos, Pos) => Pos
            case _          => Top
        }
}

instance MeetLattice[Sign] {
    pub def greatestLowerBound(x: Sign, y: Sign): Sign = 
        match (x, y) {
            case (Top, _)   => y
            case (_, Top)   => x
            case (Neg, Neg) => Neg
            case (Zer, Zer) => Zer
            case (Pos, Pos) => Pos
            case _          => Bot
        }
}
`}
                    </CodeBlock>

                    <p>
                        With all of these definitions we are ready to write Datalog constraints with lattice semantics.
                        But before we proceed, let us also write a single monotone function:
                    </p>

                    <CodeBlock>
                        {`def sum(x: Sign, y: Sign): Sign = match (x, y) {
    case (Bot, _)   => Bot
    case (_, Bot)   => Bot
    case (Neg, Zer) => Neg
    case (Zer, Neg) => Neg
    case (Zer, Zer) => Zer
    case (Zer, Pos) => Pos
    case (Pos, Zer) => Pos
    case (Pos, Pos) => Pos
    case _          => Top
}`}
                    </CodeBlock>

                    <p>
                        We can now finally put everything to use:
                    </p>

                    <CodeBlock>
                        {`pub def main(): Unit & Impure =
    let p = #{
        LocalVar("x"; Pos).
        LocalVar("y"; Zer).
        LocalVar("z"; Neg).
        AddStm("r2", "x", "y").
        AddStm("r2", "x", "z").
        AddStm("r2", "y", "z").
        LocalVar(r; sum(v1, v2)) :- 
            AddStm(r, x, y), LocalVar(x; v1), LocalVar(y; v2).
    };
    query p select (r, v) from LocalVar(r; v) |> println
`}
                    </CodeBlock>

                    <Warning>
                        Note the careful use of <Code>;</Code> to designate lattice semantics.
                    </Warning>

                </SubSection>

            </Section>
        )
    }

}

export default Fixpoints
