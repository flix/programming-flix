import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import CodeBlock from "../util/CodeBlock";
import DesignNote from "../components/DesignNote";

class Functions extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Functions";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Functions and Higher-Order Functions">

                <p>
                    Functions and higher-order functions are the key building block of a functional programming
                    language.
                </p>

                <p>In Flix, top-level functions are defined with the <Code>def</Code> keyword. For example: </p>

                <CodeBlock>
                    {`def add(x: Int32, y: Int32): Int32 = x + y + 1`}
                </CodeBlock>

                <p>
                    A definition consists of the function name followed by an argument list, the return type, and the
                    function body. Although Flix supports type inference, top-level function definitions must declare
                    the type of their arguments and their return type.
                </p>

                <p>
                    In Flix, all function arguments and local variables must be used. If a function argument is not used
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
                        We can also define a higher-order function that requires a function which takes two arguments:
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
                        {`def inc(x: Int32): Int32 = x + 1

def twice(f: Int32 -> Int32, x: Int32): Int32 = f(f(x))

twice(inc, 42)`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Function Type Syntax">
                    <p>
                        Depending on the number of arguments to a function, the syntax for 
                        the function type differs:
                    </p>

                    <CodeBlock>
                        {`Unit -> Int32    // For nullary functions
                        Int32 -> Int32   // For unary functions
                        (Int32, Int32, ...) -> Int32 // For the rest
                        `}
                     </CodeBlock>
                </SubSection>

                <SubSection name="Function Composition">

                    <p>
                        Flix supports several operators for function composition and pipelining:
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
List.filter(x -> x mod 2 == 0) |>
List.map(x -> x * x) |>
println;`}
                    </CodeBlock>

                    <p>
                        Here <Code>x |> f</Code> is equivalent to the function application <Code>f(x)</Code>.
                    </p>

                </SubSection>

                <SubSection name="Curried by Default">

                    <p>
                        Functions are curried by default. A curried function can be called with fewer arguments
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

                <SubSection name="Pure, Impure, and Effect Polymorphic Functions">

                    <p>
                        In Flix every function is pure, impure, or effect polymorphic.
                    </p>

                    <p>
                        The Flix type and effect system ensures that a pure function always returns the same result when
                        given the same arguments and that it cannot have (observable) side effects.
                    </p>

                    <p>
                        In Flix every function definition is <i>implicitly</i> marked as <Code>Pure</Code>. For example,
                        the function definition:
                    </p>

                    <CodeBlock>{`def add(x: Int32, y: Int32): Int32 = x + y`}</CodeBlock>

                    <p>
                        is actually equivalent to:
                    </p>

                    <CodeBlock>{`def add(x: Int32, y: Int32): Int32 & Pure = x + y`}</CodeBlock>

                    <p>
                        A function that prints to the console is <Code>Impure</Code> and must be marked as such:
                    </p>

                    <CodeBlock>{`def addAndPrint(x: Int32, y: Int32): Int32 & Impure = 
    let r = x + y;
    println(r);
    r`}</CodeBlock>

                    <p>
                        since the type signature of the library function <Code>println</Code> specifies that it
                        is <Code>Impure</Code>.
                    </p>

                    <p>
                        The purity (or impurity) of a higher-order function may depend on the purity of its argument(s).
                        For example, whether <Code>List.map</Code> is pure or impure depends on whether function we map
                        is pure or impure. Fortunately Flix can model such behavior using <i>effect polymorphism</i>.
                        For example:
                    </p>

                    <CodeBlock>
                        {`def map(f: a -> b & e, l: List[a]): List[b] & e = ...`}
                    </CodeBlock>

                    <p>
                        here the signature of <Code>map</Code> captures that if the function argument <Code>f</Code> has
                        type <Code>a -&gt; b</Code> with effect <Code>e</Code> then the effect
                        of <Code>map</Code> itself is <Code>e</Code>. This means that if <Code>map</Code> is called
                        with a pure (resp. impure) function argument then the overall expression is pure (resp. impure).
                        For example:
                    </p>

                    <CodeBlock>
                        {`List.map(x -> x + 123, l)    // pure
List.map(x -> println(x), l) // impure`}
                    </CodeBlock>

                    <DesignNote>
                        The Flix standard library enforces several program invariants using purity. For example, in
                        Flix, the <Code>Eq</Code> and <Code>Order</Code> type classes require that their operations are
                        pure. This ensures that collections, such as lists, sets, and maps, do not leak internal
                        implementation details.
                    </DesignNote>

                </SubSection>

            </Section>)
    }
}

export default Functions
