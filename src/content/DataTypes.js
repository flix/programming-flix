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

                <p>
                    Flix also supports type aliases and opaque types (new types).
                </p>


                <SubSection name="Primitive Types">

                    <p>
                        Flix supports the usual primitive types:
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
                        A tuple is a product of values.
                    </p>

                    <p>
                        A tuple is written with parentheses. For example, here is a 2-tuple (a pair) of
                        an <Code>Int32</Code> and a <Code>Bool</Code>:
                    </p>

                    <CodeBlock>{`(123, true)`}</CodeBlock>

                    <p>
                        The type of the tuple is <Code>(Int32, Bool)</Code>.
                    </p>

                    <p>
                        We can destruct a tuple using pattern matching. For example:
                    </p>

                    <CodeBlock>{`let t = ("Lucky", "Luke", 42, true);
let (fstName, lstName, age, male) = t;
lstName`}</CodeBlock>

                    <p>
                        evaluates to the string <Code>"Luke"</Code>.
                    </p>

                    <p>
                        The Flix prelude defines the <Code>fst</Code> and <Code>snd</Code> functions:
                    </p>

                    <CodeBlock>{`let p = (1, 2);
let x = fst(t); // x = 1
let y = snd(t)  // y = 2`}</CodeBlock>

                    <p>
                        which are useful when working with 2-tuples (i.e. pairs). For example:
                    </p>

                    <CodeBlock>{`let l = (1, 1) :: (2, 2) :: Nil; // has type List[(Int32, Int32)]
List.map(fst, l)                // has type List[Int32]`}</CodeBlock>

                    <p>
                        which evaluates to a list that contains all the first components of the list <Code>l</Code>.
                    </p>

                </SubSection>

                <SubSection name="Enumerated Types">

                    <p>
                        Enumerated types are used to define a type that has a finite (enumerated) set of values.
                        Enumerated types are useful for things such as modeling compass directions, the cards in a deck,
                        and the days in a week.
                    </p>

                    <p>For example, here is an enumeration of the days in a week:</p>

                    <CodeBlock>
                        {`enum Weekday {
    case Monday,
    case Tuesday,
    case Wednesday,
    case Thursday,
    case Friday,
    case Saturday,
    case Sunday
}`}
                    </CodeBlock>

                    <p>
                        Here <Code>Monday</Code>, <Code>Tuesday</Code> and so on are referred to as
                        the <i>constructors</i> of the enum.
                    </p>

                    <p>
                        We can refer to a weekday as <Code>Monday</Code> or <Code>Weekday.Monday</Code>. The latter
                        is required if we have multiple enums in scope with similarly named constructors.
                    </p>

                    <p>We can use pattern matching to destruct an enum value. For example:</p>

                    <CodeBlock>
                        {`enum Animal {
    case Cat,
    case Dog,
    case Giraffe
}

def isTall(a: Animal): Bool = match a {
    case Cat        => false
    case Dog        => false
    case Giraffe    => true
}`}
                    </CodeBlock>

                    <p>
                        The function <Code>isTall</Code> takes a value of type <Code>Animal</Code> and performs a
                        pattern match on it. If the value is <Code>Giraffe</Code> the function returns <Code>true</Code>.
                        Otherwise it returns <Code>false</Code>.
                    </p>

                    <p>
                        Flix guarantees that pattern matches are exhaustive, i.e. that all cases have been covered. It
                        is a compile-time error if a pattern match is non-exhaustive. A pattern match can always be
                        made exhaustive by adding a default case as the last case. A default case is written with
                        an underscore <Code>case _ => ...</Code>.
                    </p>

                </SubSection>

                <SubSection name="Recursive Types">

                    <p>
                        Recursive types are used to define types that are self-referential.
                    </p>

                    <p>
                        For example, we can define a a binary tree of integers as follows:
                    </p>

                    <CodeBlock>
                        {`enum Tree {
    case Leaf(Int32),
    case Node(Tree, Tree)
}`}
                    </CodeBlock>

                    <p>
                        A tree is either a <Code>Leaf</Code> with an <Code>Int32</Code> value or an
                        internal <Code>Node</Code> with a left and a right sub-tree. Note that the definition
                        of <Code>Tree</Code> refers to itself.
                    </p>

                    <p>
                        We can write a function, using pattern matching, to compute the sum of all integers in such a
                        tree:
                    </p>

                    <CodeBlock>
                        {`def sum(t: Tree): Int = match t {
    case Leaf(x)    => x
    case Node(l, r) => sum(l) + sum(r)
}`}
                    </CodeBlock>

                    <p>
                        The <Code>sum</Code> function pattern matches on a tree value. If the tree is a leaf its value
                        is simply returned. Otherwise the function recurses on both subtrees and adds their results.
                    </p>

                </SubSection>

                <SubSection name="Polymorphic Types">

                    <p>
                        Polymorphic types are types parameterized by other types. For example, we can write:
                    </p>

                    <CodeBlock>
                        {`enum Bottle[a] {
    case Empty,
    case Full(a)
}

def isEmpty[a](b: Bottle[a]): Bool = match b {
    case Empty   => true
    case Full(_) => false
}`}
                    </CodeBlock>

                    <p>
                        Here the <Code>Bottle</Code> type is parameterized by the type parameter <Code>a</Code>. In
                        Flix, type parameters, like ordinary parameters are always written in lowercase.
                        The <Code>Bottle</Code> type has two cases: either the bottle is empty (and contains no value)
                        or it is full (and contains one value of type <Code>a</Code>). The <Code>isEmpty</Code> function
                        takes a bottle, type parameterized by <Code>a</Code>, and determines if the bottle is empty.
                    </p>

                    <p>
                        The careful reader might have noticed that <Code>Bottle</Code> is equivalent to the more
                        well-known <Code>Option</Code> type.
                    </p>

                    <p>
                        In general, polymorphic types can have more than one type argument. For example, the standard
                        library implement of the <Code>Result</Code> has two type parameters:
                    </p>

                    <CodeBlock>
                        {`enum Result[t, e] {
    case Ok(t),
    case Err(e)
}`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Opaque Types">

                    <p>
                        Opaque types introduce a new name for an underlying type. For example:
                    </p>

                    <CodeBlock>
                        {`///
/// An opaque type for US dollars.
///
opaque type USD = Int32

///
/// An opaque type for Canadian dollars.
///
opaque type CAD = Int32

///
/// A function that adds two US dollar amounts.
///
/// Cannot accidentally be called with Canadian dollars.
///
def sum(x: USD, y: USD): USD = 
  let USD(u) = x;
  let USD(v) = y;
  USD(u + v)
`}
                    </CodeBlock>

                    <p>
                        Opaque types are functionally equivalent to enums with a single constructor. That is, the
                        declaration:
                    </p>

                    <CodeBlock>
                        {`opaque type USD = Int32`}
                    </CodeBlock>

                    <p>
                        is equivalent to:
                    </p>

                    <CodeBlock>
                        {`enum USD {
    case USD(Int32)
}`}
                    </CodeBlock>

                    <p>
                        Opaque types are similar to the <i>newtype</i> mechanism in Haskell.
                    </p>

                </SubSection>

                <SubSection name="Type Aliases">

                    <p>
                        Type aliases introduces a short-hand name for a type. For example:
                    </p>

                    <CodeBlock>
                        {`/// 
/// A type alias for a map from keys of type \`k\` 
/// to values of type \`Result[v, String]\`
///
type alias M[k, v] = Map[k, Result[v, String]]

def foo(): M[Bool, Int] = Map#{true => Ok(123)}
`}
                    </CodeBlock>

                    <p>
                        A <i>type alias</i>, unlike an <i>opaque type</i>, does not define a new distinct type. Rather a
                        type alias is simply a syntactic short-hand for a (usually complex) type.
                    </p>

                    <p>
                        The Flix compiler expands type aliases before type checking. Consequently, type errors are
                        always reported with respect to the actual underlying types.
                    </p>

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
