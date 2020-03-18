import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";

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

                <SubSection name="Using Namespaces">

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



            </Section>
        )
    }
}

export default Namespaces
