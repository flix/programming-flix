
import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import CodeBlock from "../util/CodeBlock";
import Code from "../components/Code";
import PlannedFeature from '../components/PlannedFeature';

class TypeClasses extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Type Classes";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Type Classes">
                <p>
                    Type classes are one of the ways to support
                    a high level of genericity in functional programming.
                    Flix's type classes largely follow the style of those of Haskell,
                    with some additional principles.
                </p>
                
                <SubSection name="Essentials">

                    <p>
                        The function <Code>isSingleton</Code> naively determines whether a list has exactly one element.
                        However, it only works with lists.
                        Although checking the length of a collection like this is possible for all standard collections,
                        we have to implement a separate <Code>isSingleton</Code> function for each of them.
                    </p>

                    <CodeBlock>
                        {`def isSingleton(l: List[a]): Bool = List.length(l) == 1`}
                    </CodeBlock>

                    <p>
                        We can generalize this behavior by using a type class constraint.
                        Rather than requiring the argument to be a list,
                        we use a type variable <Code>a</Code> and constrain it with to the type class <Code>Length</Code>,
                        which means that the function <Code>Length.length</Code> can be applied to the argument.
                    </p>

                    <CodeBlock>
                    {`def isSingleton(l: a): Bool with Length[a] = {
    Length.length(l) == 1
}`}
                    </CodeBlock>

                    <p>
                        The type class declaration <Code>Length</Code> specifies what can be done with its members.
                        In this case, there is only one function: <Code>Length.length</Code>,
                        which takes the member type as an argument and returns an integer.
                        The law <Code>nonnegative</Code> is also defined as part of the class.
                        Laws will be further explored below.
                    </p>

                    <CodeBlock>
                    {`pub class Length[a] {
    pub def length(x: a): Int

    law nonnegative: forall(x: a) . Length.length(x) >= 0
}`}
                    </CodeBlock>

                    <p>
                        If we try to use the new <Code>isSingleton</Code> function,
                        we will see that it fails to compile:
                    </p>

                    <CodeBlock>
                        {`isSingleton(1 :: 2 :: Nil)`}
                    </CodeBlock>

                    <p>
                        While we know that a list has a length, we haven't proven this to the compiler.
                        To do this, we introduce an <Code>instance</Code> of the type class for the generic type <Code>List[a]</Code>.
                    </p>

                    <CodeBlock>
                    {`instance Length[List[a]] {
    pub def length(x: List[a]): Int = List.length(x)
}`}
                    </CodeBlock>

                    <p>
                        This instance simply states that in order to  get the length of the list,
                        we just use the <Code>List.length</Code> function from the standard library.
                        With this instance around, the call to the <Code>isSingleton</Code> function will compile.
                        However, you may have noticed that our implementation is inefficient.
                        While comparing the length to 1 is a correct solution generally,
                        for lists specifically the solution has a greater runtime complexity than necessary.
                        In order to preserve the general solution while allowing for optimizations where needed,
                        we can use a default implementation in the type class
                        and an override implementation in the instance.
                    </p>

                    <CodeBlock>
                    {`pub class Length[a] {
    pub def length(x: a): Int

    pub def isSingleton(x: a): Bool = length(x) == 1

    law nonnegative: forall(x: a) . Length.length(x) >= 0

    law singletonMeansOne(x: a): forall(x: a) . Length.length(x) == 1 <==> Length.isSingleton(x)
}

instance Length[List[a]] {
    pub def length(x: List[a]): Int = List.length(x)

    override pub def isSingleton(x: List[a]): Bool = match x {
        case _hd :: Nil => true
        case _ => false
    }
}`}
                    </CodeBlock>

                    <p>
                        We have added the <Code>isSingleton</Code> function to the <Code>Length</Code> type class,
                        with a default implementation that works in general.
                        (We also added a new law <Code>singletonMeansOne</Code>; see section <b>Laws</b>.)
                        We have added an efficient <Code>override</Code> implementation of <Code>isSingleton</Code> to
                        the <Code>Length</Code> instance for <Code>List[a]</Code>.
                        The advantage of the default implementation is that if there's no special
                        behavior needed for a type, the default is assumed.
                        The function does not have to be implemented.
                    </p>

                    <CodeBlock>
                    {`instance Length[String] {
    pub def length(x: String): Int = String.length(x)
}`}
                    </CodeBlock>

                    <p>
                        The instance <Code>Length[String]</Code> simply uses the default implementation 
                        of the <Code>isSingleton</Code> function.
                    </p>
                </SubSection>

                <SubSection name="Laws">
                    <p>
                        In addition to the functions forming part of their contract,
                        type classes have laws that govern how the functions may be implemented.
                    </p>

                    <CodeBlock>
                    {`pub class Length[a] {
    pub def length(x: a): Int

    law nonnegative: forall(x: a) . Length.length(x) >= 0
}`}
                    </CodeBlock>

                    <p>
                        The <code>nonnegative</code> law asserts that
                        the length of something can never be negative.
                    </p>

                    <PlannedFeature>
                        We plan to implement a quickcheck framework to verify that these laws hold.
                        For now, however, they only serve as a form of documentation.
                    </PlannedFeature>
                </SubSection>

                <SubSection name="Type Constraints">
                    <p>
                        We've seen type constraints on on function definitions,
                        but constraints can appear on on instances and type classes themselves as well.
                    </p>

                    <CodeBlock>
                        {`pub class TreeSize[a] {
    /// Returns the number of nodes in the object graph of this object
    pub def size(x: a): Int32

    law positive: forall(x: a) . size(x) > 0
}

instance TreeSize[Int32] {
    pub def size(x: Int32): Int32 = 1
}

instance TreeSize[List[a]] with TreeSize[a] {
    pub def size(x: List[a]): Int32 = {
        // one node for each cons cell, one for the nil, and nodes for each node's value
        List.Length(x) + 1 + List.foldLeft((acc, y) -> acc + TreeSize.size(y), 0, x)
    }
}`}
                    </CodeBlock>
                </SubSection>

                <SubSection name="Sealed Classes">
                    <p>
                        In general, a user can add an instance of a class for any type they define.
                        In some cases, however, it is useful to restrict membership in a class
                        to a finite list of types,
                        defined by the author of the class.
                        This is the purpose of a <Code>sealed</Code> class,
                        for which instances outside the class's namespace are not permitted.
                    </p>

                    <CodeBlock>
                        {`sealed class Primitive[a]

instance Primitive[Bool]
instance Primitive[Int32]
instance Primitive[Float64]
// ... and so on
`}
                    </CodeBlock>
                </SubSection>

            </Section>
        )
    }

}

export default TypeClasses