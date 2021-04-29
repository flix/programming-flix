import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import Warning from "../components/Warning";
import {Table} from "reactstrap";
import CodeBlock from "../util/CodeBlock";

class DataTypes extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Data Types";
        ReactGA.pageview(window.location.href);
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


                <SubSection name="Primitive Types">
                    <p>
                        Flix supports the usual primitive types known from most languages:
                    </p>

                    <Table>
                        <thead>
                        <tr>
                            <th>Type</th>
                            <th>Syntax</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Unit</td>
                            <td><Code>()</Code></td>
                            <td>The unit value.</td>
                        </tr>
                        <tr>
                            <td>Bool</td>
                            <td><Code>true</Code>, <Code>false</Code></td>
                            <td>A boolean value.</td>
                        </tr>
                        <tr>
                            <td>Char</td>
                            <td><Code>'a'</Code>, <Code>'b'</Code>, <Code>'c'</Code></td>
                            <td>A character value.</td>
                        </tr>
                        <tr>
                            <td>Float32</td>
                            <td><Code>0.0f32</Code>, <Code>21.42f32</Code>, <Code>-21.42f32</Code></td>
                            <td>A 32-bit floating point integer.</td>
                        </tr>
                        <tr>
                            <td>Float64</td>
                            <td><Code>0.0f64</Code>, <Code>21.42f64</Code>, <Code>-21.42f64</Code></td>
                            <td>A 64-bit floating point integer.</td>
                        </tr>
                        <tr>
                            <td>Int8</td>
                            <td>
                                <Code>0i8</Code>, <Code>1i8</Code>, <Code>-1i8</Code>, <Code>127i8</Code>, <Code>-128i8</Code>
                            </td>
                            <td>A signed 8-bit integer.</td>
                        </tr>
                        <tr>
                            <td>Int16</td>
                            <td><Code>0i16</Code>, <Code>123i16</Code>, <Code>-123i16</Code></td>
                            <td>A signed 16-bit integer.</td>
                        </tr>
                        <tr>
                            <td>Int32</td>
                            <td><Code>0i32</Code>, <Code>123i32</Code>, <Code>-123i32</Code></td>
                            <td>A signed 32-bit integer.</td>
                        </tr>
                        <tr>
                            <td>Int64</td>
                            <td><Code>0i64</Code>, <Code>123i64</Code>, <Code>-123i64</Code></td>
                            <td>A signed 64-bit integer.</td>
                        </tr>
                        <tr>
                            <td>String</td>
                            <td><Code>"hello"</Code>, <Code>"world"</Code></td>
                            <td>A string value.</td>
                        </tr>
                        <tr>
                            <td>BigInt</td>
                            <td><Code>0ii</Code>, <Code>123ii</Code>, <Code>-123ii</Code></td>
                            <td>An arbitrary precision integer.</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p>
                        <Code>Float</Code> is shorthand for <Code>Float64</Code> and <Code>Int</Code> is
                        shorthand for <Code>Int32</Code>. <Code>Float64</Code> and <Code>Int32</Code> values can be
                        written without suffix, i.e. <Code>123.0f64</Code> can simply be written
                        as <Code>123.0</Code> and <Code>123i32</Code> can be written as <Code>123</Code>.
                    </p>
                </SubSection>

                <SubSection name="Tuples">

                    <p>
                        A tuple is product of values.
                    </p>

                    <p>
                        For example, here is a pair of an integer and a Boolean:
                    </p>

                    <CodeBlock>{`(1, true)`}</CodeBlock>

                    <p>
                        The type of a tuple is written like the tuple itself. Hence the type of the tuple is <Code>(Int32,
                        Bool)</Code>.
                    </p>

                    <p>
                        We can extract the value of a tuple using pattern matching. For example:
                    </p>

                    <CodeBlock>{`let t = ("Lucky", "Luke", 42, true);
let (fstName, lstName, age, male) = t`}</CodeBlock>

                    <p>
                        For pairs (i.e. 2-tuples), the Flix prelude defines
                        the <Code>fst</Code> and <Code>snd</Code> functions:
                    </p>

                    <CodeBlock>{`let p = (1, 2);
let x = fst(t);
let y = snd(t)`}</CodeBlock>

                    <p>
                        These functions are especially useful when working with lists of pairs. For example:
                    </p>

                    <CodeBlock>{`let l = (1, 1) :: (2, 2) :: Nil; // has type List[(Int32, Int32)]
List.map(fst, l1)                // has type List[Int32]`}</CodeBlock>

                    <p>
                        which extracts the first component of the pairs in the list <Code>l</Code>.
                    </p>

                </SubSection>


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

                <SubSection name="Opaque Types">

                    <p>
                        Opaque types introduce a new name for an underlying type. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`///
/// An opaque type for US dollars.
///
opaque type USD = Int

///
/// An opaque type for Canadian dollars.
///
opaque type CAD = Int

///
/// A function that adds two US dollar amounts.
///
/// Cannot accidentially be called with Canadian dollars.
///
def sum(x: USD, y: USD): USD = 
  let USD(u) = x;
  let USD(v) = y;
  USD(u + v)

def main(): USD = sum(USD(1), USD(5))
`}
                    </Editor>

                    <p>
                        An opaque type works similar to declaring an enum that has a single constructor of the
                        underlying type.
                    </p>

                    <p>
                        An opaque type may be polymorphic.
                    </p>

                    <DesignNote>
                        An <i>opaque type</i> is also called a <i>newtype</i> in Haskell.
                    </DesignNote>

                </SubSection>

                <SubSection name="Type Aliases">

                    <p>
                        Type aliases introduces a short-hand for a type. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`/// 
/// A type alias for a map from keys of type \`k\` 
/// to values of type \`Result[v, String]\`
///
type alias M[k, v] = Map[k, Result[v, String]]

def main(): M[Bool, Int] = Map#{true -> Ok(123)}
`}
                    </Editor>

                    <p>
                        A <i>type alias</i>, unlike an <i>opaque type</i>, does not define a new distinct type. Rather a
                        type alias is simply a syntactic short-hand for a (usually complex) type.
                    </p>

                    <p>
                        A type alias may be polymorphic.
                    </p>

                    <DesignNote>
                        The Flix compiler expands all type aliases before type checking. Consequently, potentially type
                        errors are always reported with respect to the actual types.
                    </DesignNote>

                    <Warning>
                        A type alias cannot be recursively defined in terms of itself. The Flix compiler will detect and
                        report such recursive cycles.
                    </Warning>

                </SubSection>

            </Section>
        )
    }

}

export default DataTypes
