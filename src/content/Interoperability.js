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
                    YBD
                </SubSection>

                <SubSection name="Reading Object Fields">
                    TBD
                </SubSection>

                <SubSection name="Writing Object Fields">
                    TBD
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
