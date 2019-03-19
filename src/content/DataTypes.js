import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";

class DataTypes extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Data Types";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Data Types">

                <p>
                    Flix comes with a collection of built-in data types, such as booleans, floats and integers, and
                    compound types, such as tuples and records. Moreover, the standard library defines types such
                    as <Code>Option[a]</Code>, <Code>Result[t, e]</Code>, <Code>List[a]</Code>, <Code>Set[a]</Code>,
                    and <Code>Map[k, v]</Code>. In addition to these types, Flix allows programmers to define their own
                    types, including <i>enumerated types</i>, <i>recursive types</i>, and <i>polymorphic types</i>.
                </p>

                <SubSection name="Enumerated Types">

                    <p>
                        Enumerated types are used to define a type that has a finite (enumerated) set of values.
                        Enumerated types are useful for things such as modeling compass directions, the cards in a deck,
                        and the days in a week.
                    </p>

                    <p>For example, here is an enumeration of the days in a week:</p>

                    <Editor flix={this.props.flix}>
                        {`enum Weekday {
    case Monday,
    case Tuesday,
    case Wednesday,
    case Thursday,
    case Friday,
    case Saturday,
    case Sunday
}`}
                    </Editor>

                    <p>
                        Here <Code>Monday</Code>, <Code>Tuesday</Code> and so on are referred to as
                        the <i>constructors</i> of the enum.
                    </p>

                    <p>
                        We can refer to a weekday either as <Code>Monday</Code> or <Code>Weekday.Monday</Code> if we
                        want to specific about the enum we refer to. This is useful if multiple enums have constructors
                        with the same name.
                    </p>

                    <p>We can use pattern matching to inspect an enum value. For example:</p>

                    <Editor flix={this.props.flix}>
                        {`enum Animal {
    case Cat,
    case Dog,
    case Giraffe
}

def isTall(a: Animal): Bool = match a with {
    case Cat        => false
    case Dog        => false
    case Giraffe    => true
}

def main(): Bool = isTall(Giraffe)`}
                    </Editor>

                    <p>
                        The function <Code>isTall</Code> takes a value of type <Code>Animal</Code> and performs a
                        pattern match on it. If the value is <Code>Giraffe</Code> the function returns <Code>true</Code>.
                        Otherwise it returns <Code>false</Code>.
                    </p>

                    <DesignNote>
                        Flix guarantees that such pattern matches are exhaustive, i.e. that all cases have been covered.
                        It is a compile-time error if a pattern match is non-exhaustive. A pattern match can always be
                        made exhaustive by adding a default case as the last case.
                    </DesignNote>

                </SubSection>

                <SubSection name="Recursive Types">

                    <p>
                        Recursive types are used to define types that are self-referential.
                    </p>

                    <p>
                        For example, we can define a a binary tree of integers as follows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`enum Tree {
    case Leaf(Int),
    case Node(Tree, Tree)
}`}
                    </Editor>

                    <p>
                        A tree is either a <Code>Leaf</Code> with an int value or an internal <Code>Node</Code> with a
                        left and a right sub-tree. Note that the definition of <Code>Tree</Code> refers to itself.
                    </p>

                    <p>
                        We can write a function, using pattern matching, to compute the sum of all integers in such as
                        tree:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`enum Tree {
    case Leaf(Int),
    case Node(Tree, Tree)
}

def sum(t: Tree): Int = match t with {
    case Leaf(x)    => x
    case Node(l, r) => sum(l) + sum(r)
}

def main(): Int = sum(Node(Leaf(1), Node(Leaf(2), Leaf(3))))`}
                    </Editor>

                    <p>
                        The <Code>sum</Code> function pattern matches on a tree value. If the tree is a leaf the value
                        is simply returned. Otherwise the function recurses on both subtrees and adds the results.
                    </p>

                </SubSection>

                <SubSection name="Polymorphic Types">

                    <p>
                        Polymorphic types are types parameterized by other types. For example, we can write:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`enum Box[a] {
    case Empty,
    case Full(a)
}

def isEmpty[a](b: Box[a]): Bool = match b with {
    case Empty   => true
    case Full(_) => false
}

def main(): Bool = isEmpty(Full(42))`}
                    </Editor>

                    <p>
                        Here the <Code>Box</Code> type is parameterized by the type parameter <Code>a</Code>. In Flix,
                        type parameters, like ordinary parameters are always written in lowercase.
                        The <Code>Box</Code> type has two cases: either the box is empty (and contains no value) or it
                        is full (and contains one value of type <Code>a</Code>). The <Code>isEmpty</Code> function takes
                        a box, type parameterized by <Code>a</Code>, and determines if the box is empty.
                        Finally, the <Code>main</Code> function constructs a box of type <Code>Box[Int]</Code> and asks
                        if it is empty.
                    </p>

                    <p>
                        The careful reader might have noticed that <Code>Box</Code> is equivalent to the more
                        well-known <Code>Option</Code>.
                    </p>

                    <p>
                        In general, polymorphic types can have more than one type argument as demonstrated by the
                        implementation of the <Code>Result[t, e]</Code> type in the standard library:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`///
/// A result represents a successful value or an error value.
/// The constructor \`Ok(v)\` represents the successful value \`v\`,
/// whereas the constructor \`Err(v)\` represents the error value \`v\`.
///
enum Result[t, e] {
    case Ok(t),
    case Err(e)
}
`}
                    </Editor>

                </SubSection>

            </Section>
        )
    }

}

export default DataTypes
