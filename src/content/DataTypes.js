import React from 'react'
import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";

class DataTypes extends React.Component {

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

                <h2>Polymorphic Types</h2>


            </Section>
        )
    }

}

export default DataTypes
