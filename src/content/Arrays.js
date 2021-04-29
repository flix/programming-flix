import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Code from "../components/Code";
import CodeBlock from "../util/CodeBlock";
import SubSection from "../components/SubSection";

class Arrays extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Arrays";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Arrays">

                <p>
                    Flix supports arrays like most programming languages. Flix recommends the use of immutable
                    data structures such as immutable lists, sets, and maps. However, in specific situations, the use
                    of arrays may be required for performance reasons. For example, the Flix Datalog engine uses arrays
                    internally while exposing a purely functional interface. We recommend this style of architecture,
                    where the use of arrays is hidden as from the programmer.
                </p>

                <p>
                    Flix uses monomorphization and consequently primitive arrays are not boxed. For example,
                    the representation of <Code>Array[Int32]</Code> is very compact and efficient.
                </p>

                <p>
                    All array operations are impure. As such, all functions that use arrays must be marked
                    as <Code>Impure</Code> or be casted to <Code>Pure</Code>. (TBD)
                </p>

                <SubSection name="Array Literals">

                    <p>
                        An array literal is of the form <Code>[e1, e2, ... en]</Code>. For example:
                    </p>

                    <CodeBlock>{`[1, 2, 3]`}</CodeBlock>

                </SubSection>



            </Section>
        )
    }

}

export default Arrays
