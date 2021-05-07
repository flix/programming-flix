import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import CodeBlock from "../util/CodeBlock";

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

                <p>In Flix, top-level functions are defined with the <Code>def</Code> keyword. For example: </p>

                <CodeBlock>
                    {`def add(x: Int32, y: Int32): Int32 = x + y + 1`}
                </CodeBlock>

                <p>
                    A function definition consists of the function name followed by an argument list, the return type,
                    and the function body. Although Flix supports type inference, top-level function definitions
                    must declare the type of their arguments and their return type.
                </p>

                <p>
                    In Flix all function arguments and local variables must be used. If a function argument is not used
                    it must be prefixed with an underscore to explicitly mark it as unused.
                </p>

                <SubSection name="First-Class and Higher-Order Functions">

                    <p>
                        A <i>higher-order function</i> is a function that takes a parameter which is itself a function.
                        For example:
                    </p>

                    <CodeBlock>
                        {`def twice(f: Int32 -> Int32, x: Int32): Int32 = f(f(x))`}
                    </CodeBlock>

                    <p>
                        Here the <Code>twice</Code> function takes two arguments, a function <Code>f</Code> and an
                        integer <Code>x</Code>, and applies <Code>f</Code> to <Code>x</Code> two times.
                    </p>

                    <p>
                        We can pass a lambda expression to the <Code>twice</Code> function:
                    </p>

                    <CodeBlock>
                        {`twice(x -> x + 1, 42)`}
                    </CodeBlock>

                    <p>
                        which evaluates to <Code>44</Code> since <Code>42</Code> is incremented twice.
                    </p>

                    <p>
                        The syntax for lambda expressions that take more than one argument is straightforward:
                    </p>

                    <CodeBlock>
                        {`def twice(f: (Int32, Int32) -> Int32, x: Int32): Int32 = f(f(x, x), f(x, x))`}
                    </CodeBlock>

                    <p>
                        which can be called as follows:
                    </p>

                    <CodeBlock>
                        {`twice((x, y) -> x + y, 42)`}
                    </CodeBlock>

                    <p>
                        We can call a higher-order function with a top-level function as follows:
                    </p>

                    <CodeBlock>
                        {`def inc(x: Int32): Int32 = x

def twice(f: Int32 -> Int32, x: Int32): Int32 = f(f(x))

twice(inc, 42)`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Function Composition">

                    <p>
                        The Flix library supports several operators for function composition and pipelining:
                    </p>

                    <CodeBlock>
                        {`let f = x -> x + 1;
let g = x -> x * 2;
let h = f >> g;     // equivalent to x -> g(f(x))`}
                    </CodeBlock>

                    <p>
                        Here <Code>&gt;&gt;</Code> is forward function composition.
                    </p>

                    <p>
                        We can also write function applications using the pipeline operator:
                    </p>

                    <CodeBlock>
                        {`List.range(1, 100) |>
List.filter(x -> x % 2 == 0) |>
List.map(x -> x * x) |>
println;`}
                    </CodeBlock>

                    <p>
                        Here <Code>x |> f</Code> is equivalent to the function application <Code>f(x)</Code>.
                    </p>

                </SubSection>

                <SubSection name="Curried by Default">

                    <p>
                        Flix functions are curried by default. A curried function can be called with fewer arguments
                        than it declares returning a new function that takes the remainder of the arguments. For
                        example:
                    </p>

                    <CodeBlock>
                        {`def sum(x: Int32, y: Int32): Int32 = x + y

def main(_args: Array[String]): Int32 & Impure =
    let inc = sum(1);
    inc(42) |> println;
    0
`}
                    </CodeBlock>

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

                    <CodeBlock>
                        {`def main(_args: Array[String]): Int32 & Impure =
    List.range(1, 100) |> 
    List.map(x -> x + 1) |> 
    println;
    0`}
                    </CodeBlock>

                    <p>
                        Here the call to <Code>List.map</Code> passes the function <Code>x -> x +
                        1</Code> which <i>returns</i> a new function that expects a list argument. This list argument is
                        then supplied by the pipeline operator <Code>|></Code> which, in this case, expects a list and a
                        function that takes a list.
                    </p>

                </SubSection>

            </Section>)
    }
}

export default Functions
