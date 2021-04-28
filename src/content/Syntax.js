import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import CodeBlock from "../util/CodeBlock";
import Code from "../components/Code";
import SubSubSection from "../components/SubSubSection";

class Syntax extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Syntax";
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <Section name="Syntax">

                <p>
                    This page documents a few features that make Flix code easier to read and write.
                </p>

                <SubSection name="Pipelines">

                    <CodeBlock>
                        {`List.range(1, 100) |> List.length`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Match Lambdas">

                    <p>TBD</p>

                    <CodeBlock>
                        {`List.map(match (x, y) -> `}
                    </CodeBlock>


                </SubSection>

                <SubSection name="Simple Enums">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="Casting and Ascription">

                    <p>TBD</p>

                </SubSection>


                <SubSection name="Let*">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="ToString and println">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="Bug!">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="String Interpolation">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="Partial Application and Currying">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="Let pattern match">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="Infix Application">

                    <p>TBD</p>

                </SubSection>

                <SubSection name="Built-in Literals">

                    <p>Flix has built-in syntactic sugar for lists, sets, and maps.</p>

                    <SubSubSection name="List Literals">

                        <p>
                            A list literal is written using the infix <Code>::</Code> constructor.
                            For example:
                        </p>

                        <CodeBlock>{`1 :: 2 :: 3 :: Nil`}</CodeBlock>

                        <p>
                            which is syntactic sugar for:
                        </p>

                        <CodeBlock>{`Cons(1, Cons(2, Cons(3, Nil)))`}</CodeBlock>

                    </SubSubSection>

                    <SubSubSection name="Set Literals">

                        <p>
                            A set literal is written using the notation <Code>{`Set#{v1, v2, ...}`}</Code>.
                            For example:
                        </p>

                        <CodeBlock>{`Set#{1, 2, 3}`}</CodeBlock>

                        <p>
                            which is syntactic sugar for:
                        </p>

                        <CodeBlock>{`Set.insert(1, Set.insert(2, Set.insert(3, Set.empty())))`}</CodeBlock>

                    </SubSubSection>

                    <SubSubSection name="Map Literals">

                        <p>
                            A map literal is written using the notion <Code>{`Map#{k1 -> v1, k2 -> v2, ...}`}</Code>.
                            For example:
                        </p>

                        <CodeBlock>{`Map#{1 -> "Hello", 2 -> "World"}`}</CodeBlock>

                        <p>
                            which is syntactic sugar for:
                        </p>

                        <CodeBlock>{`Map.insert(1, "Hello", Map.insert(2, "World", Map.empty()))`}</CodeBlock>

                    </SubSubSection>

                </SubSection>

                <SubSection name="Anonymous and Named Holes">

                    <p>
                        During development, Flix encourages the use of holes for incomplete code.
                        For example:
                    </p>

                    <CodeBlock>{`def sum(x: Int, y: Int}: Int = ???`}</CodeBlock>

                    <p>
                        The triple question marks <Code>???</Code> represents an anonymous hole and can be used wherever
                        an expression is expected. In the above code, <Code>???</Code> represents a missing function
                        body, but it can also be used inside an expression. For example:
                    </p>

                    <CodeBlock>{`def length(l: List[a]}: Int = match l {
  case Nil     => 0
  case x :: xs => ???
}`}</CodeBlock>

                    <p>
                        When a program has multiple holes, it can be useful to name them. For example:
                    </p>

                    <CodeBlock>{`def length(l: List[a]}: Int = match l {
  case Nil     => ?base
  case x :: xs => ?step
}`}</CodeBlock>

                    <p>
                        Flix requires that each named hole has a unique name.
                    </p>

                </SubSection>

            </Section>
        )
    }

}

export default Syntax
