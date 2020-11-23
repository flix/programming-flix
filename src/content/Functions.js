import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";

class Functions extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Functions";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Functions and Higher-Order Functions">

                <p>
                    Functions and higher-order functions are the key building block of any functional programming
                    language.
                </p>

                <p>In Flix, we can define a top-level function with <Code>def</Code> keyword. For example: </p>

                <Editor flix={this.props.flix}>
                    {`def inc(x: Int): Int = x + 1
def main(): Int = inc(42)`}
                </Editor>

                <p>
                    A function definition consists of the function name followed by an argument list, the return type,
                    and the function body. Although Flix supports type inference, top-level function definitions
                    must declare the type of their arguments and their return type.
                </p>

                <SubSection name="First-Class and Higher-Order Functions">

                    <p>
                        A <i>higher-order function</i> is a function that takes a parameter which is itself a function.
                        For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def twice(f: Int -> Int, x: Int): Int = f(f(x))
def main(): Int = twice(x -> x + 1, 42)`}
                    </Editor>

                    <p>
                        Here the <Code>twice</Code> function takes two arguments, a function <Code>f</Code> and an
                        integer <Code>x</Code>, and applies <Code>f</Code> to <Code>x</Code> two times.
                        The <Code>main</Code> method passes the <i>lambda expression</i> <Code>x
                        -> x + 1</Code> to <Code>twice</Code> along with the number <Code>42</Code> to produce the
                        result <Code>44</Code>.
                    </p>

                    <p>
                        The syntax for lambda expressions that take more than one argument is straightforward:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def twice(f: (Int, Int) -> Int, x: Int): Int = f(f(x, x), f(x, x))
def main(): Int = twice((x, y) -> x + y, 42)`}
                    </Editor>

                    <p>
                        We can also call a higher-order function passing a top-level function. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def inc(x: Int): Int = x
def twice(f: Int -> Int, x: Int): Int = f(f(x))
def main(): Int = twice(inc, 42)`}
                    </Editor>

                    <p>
                        Programming with first-class and higher-order functions is extremely common.
                    </p>

                </SubSection>

                <SubSection name="Function Composition">

                    <p>
                        The Flix library supports several operators for function composition and pipelining:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Int =
    let f = x -> x + 1;
    let g = x -> x * 2;
    let h = f >> g; // equivalent to x -> g(f(x))
    let j = f << g; // equivalent to x -> f(g(x))
    h(1) + j(1)`}
                    </Editor>

                    <p>
                        Here <Code>&gt;&gt;</Code> is reverse function composition and <Code>&lt;&lt;</Code> is regular
                        composition.
                    </p>

                    <p>
                        We can also write function application in a pipeline-style:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Int =
    let f = x -> x + 1;
    1 |> f`}
                    </Editor>

                    <p>
                        Here <Code>x |> f</Code> is equivalent to the function application <Code>f(x)</Code>.
                    </p>

                    <p>
                        Here is why <Code>|></Code> is called the pipeline operator:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool =
    1 |> (x -> x + 1)
      |> (x -> x * 2)
      |> (x -> x == 4)`}
                    </Editor>

                </SubSection>

                <SubSection name="Curried by Default">

                    <p>
                        Functions in Flix are curried by default. A curried function can be called with fewer arguments
                        than it declares returning a new function that takes the remainder of the arguments. For
                        example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def sum(x: Int, y: Int): Int = x + y
def main(): Int =
    let inc = sum(1);
        inc(42)`}
                    </Editor>

                    <p>
                        Here the <Code>sum</Code> function takes two arguments, <Code>x</Code> and <Code>y</Code>, but
                        it is only called with one argument inside <Code>main</Code>. This call returns a new function
                        which is similar to <Code>sum</Code>, except that in this function <Code>x</Code> is always
                        bound to <Code>1</Code>. Hence when <Code>inc</Code> is called with <Code>42</Code> it
                        returns <Code>43</Code>.
                    </p>

                    <p>
                        Currying is useful in many programming patterns. For example, consider
                        the <Code>List.map</Code> function. This function takes two arguments, a function of type <Code>a
                        -> b</Code> and a list of type <Code>List[a]</Code>, and returns a <Code>List[b]</Code> obtained
                        by applying the function to every element of the list. Now, if we combine currying with the
                        pipeline operator <Code>|></Code> we are able to write:
                    </p>

                    <Editor flix={this.props.flix}>
                        def main(): List[Int] = List.range(1, 10) |> List.map(x -> x + 1)
                    </Editor>

                    <p>
                        Here the call to <Code>List.map</Code> passes the function <Code>x -> x +
                        1</Code> which <i>returns</i> a new function that expects a list argument. This list argument is
                        then supplied by the pipeline operator <Code>|></Code> which, in this case, expects a list and a
                        function that takes a list.
                    </p>

                </SubSection>

                <SubSection name="Uniform Function Call Syntax">

                    <p>
                        Flix supports <a href="https://en.wikipedia.org/wiki/Uniform_Function_Call_Syntax">uniform
                        function call syntax (UFCS)</a> which allows a function call <Code>f(a, b, c)</Code> to be
                        written as <Code>a.f(b, c)</Code> emulating an "object-oriented" syntax. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def inc(x: Int): Int = x + 1
def main(): Int = 42.inc()`}
                    </Editor>

                    <p>
                        We can also pass additional arguments to the call. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def add(x: Int, y: Int): Int = x + y
def main(): Int = 42.add(43)`}
                    </Editor>

                </SubSection>

            </Section>)
    }
}

export default Functions
