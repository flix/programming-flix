import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";

class Namespaces extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Namespaces";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Namespaces">

                <p>
                    Flix supports a standard hierarchy namespace mechanism.
                </p>

                <SubSection name="Declaring a Namespace">

                    <p>
                        We can declare a namespace and nest definitions and types within it. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`namespace Math {
    def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <p>
                        Namespaces are hierarchical, so we can declare a richer structure of namespaces. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`namespace Core/Math {
    def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <p>
                        Note that namespaces are separated by <code>/</code> like paths.
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

                <SubSection name="Using a Namespace">

                    <p>
                        We can refer to elements of a namespace by its fully-qualified name. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Int = Core/Math.sum(21, 42)

namespace Core/Math {
    pub def sum(x: Int, y: Int): Int = x + y
}`}
                    </Editor>

                    <p>
                        Note that the <code>sum</code> definition was declared public to allow access to it from outside
                        the namespace.
                    </p>

                    <p>
                        We can <code>use</code> definitions and types that belong to a namespace. For example:
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
                        Here the use is local to the function. We can also use namespaces for an entire
                        file. For example:
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

                <SubSection name="Using Multiple Elements from a Namespaces">

                    <p>
                        We can use multiple elements from a namespace:
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
                        feel there are significantly ambiguity issues, which we wish to avoid.
                    </DesignNote>

                </SubSection>

                <SubSection name="Avoiding Name Clashes with Renaming">

                    <p>
                        We can use renaming to avoid potential name clashes. For example:
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
                        Note: A better approach might be to use a local <code>use</code> avoiding the problem in
                        the first place.
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
                        We can use <i>opaque types</i> and <i>type aliases</i> in the same way:
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



            </Section>
        )
    }
}

export default Namespaces
