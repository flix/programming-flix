import React from 'react'
import Code from "../components/Code";
import Editor from "../components/Editor";

class Namespaces extends React.Component {

    render() {
        return (
            <section>
                <h1>Namespaces and Visibility</h1>

                <p>
                    Flix supports a simple namespace mechanism similar to packages allowing definitions and types to
                    share the same names provided that they belong to different namespaces. By default, every
                    declaration is the root namespace. We can use the <Code>namespace</Code> keyword to organize
                    definitions and types. Namespaces must be uppercase. For example <Code>List</Code> is a valid
                    namespace. To access a member of a namespace, we use the dot, e.g. <Code>List.map</Code> refers to
                    the <Code>map</Code> function inside the <Code>List</Code> namespace. Namespaces may nested. A
                    nested namespace is separated by slashes, e.g. <Code>A.B.C</Code>.
                </p>

                <p>For example, we can create two namespaces called <Code>A</Code> and <Code>B</Code>:</p>

                <Editor runProgram={this.props.runProgram} lines={9}>
                    {`namespace A {
    pub def one(): Int = 1
}

namespace B {
    pub def two(): Int = 2
}


def f(): Int = A.one() + B.two()`}
                </Editor>

                <p>
                    The function <Code>one</Code> resides in the namespace <Code>A</Code> whereas the
                    function <Code>two</Code> resides in the namespace <Code>B</Code>. We can access the former by
                    writing <Code>A.one()</Code> and the latter by writing <Code>B.two()</Code>. However,
                    functions are by default <i>private</i> to their namespace. In order for a function to be accessed
                    outside its own namespace (or a child namespace) it must be marked public with
                    the <Code>pub</Code> access modifier.
                </p>




            </section>
        )
    }

}

export default Namespaces;
