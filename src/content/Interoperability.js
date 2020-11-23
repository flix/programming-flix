import React from 'react'
import ReactGA from 'react-ga';

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import {Link} from "react-router-dom";
import Warning from "../components/Warning";
import {Table} from "reactstrap";

class Interoperability extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Interoperability";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Interoperability">

                <p>
                    Flix supports interoperability with Java libraries through imports.
                    The <Code>import</Code> construct allows a Java constructor, method, or field to be exposed as an
                    impure Flix function.
                </p>

                <p>
                    Note: The <Code>import</Code> mechanism should not be confused with the <Code>use</Code> mechanism.
                    The former enables interoperability with Java, whereas the latter is part of the Flix <Link
                    to="/namespaces/">namespace</Link> mechanism.
                </p>

                <SubSection name="Creating Objects">

                    <p>
                        We can use imports to retrieve the constructor of a Java class and then call its associated
                        function to construct a new Java object. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): ##java.io.File & Impure =
    import new java.io.File(String) as newFile;
    newFile("helloworld.txt")`}
                    </Editor>

                    <p>
                        Here we import the constructor of the <Code>java.io.File</Code> class and give it the local
                        name <Code>newFile</Code>. The <Code>newFile</Code> function takes a string argument and returns
                        a fresh Java <Code>File</Code> object. The type of this object is written
                        as <Code>##java.io.File</Code> where the two hashes <Code>##</Code> designate that it is a Java
                        type. Constructing a fresh object is impure, hence <Code>main</Code> is marked
                        as <Code>Impure</Code>.
                    </p>

                    <DesignNote>
                        At the moment all Java types must be fully-qualified. This may change in the future.
                    </DesignNote>

                    <p>
                        The <Code>java.io.File</Code> class has another constructor that takes two arguments: one for
                        parent pathname and one for the child pathname. We can use this constructor as follows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): ##java.io.File & Impure =
    import new java.io.File(String, String) as newFile;
    newFile("text", "helloworld.txt")`}
                    </Editor>

                    <p>
                        The import describes the signature of the constructor. We can use this to import any
                        constructor (or method), even if the constructor (or method) is overloaded, as in the above
                        example. The return type is never part of the constructor (or method) signature since it is
                        uniquely determined by the argument types.
                    </p>

                </SubSection>

                <SubSection name="Invoking Object Methods">

                    <p>
                        We can use the import mechanism to invoke methods on objects. For example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new java.io.File(String) as newFile;
    import java.io.File.exists();
    let file = newFile("helloworld.txt");
    exists(file)`}
                    </Editor>

                    <p>
                        Note that in this case the method is imported without an <Code>as</Code> clause, hence its local
                        name is simply the Java local name: <Code>exists</Code>. Note that Java methods (and fields)
                        with names that are illegal as Flix names must be imported with the <Code>as</Code> clause using
                        a legal Flix name. For example, a non-idiomatic Java method may start with an uppercase letter,
                        whereas a Flix function must start with a lowercase letter.
                    </p>

                    <p>
                        We can use uniform function call syntax (UFCS) to get a Java-style look and feel:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new java.io.File(String) as newFile;
    import java.io.File.exists();
    let file = newFile("helloworld.txt");
    file.exists()`}
                    </Editor>

                    <p>
                        Or, since <Code>newFile</Code> and <Code>exists</Code> are simply functions, we can also use a
                        more functional style:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new java.io.File(String) as newFile;
    import java.io.File.exists();
    newFile("helloworld.txt") |> exists`}
                    </Editor>

                    <p>
                        All Java operations are marked as impure since Java is an impure language. If you call a
                        function which you know to be pure, you can cast it from impure to pure, as the following
                        example shows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`pub def startsWith(s1: String, s2: String): Bool =
    import java.lang.String.startsWith(String);
    s1.startsWith(s2) as & Pure`}
                    </Editor>

                    <p>
                        We can pass arguments to methods as the following example shows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`pub def charAt(i: Int, s: String): Char =
    import java.lang.String.charAt(Int32);
    s.charAt(i) as & Pure`}
                    </Editor>

                    <p>
                        Type signatures should use Flix type names and not Java type names for primitive types.
                        For example, if a Java method takes a <Code>Double</Code> its signature should use the Flix
                        type <Code>Float64</Code>. Similarly, if a Java method takes a <Code>Boolean</Code> its
                        signature should use the Flix type <Code>Bool</Code>.
                    </p>

                </SubSection>

                <SubSection name="Reading Object Fields">

                    <p>
                        Reading a field of an object is straightforward:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new flix.test.TestClass() as newObject;
    import get flix.test.TestClass.boolField as getField;
    let o = newObject();
    o.getField() == true`}
                    </Editor>

                    <p>
                        Here we assume that <Code>TestClass</Code> is a Java class with an instance field
                        named <Code>boolField</Code> of type <Code>Bool</Code>.
                    </p>


                </SubSection>

                <SubSection name="Writing Object Fields">

                    <p>
                        Writing a field of an object is also straightforward:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new flix.test.TestClass() as newObject;
    import get flix.test.TestClass.boolField as getField;
    import set flix.test.TestClass.boolField as setField;
    let o = newObject();
    o.setField(false);
    getField(o) == false`}
                    </Editor>

                </SubSection>

                <SubSection name="Invoking Static Methods">

                    <p>
                        We can invoke a <i>static</i> method using syntax almost identical to the syntax for object
                        method invocation. We simply use a colon <Code>:</Code> (instead of a period) to separate the
                        class name from the static method name:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import java.lang.String:valueOf(Bool);
    valueOf(true) == "true"`}
                    </Editor>

                    <p>
                        Note that the fully-qualified name <Code>java.lang.String:valueOf</Code> includes a
                        colon <Code>:</Code> to indicate that the reference is to a <i>static</i> method.
                    </p>

                </SubSection>

                <SubSection name="Reading and Writing Static Fields">

                    <p>
                        Reading or writing <i>static</i> fields is similar to reading or reading object fields. For
                        example:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import get java.lang.Integer:MIN_VALUE as getMinValue;
    getMinValue() == Int32.minValue()`}
                    </Editor>

                    <p>
                        As above, the only difference is to use a colon <Code>:</Code> to indicate that the
                        reference is to a static field.
                    </p>

                </SubSection>

                <SubSection name="Summary">

                    <p>
                        The table below gives an overview of the syntax:
                    </p>

                    <Table>
                        <thead>
                        <tr>
                            <th>Import</th>
                            <th>Syntax</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Constructor</td>
                            <td><Code>import new Foo.Bar.Baz(...)</Code></td>
                        </tr>
                        <tr>
                            <td>Object Method</td>
                            <td><Code>import Foo.Bar.baz(...) [as name]</Code></td>
                        </tr>
                        <tr>
                            <td>Static Method</td>
                            <td><Code>import Foo.Bar:baz(...) [as name]</Code></td>
                        </tr>
                        <tr>
                            <td>Get Object Field</td>
                            <td><Code>import get Foo.Bar.baz as getValue</Code></td>
                        </tr>
                        <tr>
                            <td>Set Object Field</td>
                            <td><Code>import set Foo.Bar.baz as setValue</Code></td>
                        </tr>
                        <tr>
                            <td>Get Static Field</td>
                            <td><Code>import get Foo.Bar:baz as getValue</Code></td>
                        </tr>
                        <tr>
                            <td>Set Static Field</td>
                            <td><Code>import set Foo.Bar:baz as setValue</Code></td>
                        </tr>
                        </tbody>
                    </Table>
                </SubSection>

                <SubSection name="Limitations">

                    <p>
                        Flix does not currently support any of the following features:

                        <ul>
                            <li>Defining new classes (or interfaces).</li>
                            <li>Defining new anonymous classes (e.g. to implement a Java interface).</li>
                        </ul>

                        If any of these features are needed, we recommend that you write a small Java wrapper.
                    </p>

                    <DesignNote>
                        The import mechanism is only supported at the expression level: it is not currently possible to
                        import Java constructors, methods, and fields at the top-level.
                    </DesignNote>

                    <DesignNote>
                        The Flix type system does not support sub-typing. Consequently, a sub-type is type incompatible
                        with a super-type. For example, <Code>##java.lang.String</Code> is not compatible
                        with <Code>##java.lang.Object</Code>. This limitation can be overcome by inserting
                        explicit type casts. For example, <Code>e as ##java.lang.Object</Code> can be used to cast the
                        type of <Code>e</Code> to <Code>Object</Code>.
                    </DesignNote>

                    <Warning>
                        The Flix compiler does not support any kind of cross-compilation (e.g. compiling Java sources
                        together with Flix sources). Furthermore, the format of the JVM bytecode generated by the Flix
                        compiler is not yet stable. If you write a library in Flix and use it from Java, you should be
                        prepared for breakages with future versions of the Flix compiler.
                    </Warning>

                </SubSection>

            </Section>
        )
    }

}

export default Interoperability
