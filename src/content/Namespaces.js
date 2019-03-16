import React from 'react'
import Code from "../components/Code";
import Editor from '../util/Editor';
import PlannedFeature from "../components/PlannedFeature";
import DesignNote from "../components/DesignNote";
import Section from "../components/Section";

class Namespaces extends React.Component {

    render() {
        return (
            <Section name="Namespaces and Visibility">
                <p>
                    Flix supports a simple namespace mechanism similar to packages allowing definitions and types to
                    share the same names provided that they belong to different namespaces. Namespaces are not modules,
                    classes, or modules. By default, every
                    declaration is the root namespace. We can use the <Code>namespace</Code> keyword to organize
                    definitions and types. Namespaces must be uppercase. For example <Code>List</Code> is a valid
                    namespace. To access a member of a namespace, we use the dot, e.g. <Code>List.map</Code> refers to
                    the <Code>map</Code> function inside the <Code>List</Code> namespace. Namespaces may nested. A
                    nested namespace is separated by slashes, e.g. <Code>A.B.C</Code>.
                </p>

                <p>For example, we can create two namespaces called <Code>A</Code> and <Code>B</Code>:</p>

                <Editor flix={this.props.flix}>
                    {`namespace A {
    pub def one(): Int = 1
}

namespace B {
    pub def two(): Int = 2
}

def main(): Int = A.one() + B.two()`}
                </Editor>

                <p>
                    The function <Code>one</Code> resides in the namespace <Code>A</Code> whereas the
                    function <Code>two</Code> resides in the namespace <Code>B</Code>. We can access the former by
                    writing <Code>A.one()</Code> and the latter by writing <Code>B.two()</Code>. However,
                    functions are by default <i>private</i> to their namespace. In order for a function to be accessed
                    outside its own namespace (or a child namespace) it must be marked public with
                    the <Code>pub</Code> access modifier.
                </p>

                <p>
                    We can nest namespaces as follows:
                </p>

                <Editor flix={this.props.flix}>
                    {`namespace A {
    namespace B {
        namespace C {
            pub def one(): Int = 1
        }
    }
}

def main(): Int = A/B/C.one()`}
                </Editor>

                <p>
                    This is equivalent to the simpler and preferred style:
                </p>

                <Editor flix={this.props.flix}>
                    {`namespace A/B/C {
    pub def one(): Int = 1
}

def main(): Int = A/B/C.one()`}
                </Editor>

                <p>
                    It is considered good style to have source files followed the same structure as the namespace
                    structure.
                </p>

                <DesignNote>
                    We made declarations non-public by default to help programmers make conscious decisions about what
                    declarations should be part of the public API of a namespace.
                </DesignNote>

                <PlannedFeature>
                    Flix does not currently support any import mechanism. This feature is planned.
                </PlannedFeature>

            </Section>
        )
    }

}

export default Namespaces;
