import React from 'react'
import Code from '../components/Code';
import Editor from '../util/Editor';

class Functions extends React.Component {
    render() {
        return (
            <section>
                <h1>Functions and Higher-Order Functions</h1>

                <p>
                    Functions and higher-order functions are unsurprisingly key components of any functional language.
                </p>

                <p>In Flix, we define functions a the top-level using the <Code>def</Code> keyword. For example, </p>

                <Editor flix={this.props.flix}>
                    {`def inc(x: Int): Int = x + 1
def main(): Int = inc(42)`}
                </Editor>

                <p>
                    A function definition consists of the function name, here <Code>inc</Code>, followed by an argument
                    list, the function return type, and the function body. Although Flix supports full type inference,
                    top-level function definitions must declare the type of their arguments and their return type.
                </p>

                <h2>First-class Functions</h2>


                <h2>Higher-Order Functions</h2>


                <h2>Currying</h2>

                <p>
                    Functions in Flix are curried by default. A curried function can be called with fewer arguments than
                    it declares returning a new function that takes the remainder of the arguments. For example:
                </p>

                <Editor flix={this.props.flix}>
                    {`def sum(x: Int, y: Int): Int = x + y
def main(): Int =
    let inc = sum(1);
        inc(42)`}
                </Editor>

                <p>
                    Here the <Code>sum</Code> function takes two arguments, <Code>x</Code> and <Code>y</Code>, but it is
                    only invoked with one argument inside <Code>f</Code>. This invocation returns a new function which
                    is similar to <Code>sum</Code>, except that inside this function <Code>x</Code> is always bound
                    to <Code>1</Code>. Hence, when <Code>inc</Code> is later invoked, it returns <Code>43</Code>.
                </p>

                <p>
                    Currying is very useful in many functional programming patterns. For example, consider
                    the <Code>List.map</Code> function. This function takes two arguments, a function of type <Code>a ->
                    b</Code> and a list of type <Code>List[a]</Code>, and returns a <Code>List[b]</Code> obtained by
                    applying the function to every element of the list. Now, if we combine currying with the pipeline
                    operator <Code>|></Code> we are able to write:
                </p>

                <Editor flix={this.props.flix}>
                    def main(): List[Int] = List.range(1, 10) |> List.map(x -> x + 1)
                </Editor>

                <p>
                    Here the call to <Code>List.map</Code> passes the function <Code>x -> x +
                    1</Code> which <i>returns</i> a new function that excepts a list argument. This list argument is
                    then supplied by the pipeline operator <Code>|></Code> which, in this case, expects a list and a
                    function that takes a list.
                </p>



            </section>)
    }
}

export default Functions
