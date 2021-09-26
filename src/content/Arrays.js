import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Code from "../components/Code";
import CodeBlock from "../util/CodeBlock";
import SubSection from "../components/SubSection";
import DesignNote from "../components/DesignNote";
import Warning from "../components/Warning";

class Arrays extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Arrays";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Arrays">

                <p>
                    While Flix recommends the use of immutable data structures (such as immutable lists, sets, and
                    maps), mutable arrays may be useful for performance critical code.
                </p>

                <p>
                    We recommend that arrays are used sparingly and that when possible their use is hidden as an
                    implementation detail. For example, the Flix Datalog engine uses arrays internally but exposes
                    a functional (immutable) interface.
                </p>

                <p>
                    Flix uses monomorphization and consequently primitive arrays are not boxed. For example,
                    the representation of an <Code>Array[Int32]</Code> is compact and efficient.
                </p>

                <p>
                    All operations on arrays are impure. As such, all functions that use arrays must be marked
                    as <Code>Impure</Code> or be casted to <Code>Pure</Code>. (Accessing the length of an array
                    is pure since the size of an array cannot change after it has been created.)
                </p>

                <p>
                    Arrays should only be used for low-level code. The <Code>MutList</Code> data structure, available
                    in the standard library, provides a mutable, dynamically-expanding data structure similar to
                    <Code>java.util.ArrayList</Code>. Its implementation is backed by an array that is dynamically
                    resized and it provides amortized O(1) push operations.
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
                        In some cases it is useful to allocate a large array filled with the same value.
                        The expression:
                    </p>

                    <CodeBlock>{`["Hello World"; 100]`}</CodeBlock>

                    <p>
                        evaluates to an array of length 100 where every entry contains the string <Code>"Hello
                        World"</Code>.
                    </p>

                    <DesignNote>
                        Flix does not allow the allocation of an array without assigning a "default value" to
                        each entry in the array.
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
                        Arrays can be sliced. Slicing an array (shallowly) copies a subrange of the array.
                        For example:
                    </p>

                    <CodeBlock>{`let a = [1, 2, 3, 4, 5];
a[2..4]
`}</CodeBlock>

                    <p>
                        evaluates to the array <Code>[3, 4]</Code>.
                    </p>

                    <p>
                        The start or end index may be omitted. For example:
                    </p>

                    <CodeBlock>{`let a = [1, 2, 3, 4, 5];
let a1 = a[2..]; // evaluates to [3, 4, 5]
let a2 = a[..4]  // evaluates to [1, 2, 3, 4]`}</CodeBlock>

                    <p>
                        If both the start and end index are omitted the entire array is copied. For example:
                    </p>

                    <CodeBlock>{`let a = [1, 2, 3, 4, 5];
a[..]`}</CodeBlock>

                    <p>
                        evaluates to the (copied) array <Code>[1, 2, 3, 4, 5]</Code>.
                    </p>

                    <DesignNote>
                        Slicing an array using the same start and end index returns the empty array.
                        For example, <Code>[0, 1, 2, 3][2..2]</Code> evaluates to <Code>[]</Code>.
                    </DesignNote>

                    <Warning>
                        Slicing with negative indices is undefined and results in runtime errors.
                    </Warning>

                </SubSection>

                <SubSection name="Array Length">

                    <p>
                        The length of an array is accessed as follows:
                    </p>

                    <CodeBlock>{`let a = [1, 2, 3, 4, 5];
a.length`}</CodeBlock>

                    <p>
                        which evaluates to <Code>5</Code>.
                    </p>

                </SubSection>

            </Section>
        )
    }

}

export default Arrays
