import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Code from "../components/Code";
import CodeBlock from "../util/CodeBlock";
import {Table} from "reactstrap";

class Effects extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Effects";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Polymorphic Effects">

                <p>
                    The Flix type and effect system separates pure and impure expressions. A pure expression is
                    guaranteed to be referentially transparent. A pure function always returns the same value when
                    given the same argument(s) and cannot have any (observable) side-effects.
                </p>

                <p>
                    For example, the following expression is of type <Code>Int32</Code> and is <Code>Pure</Code>:
                </p>

                <CodeBlock>{`1 + 2 : Int32 & Pure`}</CodeBlock>

                <p>
                    whereas the following expression is <Code>Impure</Code>:
                </p>

                <CodeBlock>
                    {`println("Hello World") : Unit \ IO`}
                </CodeBlock>

                <p>
                    A higher-order function can specify that a function argument must be pure, impure, or that it is
                    effect polymorphic.
                </p>

                <p>
                    For example, the definition of <Code>Set.exists</Code> requires that its function
                    argument <Code>f</Code> is pure:
                </p>

                <CodeBlock>
                    {`// The syntax a -> Bool is short-hand for a -> Bool & Pure
def exists(f: a -> Bool, s: Set[a]): Bool = ...`}
                </CodeBlock>

                <p>
                    The requirement that <Code>f</Code> must be pure ensures that implementation details do not leak.
                    For example, since <Code>f</Code> is pure it cannot be used to determine in what order the elements
                    of the set are traversed. If <Code>f</Code> was impure such details could leak, e.g. by passing a
                    function that also prints the current element, revealing the internal element order inside the set.
                </p>

                <p>
                    The type and effect system is sound, but not complete. That is, if a function is pure then it cannot cause
                    an effect, whereas if a function is impure then it may, but does not necessarily, cause an effect. For
                    example, the following expression is impure even though it cannot produce an effect at run-time:
                </p>

                <CodeBlock>
                    {`if (1 == 2) println("Hello World!") else ()`}
                </CodeBlock>

                <p>
                    A higher-order function can also be effect polymorphic: its effect(s) can depend on its argument(s).
                </p>

                <p>
                    For example, the standard library definition of <Code>List.map</Code> is effect polymorphic:
                </p>

                <CodeBlock>
                    {`def map(f: a -> b & ef, xs: List[a]): List[b] & ef`}
                </CodeBlock>

                <p>
                    The <Code>List.map</Code> function takes a function <Code>f</Code> from elements of
                    type <Code>a</Code> to <Code>b</Code> with effect <Code>ef</Code>. The effect of
                    the function itself is <Code>ef</Code>. Consequently, if <Code>List.map</Code> is invoked with a
                    pure function then the entire expression is pure whereas if it is invoked with an impure function
                    then the entire expression is impure. It is effect polymorphic.
                </p>

                <p>
                    A higher-order function that takes multiple function arguments may combine their effects.
                </p>

                <p>
                    For example, the standard library definition of forward function composition <Code>{`>>`}</Code> is
                    pure if both its function arguments are pure:
                </p>

                <CodeBlock>
                    {`def >>(f: a -> b & ef1, g: b -> c & ef2): a -> c & (ef1 and ef2) = x -> g(f(x))`}
                </CodeBlock>

                <p>
                    The type and effect signature can be understood as follows: The {`>>`} function takes two function
                    arguments: <Code>f</Code> with effect <Code>ef1</Code> and <Code>g</Code> with
                    effect <Code>ef2</Code>. The effect of {`>>`} is effect polymorphic in the conjunction
                    of <Code>ef1</Code> and <Code>ef2</Code>. If both are pure (their effect is true) then the overall
                    expression is pure (true). Otherwise it is impure.
                </p>

                <p>
                    The type and effect system allows arbitrary boolean expressions to control the purity of function
                    arguments.
                </p>

                <p>
                    For example, it is possible to express a higher-order function <Code>h</Code> that accepts two
                    function arguments <Code>f</Code> and <Code>g</Code> of which at most one is impure:
                </p>

                <CodeBlock>
                    {`def h(f: a -> b & ef1, g: b -> c & (not ef1 or ef2)): Unit`}
                </CodeBlock>

                <p>
                    Note that here <Code>ef1</Code> and <Code>ef2</Code> are arbitrary boolean variables
                    which are not directly associated with the effect of <Code>f</Code> or <Code>g</Code>
                    (like it was the case in the simpler example above). In general, the
                    possible effects for argument functions and the to-be-defined function are described
                    by arbitrary boolean expressions. Here the possible effects of <Code>g</Code>  
                    (whether it can be pure or impure) are specified by the boolean expression <Code>not
                    ef1 or ef2</Code>. For a specific combination of pure and impure arguments to be
                    accepted, there must be an assignment of the boolean variables <Code>ef1</Code> and  
                    <Code> ef2</Code> to true and false such that the boolean expressions for pure
                    arguments evaluate to true and those for impure arguments evaluate to false.
                </p>

                <p>
                    If in this example <Code>h</Code> is called with a function argument <Code>f </Code>
                    which is impure, then the variable <Code>ef1</Code> must be false and thus the
                    second argument must be pure (because <Code>not ef1 or ef2</Code> will always be
                    true, no matter how we choose <Code>ef2</Code>). Conversely, if <Code>f</Code> is
                    pure, then <Code>ef1</Code> must be true and <Code>g</Code> may be pure
                    (<Code>ef2=true</Code>) or impure (<Code>ef2=false</Code>). It is a compile-time
                    error to call <Code>h</Code> with two impure functions.
                </p>

                <p>
                    The type and effect system can be used to ensure that statement expressions are useful, i.e. that if
                    an expression or function is evaluated and its result is discarded then it must have a side-effect.
                    For example, compiling the program fragment below:
                </p>

                <CodeBlock>
                    {`List.map(x -> x + 1, 1 :: 2 :: Nil);
123`}
                </CodeBlock>

                <p>
                    causes a compiler error:
                </p>

                <CodeBlock>
                    {`-- Redundancy Error -------------------------------------------------- ???

>> Useless expression: It has no side-effect(s) and its result is discarded.

2 |     List.map(x -> x + 1, 1 :: 2 :: Nil);
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        useless expression.


Possible fixes:

  (1)  Use the result computed by the expression.
  (2)  Remove the expression statement.
  (3)  Introduce a let-binding with a wildcard name.`}
                </CodeBlock>

                <p>
                    because it is non-sensical to evaluate the pure
                    expression <Code>{`List.map(x -> 2 * x, 1 :: 2 :: Nil)`}</Code> and
                    then to discard its result. Most likely the programmer wanted to use the result (or alternatively
                    the expression is redundant and could be deleted). Consequently, Flix rejects such programs.
                </p>

                <p>
                    In summary, Flix function types are of the form:
                </p>

                <Table>
                    <thead>
                    <tr>
                        <th style={{"width": "50%"}}>Function Type</th>
                        <th>Syntax</th>
                        <th>Short Hand</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>The type of a <i>pure</i> function from <Code>a</Code> to <Code>b</Code>.</td>
                        <td><Code>a -> b & Pure</Code></td>
                        <td><Code>a -> b</Code></td>
                    </tr>
                    <tr>
                        <td>The type of an <i>effect polymorphic</i> function from <Code>a</Code> to <Code>b</Code> with
                            effect <Code>ef</Code>.
                        </td>
                        <td><Code>a -> b & ef</Code></td>
                        <td>n/a</td>
                    </tr>
                    <tr>
                        <td>The type of an <i>effect polymorphic</i> function from <Code>a</Code> to <Code>b</Code> with
                            effect <Code>ef1 and ef2</Code> (i.e. pure if both <Code>ef1</Code> and <Code>ef2</Code> are
                            true.)
                        </td>
                        <td><Code>a -> b & (ef1 and ef2)</Code></td>
                        <td>n/a</td>
                    </tr>
                    </tbody>
                </Table>

            </Section>
        )
    }

}

export default Effects
