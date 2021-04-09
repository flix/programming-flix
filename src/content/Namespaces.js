import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import Warning from "../components/Warning";

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

                    <Editor flix={this.props.flix}>
                        {`namespace Math {
    def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <p>
                        Namespaces are hierarchical, so we can declare a deeper namespace:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`namespace Core/Math {
    def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <p>
                        Note that the fragments of a namespace are separated by <Code>/</Code>.
                    </p>

                    <p>
                        We can nest namespaces freely. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`namespace Core {
    namespace Math {
        
        def sum(x: Int, y: Int): Int = x + y    
        
        namespace Stats {
            def median(xs: List[Int]): Int = ???
        }
    }
}`}
                    </Editor>

                </SubSection>

                <SubSection name="Using Definitions from a Namespace">

                    <p>
                        We can refer to definitions from a namespace by their fully-qualified name. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Int = Core/Math.sum(21, 42)

namespace Core/Math {
    pub def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <Warning>
                        We must declare <Code>sum</Code> as public (<Code>pub</Code>) to allow access to it from outside
                        its own namespace.
                    </Warning>

                    <p>
                        It can quickly get tedious to refer to definitions by their fully-qualified name.
                    </p>

                    <p>
                        The <Code>use</Code> construct allows us to "import" definitions from another namespace:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Int = 
    use Core/Math.sum;
    sum(21, 42)

namespace Core/Math {
    pub def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <p>
                        Here the <Code>use</Code> is local to the <Code>main</Code> function. A <Code>use</Code> can
                        also appear at the top of a file:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`use Core/Math.sum;

def main(): Int = 
    sum(21, 42)

namespace Core/Math {
    pub def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                </SubSection>

                <SubSection name="Using Multiple Definitions from a Namespaces">

                    <p>
                        We can use multiple definitions from a namespace:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`use Core/Math.sum;
use Core/Math.mul;

def main(): Int = 
    sum(21, mul(42, 84))

namespace Core/Math {
    pub def sum(x: Int, y: Int): Int = x + y
    pub def mul(x: Int, y: Int): Int = x * y
}`}
                    </Editor>

                    <p>
                        Multiple such uses can be grouped together:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`use Core/Math.{sum, mul};

def main(): Int = 
    sum(21, mul(42, 84))

namespace Core/Math {
    pub def sum(x: Int, y: Int): Int = x + y
    pub def mul(x: Int, y: Int): Int = x * y
}`}
                    </Editor>

                    <DesignNote>
                        Flix does not support <i>wildcard</i> uses. We may add this in the future, but for the moment we
                        feel that there are significant ambiguity issues.
                    </DesignNote>

                </SubSection>

                <SubSection name="Avoiding Name Clashes with Renaming">

                    <p>
                        We can use renaming to avoid name clashes between identically named definitions. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`use A.{concat => stringConcat};
use B.{concat => listConcat};

def main(): String = 
    stringConcat("Hello", " World!")

namespace A {
    pub def concat(x: String, y: String): String = x + y
}

namespace B {
    pub def concat(xs: List[Int], ys: List[Int]): List[Int] = xs ::: ys
}`}
                    </Editor>

                    <p>
                        Note: In many cases a better approach is to use a <i>local</i> <Code>use</Code> to avoid the
                        problem in the first place.
                    </p>

                </SubSection>

                <SubSection name="Using Types from a Namespace">

                    <p>
                        We can use types from a namespace in the same way as definitions. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`use A/B.Color;

def main(): Color = Color.Red

namespace A/B {
    pub enum Color {
        case Red, Blu
    }
}`}
                    </Editor>

                    <p>
                        We can also use <i>opaque types</i> and <i>type aliases</i> in the same way:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`use A/B.Color;
use A/B.Hue;

def main(): Hue = Color.Blu

namespace A/B {
    pub enum Color {
        case Red, Blu
    }
    type alias Hue = Color
}`}
                    </Editor>

                </SubSection>

                <SubSection name="Using Enums from a Namespace">

                    <p>
                        We can use enumerated types from a namespace. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool = 
  use A/B.Color.{Red, Blu};
  Red != Blu

namespace A/B {
    pub enum Color {
        case Red, Blu
    }
}`}
                    </Editor>

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
