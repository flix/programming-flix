import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Code from "../components/Code";
import CodeBlock from "../util/CodeBlock";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";

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
                        An array literal is of the form <Code>[e1, e2, ... en]</Code>. For example, the expression:
                    </p>

                    <CodeBlock>{`[1, 2, 3, 4]`}</CodeBlock>

                    <p>
                        evaluates to an array with the four elements: <Code>1, 2, 3, 4</Code>.
                    </p>

                    <p>
                        In some cases we want to allocate a large array filled with the same value.
                        For example, the expression:
                    </p>

                    <CodeBlock>{`["Hello World"; 100]`}</CodeBlock>

                    <p>
                        evaluates to an array of size 100 where every entry contains the string <Code>"Hello
                        World"</Code>.
                    </p>

                    <DesignNote>
                        It is not possible to allocate an array without assigning a value to each entry.
                    </DesignNote>

                </SubSection>

                <SubSection name="Reading and Writing from Arrays">

                    <p>
                        Arrays can be accessed and updated using standard syntax. For example:
                    </p>

                    <CodeBlock>{`let a = [0; 10];
a[0] = 21;
a[1] = 42;
a[0] + a[1]`}</CodeBlock>

                    <p>evaluates to <Code>63</Code>, as expected.</p>

                </SubSection>

                <SubSection name="Array Slicing">

                    <p>
                        TBD
                    </p>

                </SubSection>

            </Section>
        )
    }

}

export default Arrays
