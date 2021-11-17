import React from 'react'
import ReactGA from 'react-ga';

import Section from "../components/Section";
import Code from "../components/Code";
import CodeBlock from "../util/CodeBlock";
import SubSection from "../components/SubSection";

class Records extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Records";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Records">

                <p>
                    Flix supports row polymorphic extensible records.
                </p>

                <p>
                    Flix records are immutable (but may contain mutable reference cells).
                </p>

                <SubSection name="Record Literals">

                    <p> A record literal is written with curly braces: </p>

                    <CodeBlock>{`{ x = 1, y = 2 }`}</CodeBlock>

                    <p>
                        which has the record type <Code>{`{ x :: Int32, y :: Int32 }`}</Code>.
                    </p>

                    <p>
                        The order of fields in a record does not matter, hence the above record is equivalent to the
                        record:
                    </p>

                    <CodeBlock>{`{ y = 2, x = 1 }`}</CodeBlock>

                    <p>
                        which has the record type <Code>{`{ y :: Int32, x :: Int32 }`}</Code>. This type is equivalent
                        to the record type <Code>{`{ x :: Int32, y :: Int32 }`}</Code>. That is, the order of fields
                        within a record type do not matter.
                    </p>

                </SubSection>

                <SubSection name="Field Access">

                    <p>
                        We can access the field of a record using the dot:
                    </p>

                    <CodeBlock>{`let p = { x = 1, y = 2 };
p.x + p.y`}</CodeBlock>

                    <p>
                        The Flix type system ensures that we cannot access a field that does not exist.
                    </p>

                    <p>
                        Records are immutable. A record, once constructed, cannot have the values of any of its fields
                        changed.
                    </p>

                </SubSection>

                <SubSection name="Field Update">

                    <p>
                        While records are immutable, we can construct a new record with an updated field value:
                    </p>

                    <CodeBlock>{`let p1 = { x = 1, y = 2 };
let p2 = { x = 3 | p1 };
p1.x + p2.x`}</CodeBlock>

                    <p>
                        The expression <Code>{`{ x = 3 | p1 }`}</Code> updates the record <Code>p1</Code> with a new
                        value of its <Code>x</Code> field. Note that updating a field requires that the field exists on
                        the record (!) A record cannot be <i>updated</i> with a new field, but it can
                        be <i>extended</i> with a new field, as we shall see later.
                    </p>

                </SubSection>

                <SubSection name="Record Extension">

                    <p>
                        We can add a new field to an existing record as follows:
                    </p>

                    <CodeBlock>{`let p1 = { x = 1, y = 2 };
let p2 = { +z = 3 | p1 };
p1.x + p1.y + p2.z`}</CodeBlock>

                    <p>
                        Here the expression <Code>{`{ +z = 3 | p1 }`}</Code> extends the record <Code>p1</Code> with a
                        new field <Code>z</Code> such that the result has three fields: <Code>x</Code>, <Code>y</Code>,
                        and <Code>z</Code> all of which are of <Code>Int32</Code> type.
                    </p>

                </SubSection>

                <SubSection name="Record Restriction">

                    <p>
                        Similarly to record extension, we can also remove a field from a record:
                    </p>

                    <CodeBlock>{`let p1 = { x = 1, y = 2 };
let p2 = { -y | p1 };`}</CodeBlock>

                    <p>
                        Here the record <Code>p2</Code> has the same fields as <Code>p1</Code> except
                        that the <Code>y</Code> field has been removed.
                    </p>

                </SubSection>

                <SubSection name="Row Polymorphism: Open and Closed Records">

                    <p>
                        A function may specify that it requires a record with two fields:
                    </p>

                    <CodeBlock>{`def f(r: {x :: Int32, y :: Int32}): Int32 = r.x + r.y`}</CodeBlock>

                    <p>
                        We can call this function with the
                        records <Code>{`{ x = 1, y = 2 }`}</Code> and <Code>{`{ y = 2, x = 1 }`}</Code>, but
                        we <i>cannot</i> call it with the record <Code>{`{ x = 1, y = 2, z = 3 }`}</Code> since the
                        signature of <Code>f</Code> demands a record with <i>exactly</i> two
                        fields: <Code>x</Code> and <Code>y</Code>. We say that the
                        record <Code>r</Code> is <i>closed</i>.
                    </p>

                    <p>
                        We can lift this restriction by using row polymorphism:
                    </p>

                    <CodeBlock>{`def g(r: {x :: Int32, y :: Int32 | s}): Int32 = r.x + r.y`}</CodeBlock>

                    <p>
                        We can call this function with <i>any</i> record as long as it
                        has <Code>x</Code> and <Code>y</Code> fields which are of type <Code>Int32</Code>. We say that
                        the record type of <Code>r</Code> is <i>open</i>.
                    </p>

                </SubSection>

                <SubSection name="Named Parameters with Records">
                    <p>
                        When a function has multiple parameters that share the same type,
                        it is easy to get confused about the right argument order.
                        For example, what does <Code>String.contains("Hello", "Hello World")</Code> return?
                        What does <Code>String.contains("Hello World", "Hello")</Code> return?
                    </p>

                    <p>
                        A common solution to this problem is to use <i>named parameters</i>.
                        Flix supports a form of named parameters building on records.
                        For example, we can write a function translate to translate from one language to another as follows:
                    </p>

                    <CodeBlock>{`def translate(from: {from :: Language}, to: {to :: Language}, text: String): String = ???`}</CodeBlock>

                    <p>
                        We can call this function as follows:
                    </p>

                    <CodeBlock>{`translate({from = English}, {to = French}, "Where is the library?")`}</CodeBlock>

                    <p>
                        Since such verbosity gets tedious, we can also use the syntactic sugar:
                    </p>

                    <CodeBlock>{`translate(from = English, to = French, "Where is the library?")`}</CodeBlock>

                    <p>
                        which is equivalent to the above.
                    </p>

                </SubSection>

                <SubSection name="Illegal Record Field: length">

                    <p>
                        A record field <i>cannot</i> be named <Code>length</Code>. The reason is that the expression:
                    </p>

                    <CodeBlock>{`a.length`}</CodeBlock>

                    <p>
                        is understood as accessing the length of the array <Code>a</Code>, <i>not</i> as accessing a
                        field named <Code>length</Code> on a record <Code>a</Code>.
                    </p>

                </SubSection>

            </Section>
        )
    }

}

export default Records
