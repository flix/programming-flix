import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import CodeBlock from "../util/CodeBlock";
import Code from "../components/Code";
import SubSubSection from "../components/SubSubSection";
import DesignNote from "../components/DesignNote";

class TipsAndTricks extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Tips & Tricks";
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <Section name="Tips &amp; Tricks">

                <p>
                    This page documents a few features that make Flix code easier to read and write.
                </p>

                <SubSection name="Main">

                    <p>
                        The entry point of any Flix program is the <Code>main</Code> function which <i>must</i> have the
                        signature:
                    </p>

                    <CodeBlock>
                        {`def main(args: Array[String]): Int32 & Impure = ...`}
                    </CodeBlock>

                    <p>
                        That is, the main function (i) takes an array of string arguments, (ii) must return
                        an <Code>Int32</Code> which represents the exit code, and (iii) must be <Code>Impure</Code>.
                    </p>

                    <p>
                        Flix does not allow unused function arguments. Thus, if the arguments are not needed the
                        parameter name must be prefixed with an underscore:
                    </p>

                    <CodeBlock>
                        {`def main(_args: Array[String]): Int32 & Impure = ...`}
                    </CodeBlock>

                    <p>
                        Flix requires main to be <Code>Impure</Code>. If main was pure there would be no reason to run
                        the program. Typically the impurity requirement is satisfied because main prints to the console
                        or has another side-effect.
                    </p>

                </SubSection>

                <SubSection name="Printing to the Standard Out">

                    <p>
                        The Flix prelude defines two impure functions: <Code>print</Code> and <Code>println</Code> that
                        can be used to print a string to standard out.
                        For example:
                    </p>

                    <CodeBlock>
                        {`println("Hello World")`}
                    </CodeBlock>

                    <p>
                        The <Code>println</Code> function prints with a newline after the string.
                        The <Code>print</Code> function can be used to print without this newline.
                        For example:
                    </p>

                    <CodeBlock>
                        {`let name = "Lucky Luke"
print("Hello");
print(" ");
println(name)`}
                    </CodeBlock>

                    <p>
                        which prints <Code>Hello Lucky Luke</Code> on one line.
                    </p>

                    <p>
                        The <Code>print</Code> and <Code>println</Code> functions can print any value whose type
                        implements <Code>ToString</Code> type class and consequently can be converted to
                        a <Code>String</Code>. For example:
                    </p>

                    <CodeBlock>
                        {`let o = Some(123);
let l = 1 :: 2 :: 3;
println(o);
println(l)`}
                    </CodeBlock>

                    <p>
                        The <Code>print</Code> and <Code>println</Code> functions are rightfully <Code>Impure</Code>.
                        Consequently they cannot be called from a pure context. This can sometimes hinder debugging of a
                        pure function where you want to log some intermediate computation. For this purpose Flix
                        provides
                        two unsafe variants named <Code>Unsafe.print</Code> and <Code>Unsafe.println</Code> which are
                        considered pure by the type system. Here is an example:
                    </p>

                    <CodeBlock>
                        {`def sum(x: Int32, y: Int32): Int32 = 
    let _ = Unsafe.println(x);
    let _ = Unsafe.println(y);
    x + y`}
                    </CodeBlock>

                    <p>
                        Note that <Code>sum</Code> remains a pure function despite the two calls
                        to <Code>Unsafe.println</Code>. Moreover, since the call <Code>Unsafe.println(x)</Code> is pure
                        we must introduce a let-binding with an unused variable to prevent Flix from rejecting the
                        program due to a redundant pure computation.
                    </p>

                </SubSection>

                <SubSection name="String Interpolation">

                    <p>
                        Flix strings support interpolation. Inside a string the
                        form <Code>{"${e}"}</Code> evaluates <Code>e</Code> to a value and converts it to a string using
                        the <Code>ToString</Code> type class. For example:
                    </p>

                    <CodeBlock>
                        {`let fstName = "Lucky";
let lstName = "Luke";
"Hello Mr. \${lstName}. Do you feel \${lstName}, punk?"`}
                    </CodeBlock>

                    <p>
                        String interpolation works for any types that implements a <Code>ToString</Code> instance. For
                        example:
                    </p>

                    <CodeBlock>
                        {`let i = 123;
let o = Some(123);
let l = 1 :: 2 :: 3 :: Nil;
"i = \${i}, o = \${o}, l = \${l}"`}
                    </CodeBlock>

                    <p>
                        String interpolations may contain arbitrary expressions. For example:
                    </p>

                    <CodeBlock>
                        {`let x = 1;
let y = 2;
"\${x + y + 1}"`}
                    </CodeBlock>

                    <p>
                        String interpolation is the preferred way to concatenate two strings:
                    </p>

                    <CodeBlock>
                        {`let x = "Hello";
let y = "World";
"\${x}\${y}" // equivalent to x + y`}
                    </CodeBlock>

                    <p>
                        String interpolation is the preferred way to convert a value to a string:
                    </p>

                    <CodeBlock>
                        {`let o = Some(123);
"\${o}"`}
                    </CodeBlock>

                    <p>
                        which is equivalent to an explicit use of the <Code>toString</Code> function from
                        the <Code>ToString</Code> type class:
                    </p>

                    <CodeBlock>
                        {`ToString.toString(o)`}
                    </CodeBlock>

                    <p>
                        String interpolators may nest, but this is strongly discouraged.
                    </p>

                </SubSection>

                <SubSection name="Pipelines">

                    <p>
                        Flix supports the pipeline operator <Code>|></Code> which is simply a prefix version of function
                        application (i.e. the argument appears before the function).
                    </p>

                    <p>
                        The pipeline operator can often be used to make functional code more readable. For example:
                    </p>

                    <CodeBlock>{`let l = 1 :: 2 :: 3 :: Nil;
l |> 
List.map(x -> x * 2) |>
List.filter(x -> x < 4) |>  
List.count`}</CodeBlock>

                    <p>
                        Here is another example:
                    </p>

                    <CodeBlock>{`"Hello World" |> String.toUpperCase |> println`}</CodeBlock>

                </SubSection>

                <SubSection name="Shorthand for Enum Declarations">

                    <p>
                        A typical enum may look like:
                    </p>

                    <CodeBlock>{`enum Weekday {
    case Monday,
    case Tuesday,
    case Wednesday,
    case Thursday,
    case Friday,
    case Saturday,
    case Sunday
}`}</CodeBlock>

                    <p>
                        The same enum can also be declared as:
                    </p>

                    <CodeBlock>{`enum Weekday {
    case Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}`}</CodeBlock>

                    <p>
                        This shorthand syntax is always available, but should only be used for simple enums.
                    </p>

                </SubSection>

                <SubSection name="Let Pattern Match">

                    <p>
                        In addition to the pattern <Code>match</Code> construct, a let-binding can be used to destruct a
                        value. For example:
                    </p>

                    <CodeBlock>{`let (x, y, z) = (1, 2, 3)`}</CodeBlock>

                    <p>
                        Binds the variables <Code>x</Code>, <Code>y</Code>, and <Code>z</Code> to the
                        values <Code>1</Code>, <Code>2</Code>, and <Code>3</Code>, respectively.
                    </p>

                    <p>
                        Any exhaustive pattern may be used in a let-binding. For example:
                    </p>

                    <CodeBlock>{`let (x, Foo(y, z)) = (1, Foo(2, 3))`}</CodeBlock>

                    <p>
                        is legal provided that the <Code>Foo</Code> constructor belongs to a type where it is the only
                        constructor.
                    </p>

                    <p>
                        The following let-bindings are <i>illegal</i> because they are not exhaustive:
                    </p>

                    <CodeBlock>
                        {`let (1, 2, z) = ...
let Some(x) = ...`}
                    </CodeBlock>

                    <p>
                        The Flix compiler will reject such non-exhaustive patterns.
                    </p>

                </SubSection>

                <SubSection name="Match Lambdas">

                    <p>
                        Pattern matches can also be used with lambda expressions.
                        For example:
                    </p>

                    <CodeBlock>
                        {`List.map(match (x, y) -> x + y, (1, 1) :: (2, 2) :: Nil)`}
                    </CodeBlock>

                    <p>
                        is equivalent to:
                    </p>

                    <CodeBlock>
                        {`List.map(w -> match w { case (x, y) => x + y }, (1, 1) :: (2, 2) :: Nil)`}
                    </CodeBlock>

                    <p>
                        As for let-bindings, such pattern matches must be exhaustive.
                    </p>

                    <p>
                        Note the difference between the two lambda expressions:
                    </p>

                    <CodeBlock>
                        {`let f = (x, y, z) -> x + y + z + 42i32
let g = match (x, y, z) -> x + y + z + 42i32`}
                    </CodeBlock>

                    <p>
                        Here <Code>f</Code> is a function that expects <i>three</i> <Code>Int32</Code> arguments,
                        whereas <Code>g</Code> is a function that expects <i>one</i> three tuple <Code>(Int32, Int32,
                        Int32)</Code> argument.
                    </p>

                </SubSection>

                <SubSection name="Infix Application">

                    <p>
                        Flix supports infix function application by enclosing the function name in backticks.
                        For example:
                    </p>

                    <CodeBlock>{`123 \`sum\` 456`}</CodeBlock>

                    <p>
                        is equivalent to the normal function call:
                    </p>

                    <CodeBlock>{`sum(123, 456)`}</CodeBlock>

                </SubSection>

                <SubSection name="Built-in Literals">

                    <p>Flix has built-in syntactic sugar for lists, sets, and maps.</p>

                    <SubSubSection name="List Literals">

                        <p>
                            A list literal is written using the infix <Code>::</Code> constructor.
                            For example:
                        </p>

                        <CodeBlock>{`1 :: 2 :: 3 :: Nil`}</CodeBlock>

                        <p>
                            which is syntactic sugar for:
                        </p>

                        <CodeBlock>{`Cons(1, Cons(2, Cons(3, Nil)))`}</CodeBlock>

                    </SubSubSection>

                    <SubSubSection name="Set Literals">

                        <p>
                            A set literal is written using the notation <Code>{`Set#{v1, v2, ...}`}</Code>.
                            For example:
                        </p>

                        <CodeBlock>{`Set#{1, 2, 3}`}</CodeBlock>

                        <p>
                            which is syntactic sugar for:
                        </p>

                        <CodeBlock>{`Set.insert(1, Set.insert(2, Set.insert(3, Set.empty())))`}</CodeBlock>

                    </SubSubSection>

                    <SubSubSection name="Map Literals">

                        <p>
                            A map literal is written using the notion <Code>{`Map#{k1 => v1, k2 => v2, ...}`}</Code>.
                            For example:
                        </p>

                        <CodeBlock>{`Map#{1 => "Hello", 2 => "World"}`}</CodeBlock>

                        <p>
                            which is syntactic sugar for:
                        </p>

                        <CodeBlock>{`Map.insert(1, "Hello", Map.insert(2, "World", Map.empty()))`}</CodeBlock>

                    </SubSubSection>

                </SubSection>

                <SubSection name="Let* (Do-notation)">

                    <p>
                        Flix supports a feature similar to <i>do-notation</i> in Haskell
                        and <i>for-comprehensions</i> in Scala.
                    </p>

                    <p>
                        The following monadic code:
                    </p>

                    <CodeBlock>{`use Option.flatMap;
let o1 = Some(21);
let o2 = Some(42);
flatMap(x -> flatMap(y -> Some(x + y), o2), o1)`}</CodeBlock>

                    <p>
                        May be expressed more concisely as:
                    </p>

                    <CodeBlock>{`use Option.flatMap;
let* o1 = Some(21);
let* o2 = Some(42);
Some(x + y) `}</CodeBlock>

                    <p>
                        where each <Code>let*</Code> corresponds to a <Code>flatMap</Code> use.
                    </p>

                    <DesignNote>
                        This feature is experimental and subject to change.
                    </DesignNote>

                </SubSection>

                <SubSection name="Anonymous and Named Holes">

                    <p>
                        During development, Flix encourages the use of holes for incomplete code.
                        For example:
                    </p>

                    <CodeBlock>{`def sum(x: Int, y: Int): Int = ???`}</CodeBlock>

                    <p>
                        The triple question marks <Code>???</Code> represents an anonymous hole and can be used wherever
                        an expression is expected. In the above code, <Code>???</Code> represents a missing function
                        body, but it can also be used inside an expression. For example:
                    </p>

                    <CodeBlock>{`def length(l: List[a]): Int = match l {
  case Nil     => 0
  case x :: xs => ???
}`}</CodeBlock>

                    <p>
                        When a program has multiple holes, it can be useful to name them. For example:
                    </p>

                    <CodeBlock>{`def length(l: List[a]): Int = match l {
  case Nil     => ?base
  case x :: xs => ?step
}`}</CodeBlock>

                    <p>
                        Flix requires that each named hole has a unique name.
                    </p>

                </SubSection>

                <SubSection name="bug! and unreachable!">

                    <p>
                        Flix supports two special "functions": <Code>bug!</Code> and <Code>unreachable!</Code> that can
                        be used to indicate when an internal program invariant is broken and execute should abort.
                    </p>

                    <p>
                        For example:
                    </p>

                    <CodeBlock>{`match o {
  case Some(x) => ...
  case None    => bug!("The value of \`o\` cannot be empty.")
}`}</CodeBlock>

                    <p>
                        As another example:
                    </p>

                    <CodeBlock>{`match n {
  case n if n == 0 => ...
  case n if n >= 0 => ...
  case n if n <= 0 => ...
  case n           =>  unreachable!()
}`}</CodeBlock>

                    <p>
                        Use of <Code>bug!</Code> and <Code>unreachable!</Code> should be avoided whenever possible.
                    </p>

                </SubSection>

                <SubSection name="Type Ascriptions">

                    <p>
                        While Flix supports local type inference, it can sometimes be useful to annotate an
                        expression or a let-binding with its type. We call such annotations for <i>type
                        ascriptions</i>. A type ascription cannot change the type of an expression nor can it be
                        used to violate type safety.
                    </p>

                    <p>
                        A type ascription can be placed after an expression:
                    </p>

                    <CodeBlock>{`("Hello" :: "World" :: Nil) : List[String]`}</CodeBlock>

                    <p>
                        and it can also be placed on a let-binding:
                    </p>

                    <CodeBlock>{`let l: List[String] = "Hello" :: "World" :: Nil`}</CodeBlock>

                </SubSection>

                <SubSubSection name="Type Casts">

                    <p>
                        A cast subverts the type system by changing the type of an expression. Casts are by their
                        nature dangerous and should be used with caution.
                    </p>

                    <p>
                        The following cast changes the type of an expression and triggers
                        a <Code>ClassCastException</Code> at run-time:
                    </p>

                    <CodeBlock>{`(123, 456) as String`}</CodeBlock>

                    <p>
                        A cast can also change the effect of an expression. Such casts are safer, but should
                        still be used with caution.
                    </p>

                    <p>
                        For example, we can cast an impure expression to a pure expression:
                    </p>

                    <CodeBlock>{`Console.println("Hello World") as Unit & Pure`}</CodeBlock>

                    <p>
                        As a short-hand, we can simply write:
                    </p>

                    <CodeBlock>{`Console.println("Hello World") as & Pure`}</CodeBlock>

                    <p>
                        Casting an impure expression to a pure expression is safe if the expression respects
                        equational reasoning.
                    </p>

                </SubSubSection>

            </Section>
        )
    }

}

export default TipsAndTricks
