import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Code from "../components/Code";
import SubSection from "../components/SubSection";
import CodeBlock from "../util/CodeBlock";
import DesignNote from "../components/DesignNote";

class References extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | References";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="References">

                <p>
                    Flix supports references in the ML-tradition. The three key operations are <Code>ref
                    e</Code>, <Code>deref e</Code>,
                    and <Code>e := e</Code>. The <Code>ref e</Code> operation allocates a reference cell in the heap and
                    returns its location, the <Code>deref</Code> operation dereferences a location and returns the
                    content of a reference cell, and finally the assigment <Code>:=</Code> operation changes the value
                    of a reference cell. Informally, a reference cell can be thought of as an "object" with
                    a single field that can be changed.
                </p>

                <p>
                    All operations on references are impure. As such, all functions that use references must be marked
                    as <Code>Impure</Code> or be casted to <Code>Pure</Code>.
                </p>

                <SubSection name="Allocation">

                    <p>
                        A reference cell is allocated as follows:
                    </p>

                    <CodeBlock>{`ref 42`}</CodeBlock>

                    <p>
                        which evaluates to a value of type <Code>Ref[Int32]</Code> which is a reference (pointer) to a
                        single memory cell that holds the value <Code>42</Code>.
                    </p>

                </SubSection>

                <SubSection name="Dereference">

                    <p>
                        A reference cell is accessed (de-referenced) as follows:
                    </p>

                    <CodeBlock>{`let l = ref 42;
deref l`}</CodeBlock>

                    <p>
                        which evaluates to <Code>42</Code> as expected.
                    </p>

                </SubSection>

                <SubSection name="Assignment">

                    <p>
                        A reference cell can have its value updated as follows:
                    </p>

                    <CodeBlock>{`let l = ref 42;
l := 84;
deref l`}</CodeBlock>

                    <p>
                        which evaluates to <Code>84</Code> as expected.
                    </p>

                </SubSection>

                <SubSection name={"Example: A Simple Counter"}>

                    <p>
                        The following program models a simple counter that can be incremented:
                    </p>

                    <CodeBlock>{`enum Counter {
    case Counter(Ref[Int32])                        
}

def newCounter(): Counter & Impure = Counter(ref 0)

def getCount(c: Counter): Int32 & Impure =
    let Counter(l) = c;
    deref l

def increment(c: Counter): Unit & Impure = 
    let Counter(l) = c;
    l := (deref l) + 1
    
def f(): Unit & Impure = 
    let c = newCounter();
    increment(c);
    increment(c);
    increment(c);
    getCount(c) |> println`}</CodeBlock>

                    <p>
                        Note that the <Code>newCounter</Code>, <Code>getCount</Code>, <Code>increment</Code>,
                        and <Code>f</Code> functions must all be marked as <Code>Impure</Code>.
                    </p>

                </SubSection>

                <SubSection name={"Aliasing and References to References"}>

                    <p>
                        References naturally support aliasing. That is their purpose. For example:
                    </p>

                    <CodeBlock>{`let l1 = ref 42;
let l2 = l1;
l2 := 84;
deref l1`}</CodeBlock>

                    <p>
                        Evaluates to <Code>84</Code> because the reference cell that <Code>l1</Code> points to is
                        modified through the alias <Code>l2</Code>.
                    </p>

                    <p>
                        References can point-to references as the following example illustrates:
                    </p>

                    <CodeBlock>{`let l1 = ref 42;
let l2 = ref l1;
deref (deref l2)`}</CodeBlock>

                    <p>
                        Evaluates to <Code>42</Code> as expected.
                    </p>

                    <DesignNote>
                        Flix does not support any notion of global mutable state. If you need to maintain a program-wide
                        counter (or other mutable state) then you have to allocate it in the main function and explicitly
                        thread it through the program.
                    </DesignNote>

                </SubSection>

                <SubSection name="Mutable Tuples and Records">

                    <p>
                        Flix tuples and records are <i>immutable</i>. However, tuples and records may contain mutable
                        references.
                    </p>

                    <p>
                        For example, here is a pair that contains two mutable references:
                    </p>

                    <CodeBlock>{`let p = (ref 1, ref 2);
fst(p) := 123`}</CodeBlock>

                    <p>
                        The type of the pair is <Code>(Ref[Int32], Ref[Int32])</Code>. The assignment does not change
                        the pair itself (it is immutable), but rather changes the value of the reference cell in the
                        first component of the pair.
                    </p>

                    <p>
                        Similarly, here is a record that contains two mutable references:
                    </p>

                    <CodeBlock>{`let r = { fstName = ref "Lucky", lstName = ref "Luke"};
r.fstName := "Unlucky"`}</CodeBlock>

                    <p>
                        The type of the record is <Code>{"{ fstName: Ref[String], lstName: Ref[String] }"}</Code>.
                        Again, the assignment does not change the record itself, but rather changes the value of
                        the reference cell corresponding to the <Code>fstName</Code> field.
                    </p>

                </SubSection>

            </Section>
        )
    }

}

export default References
