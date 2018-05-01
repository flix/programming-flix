import React from 'react'
import Code from '../components/Code';
import Editor from '../components/Editor';

class DataTypes extends React.Component {

    render() {
        return (
            <section>
                <h1>User-Defined Data Types</h1>

                <p>
                    As we have seen, Flix comes with a collection of built-in data types. These includes base types,
                    such as booleans, floats and integers, and compound types, such as tuples. Moreover, the Flix
                    standard library defines types such as <Code>Option[a]</Code>, <Code>Result[t,
                    e]</Code>, <Code>List[a]</Code>, <Code>Set[a]</Code>, and <Code>Map[k, v]</Code>. In addition, Flix
                    allows users to define their own data types, including <i>enumerated types</i>, <i>recursive
                    types</i>, and <i>polymorphic types</i>.
                </p>

                <h2>Enumerated Types</h2>

                <p>
                    Enumerated types are used to define a type that a finite sequence of values. Enumerated types are
                    useful for thing such as modeling a set of primary colors, a deck of cards, the compass directions,
                    and so forth.
                </p>

                <p>For example, here we can define an enumeration type for the weekdays:</p>

                <Editor runProgram={this.props.runProgram} main={"none"} lines={9}>
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
                    We can now refer to a weekday either as <Code>Monday</Code> or <Code>Weekday.Monday</Code> if we
                    want to specific about what enum we are referring to or if we have multiple enums with same
                    constructor.
                </p>

                <p>We can use pattern matching to inspect an enum. For example:</p>

                <Editor runProgram={this.props.runProgram} main={"none"} lines={13}>
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

def f(): Bool = isTall(Giraffe)`}
                </Editor>

                <p>
                    The function <Code>isTall</Code> takes a value of type <Code>Animal</Code> and performs a pattern
                    match on it. If the value is <Code>Giraffe</Code> the function returns <Code>true</Code>. Otherwise
                    it returns <Code>false</Code>.
                </p>

                <p>
                    Flix guarantees that such pattern matches are exhaustive, i.e. that all cases have been covered.
                </p>


                <h2>Recursive Types</h2>

                <p>
                    Recursive types are used to define types that are self-referential. For example, we can define a
                    a binary tree of integers as follows:
                </p>

                <Editor runProgram={this.props.runProgram} main={"none"} lines={4}>
                    {`enum Tree {
    case Leaf(Int),
    case Node(Tree, Tree)
}`}
                </Editor>

                <p>
                    A tree is either a <Code>Leaf</Code> carrying an integer value or an
                    internal <Code>Node</Code> carrying the left and right sub-tree. Notice that the definition
                    of <Code>Tree</Code> refers to itself.
                </p>

                <p>
                    We can write a function, using pattern matching, to compute the sum of all integers in such as tree:
                </p>

                <Editor runProgram={this.props.runProgram} main={"none"} lines={11}>
                    {`enum Tree {
    case Leaf(Int),
    case Node(Tree, Tree)
}

def sum(t: Tree): Int = match t with {
    case Leaf(x)    => x
    case Node(l, r) => sum(l) + sum(r)
}

def f(): Int = sum(Node(Leaf(1), Node(Leaf(2), Leaf(3))))`}
                </Editor>

                <p>
                    The function <Code>sum</Code> pattern matches on a tree an either returns the integer value (if it
                    is a leaf) or recurse on the two sub-trees adding their results.
                </p>

                <p>
                    Note: This function is not tail recursive, but it can be rewritten to be.
                </p>

                <h2>Polymorphic Types</h2>




            </section>
        )
    }

}

export default DataTypes
