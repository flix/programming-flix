import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Section from "../components/Section";
import CodeBlock from "../util/CodeBlock";

class Lists extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Lists";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Lists">

                <p>
                    The bread and butter of functional programming is list processing. A list is either the empty list,
                    written as <Code>Nil</Code>, or a cons cell, written as <Code>x :: xs</Code> where <Code>x</Code> is
                    the head element and <Code>xs</Code> is the tail of the list. The <Code>List</Code> type is
                    polymorphic so you can have a list of integers, written as <Code>List[Int32]</Code>, or a list of
                    strings written as <Code>List[String]</Code>. The <Code>List</Code> type and list operations are
                    part
                    of the Flix standard library.
                </p>

                <p>
                    We write the empty list as follows:
                </p>

                <CodeBlock>{`Nil`}</CodeBlock>

                <p>
                    We can construct a list of strings with the strings <Code>"Hello"</Code> and <Code>"World"</Code> as
                    follows:
                </p>

                <CodeBlock>{`"Hello" :: "World" :: Nil`}</CodeBlock>

                <p>Given a list there are many useful operations we can perform on it.</p>

                <p>For example, we can compute the length of a list as follows:</p>

                <CodeBlock>{`List.length(1 :: 2 :: 3 :: Nil)`}</CodeBlock>

                <p>We can also reverse the order of elements in a list:</p>

                <CodeBlock>{`List.reverse(1 :: 2 :: 3 :: Nil)`}</CodeBlock>

                <p>
                    We can append two lists using the <Code>List.append</Code> function as follows:
                </p>

                <CodeBlock>{`let xs = (1 :: 2 :: 3 :: Nil);
let ys = (4 :: 5 :: 6 :: Nil);
List.append(xs, ys)`}</CodeBlock>

                <p>
                    Or, alternatively, we can use the built-in append operator <Code>:::</Code> as follows:
                </p>

                <CodeBlock>{`let xs = (1 :: 2 :: 3 :: Nil);
let ys = (4 :: 5 :: 6 :: Nil);
xs ::: ys`}</CodeBlock>

                <p>
                    Flix has an extensive collection of functions to operate on lists.
                </p>

                <p>
                    Here are some of the most common:
                </p>

                <CodeBlock>
                    {`List.count(x -> x == 1, 1 :: 2 :: 3 :: Nil)`}
                </CodeBlock>

                <CodeBlock>
                    {`List.filter(x -> x == 1, 1 :: 2 :: 3 :: Nil)`}
                </CodeBlock>

                <CodeBlock>
                    {`List.map(x -> x + 1, 1 :: 2 :: 3 :: Nil)`}
                </CodeBlock>

                <CodeBlock>
                    {`List.foldLeft((x, y) -> x + y, 0, 1 :: 2 :: 3 :: Nil)`}
                </CodeBlock>

                <p>
                    And here are some more exotic:
                </p>

                <CodeBlock>
                    {`List.intersperse("X", "a" :: "b" :: "c" :: Nil)`}
                </CodeBlock>

                <p>
                    which inserts <Code>"X"</Code> between every element in the list.
                </p>

                <CodeBlock>
                    {`let l1 = "X" :: "Y" :: Nil;
let l2 = ("a" :: "b" :: Nil) :: ("c" :: "d" :: Nil) :: Nil;
List.intercalate(l1, l2)`}
                </CodeBlock>

                <p>
                    which inserts the list <Code>l1</Code> between every element in the list <Code>l2</Code>.
                </p>

                <p>
                    We can write our own recursive functions to operate on lists.
                </p>

                <p>
                    For example, here is an implementation of the <Code>map</Code> function:
                </p>

                <CodeBlock>
                    {`///
/// Returns the result of applying \`f\` to every element in \`xs\`.
/// That is, the result is of the form: \`f(x1) :: f(x2) :: ...\`.
///
pub def map(f: a -> b & ef, xs: List[a]): List[b] & ef = match xs {
    case Nil     => Nil
    case x :: rs => f(x) :: map(f, rs)
}`}
                </CodeBlock>

            </Section>
        )
    }

}

export default Lists
