import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import CodeBlock from "../util/CodeBlock";

class Namespaces extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Namespaces";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Namespaces">

                <p>
                    Flix supports hierarchical namespaces as known from many other programming languages.
                </p>

                <SubSection name="Declaring a Namespace">

                    <p>
                        We can declare a namespace to nest definitions and types within it. For example:
                    </p>

                    <CodeBlock>
                        {`namespace Math {
    def sum(x: Int32, y: Int32): Int32 = x + y
}`}
                    </CodeBlock>

                    <p>
                        Namespaces are hierarchical, so we can declare a deeper namespace:
                    </p>

                    <CodeBlock>
                        {`namespace Core/Math {
    def sum(x: Int32, y32: Int): Int32 = x + y
}`}
                    </CodeBlock>

                    <p>
                        Note that the fragments of a namespace are separated by <Code>/</Code>.
                    </p>

                    <p>
                        We can freely nest namespaces. For example:
                    </p>

                    <CodeBlock>
                        {`namespace Core {
    namespace Math {
        
        def sum(x: Int32, y: Int32): Int32 = x + y    
        
        namespace Stats {
            def median(xs: List[Int32]): Int32 = ???
        }
    }
}`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Using Definitions from a Namespace">

                    <p>
                        We can refer to definitions from a namespace by their fully-qualified name. For example:
                    </p>

                    <CodeBlock>
                        {`namespace Core/Math {
    pub def sum(x: Int32, y: Int32): Int32 = x + y
}

def main(_args: Array[String]): Int32 & Impure = Core/Math.sum(21, 42) |> println; 0`}
                    </CodeBlock>

                    <p>
                        Note that we must declare <Code>sum</Code> as public (<Code>pub</Code>) to allow access to it
                        from outside its own namespace.
                    </p>

                    <p>
                        It can quickly get tedious to refer to definitions by their fully-qualified name.
                    </p>

                    <p>
                        The <Code>use</Code> construct allows us to "import" definitions from another namespace:
                    </p>

                    <CodeBlock>
                        {`namespace Core/Math {
    pub def sum(x: Int32, y: Int32): Int32 = x + y
}

def main(_args: Array[String]): Int32 & Impure = 
    use Core/Math.sum;
    sum(21, 42) |> println; 
    0`}
                    </CodeBlock>

                    <p>
                        Here the <Code>use</Code> is local to the <Code>main</Code> function. A <Code>use</Code> can
                        also appear at the top of a file:
                    </p>

                    <CodeBlock>
                        {`use Core/Math.sum;

def main(_args: Array[String]): Int32 & Impure = 
    sum(21, 42) |> println; 
    0
    
namespace Core/Math {
    pub def sum(x: Int32, y: Int32): Int32 = x + y
}
`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Using Multiple Definitions from a Namespaces">

                    <p>
                        We can also use multiple definitions from a namespace:
                    </p>

                    <CodeBlock>
                        {`use Core/Math.sum;
use Core/Math.mul;

def main(_args: Array[String]): Int32 & Impure = 
    sum(21, mul(42, 84)) |> println;
    0

namespace Core/Math {
    pub def sum(x: Int32, y: Int32): Int32 = x + y
    pub def mul(x: Int32, y: Int32): Int32 = x * y
}`}
                    </CodeBlock>

                    <p>
                        Multiple such uses can be grouped together:
                    </p>

                    <CodeBlock>
                        {`use Core/Math.{sum, mul};

def main(_args: Array[String]): Int32 & Impure = 
    sum(21, mul(42, 84)) |> println;
    0

namespace Core/Math {
    pub def sum(x: Int32, y: Int32): Int32 = x + y
    pub def mul(x: Int32, y: Int32): Int32 = x * y
}`}
                    </CodeBlock>

                    <DesignNote>
                        Flix does not support <i>wildcard</i> uses because they are inherently ambiguous and may lead to
                        subtle errors during refactoring.
                    </DesignNote>

                </SubSection>

                <SubSection name="Avoiding Name Clashes with Renaming">

                    <p>
                        We can use renaming to avoid name clashes between identically named definitions. For example:
                    </p>

                    <CodeBlock>
                        {`use A.{concat => stringConcat};
use B.{concat => listConcat};

def main(_args: Array[String]): Int32 & Impure = 
    stringConcat("Hello", " World!") |> println;
    0

namespace A {
    pub def concat(x: String, y: String): String = x + y
}

namespace B {
    pub def concat(xs: List[Int32], ys: List[Int32]): List[Int32] = xs ::: ys
}`}
                    </CodeBlock>

                    <p>
                        Note: In many cases a better approach is to use a <i>local</i> <Code>use</Code> to avoid the
                        problem in the first place.
                    </p>

                </SubSection>

                <SubSection name="Using Types from a Namespace">

                    <p>
                        We can use types from a namespace in the same way as definitions. For example:
                    </p>

                    <CodeBlock>
                        {`use A/B.Color;

def redColor(): Color = Color.Red

namespace A/B {
    pub enum Color {
        case Red, Blue
    }
}`}
                    </CodeBlock>

                    <p>
                        We can also use <i>opaque types</i> and <i>type aliases</i> in the same way:
                    </p>

                    <CodeBlock>
                        {`use A/B.Color;
use A/B.Hue;

def blueColor(): Hue = Color.Blue

namespace A/B {
    pub enum Color {
        case Red, Blue
    }
    type alias Hue = Color
}`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Using Enums from a Namespace">

                    <p>
                        We can use enumerated types from a namespace. For example:
                    </p>

                    <CodeBlock>
                        {`def blueIsRed(): Bool = 
  use A/B.Color.{Blue, Red};
  Blue != Red

namespace A/B {
    pub enum Color {
        case Red, Blue
    }
}`}
                    </CodeBlock>

                    <p>
                        Note that <Code>A/B.Color</Code> is the fully-qualified name of
                        a <i>type</i> whereas <Code>{"A/B.Color.Red"}</Code> is the fully-qualified name of
                        a <i>tag</i> inside an enumerated type. That is, a fully-qualified definition is of the
                        form <Code>A/B/C.d</Code>, a fully-qualified type is of the
                        form <Code>A/B/C.D</Code>, and finally a fully-qualified tag is of the
                        form <Code>A/B/C.D.T</Code>.
                    </p>

                </SubSection>

            </Section>
        )
    }
}

export default Namespaces
