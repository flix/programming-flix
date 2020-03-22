import React from 'react'
import ReactGA from 'react-ga';

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";

class Interoperability extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Interoperability";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Interoperability">

                <p>
                    Flix supports interoperability with Java through the <Code>import</Code> mechanism. The import
                    mechanism allow us to locally refer to a Java constructor, method, or field.
                </p>

                <SubSection name="Creating Objects">

                    <p>
                        We can create a new Java object of a given class as follows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): ##java.io.File & Impure =
    import new java.io.File(String) as newFile;
    newFile("helloworld.txt")`}
                    </Editor>

                    <p>
                        Here we import the constructor of the <Code>java.io.File</Code> class and give it the local
                        name <Code>newFile</Code>. <Code>newFile</Code> is an impure function that takes
                        a <Code>String</Code> and returns a Java <Code>File</Code> object. The return type
                        of <Code>main</Code> is such a file object which is indicated by the Java
                        type <Code>java.io.File</Code>.
                    </p>

                    <DesignNote>
                        At the moment all Java types must be fully-qualified. This may be simplified in the future.
                    </DesignNote>

                    <p>
                        The <Code>java.io.File</Code> class has another construct that takes two arguments: one for
                        parent pathname and one for the child pathname. We can use this constructor as follows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): ##java.io.File & Impure =
    import new java.io.File(String, String) as newFile;
    newFile("text", "helloworld.txt")`}
                    </Editor>

                    <p>
                        All interoperability constructs are impure, since Java is an impure language. If you call a
                        function which you know to be pure, you can cast it from impure to pure, as the following
                        example shows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`pub def startsWith(s1: String, s2: String): Bool =
    import java.lang.String.startsWith(String);
    s1.startsWith(s2) as & Pure`}
                    </Editor>

                </SubSection>

                <SubSection name="Invoking Object Methods">

                    <p>
                        We can invoke methods on objects:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new java.io.File(String) as newFile;
    import java.io.File.exists();
    let file = newFile("helloworld.txt");
    exists(file)`}
                    </Editor>

                    <p>
                        We can use uniform function call syntax (UFCS) to get a familiar feel:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new java.io.File(String) as newFile;
    import java.io.File.exists();
    let file = newFile("helloworld.txt");
    file.exists()`}
                    </Editor>

                    <p>
                        Or, since <Code>newFile</Code> and <Code>exists</Code> are ordinary functions, we can use a more
                        functional style:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def main(): Bool & Impure =
    import new java.io.File(String) as newFile;
    import java.io.File.exists();
    newFile("helloworld.txt") |> exists`}
                    </Editor>

                    <p>
                        We can pass arguments to methods as the following example shows:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`pub def charAt(i: Int, s: String): Char =
    import java.lang.String.charAt(Int32);
    s.charAt(i) as & Pure`}
                    </Editor>

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
                    TBD
                </SubSection>

                <SubSection name="Reading Static Fields">
                    TBD
                </SubSection>

                <SubSection name="Writing Static Fields">
                    TBD
                </SubSection>

            </Section>
        )
    }

}

export default Interoperability
