
import React from 'react'
import ReactGA from 'react-ga';
import Section from "../components/Section";
import Editor from "../util/Editor";
import Code from "../components/Code";

class TypeClasses extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Type Classes";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Type Classes">

                {/*
                    TODO:

                    Basics: 
                    1. function isSingleton, works on lists
                    2. add type constraint to generify
                    3. Length typeclass
                    4. without a tconstr, isSingleton(someList) fails
                    5. Length[List[a]] instance
                    6. isSingleton inefficient: add sig to Length and override to List instance
                        -- overrides must have same semantics
                    7. Length[String] uses default impl

                    Laws:
                    1. nonnegative from Length class
                        -- planned feature: quickcheck
                    2. unlawful instances
                    3. lawless classes

                    Type constraints
                    1. on type classes 
                    2. on instances (DeepLength)

                    Sealed:
                    1. some example?

                    Higher-order classes
                    1. functor example
                    2. kind discussion
                */
                }

                <p>
                    Type classes are one of the ways to support
                    a high level of genericity in functional programming.
                    Flix's type classes largely follow the style of those of Haskell,
                    with some additional principles.
                </p>

                <p>
                    The function <Code>isSingleton</Code> naively determines whether a list has exactly one element.
                    However, it only works with lists.
                    Although checking the length of a collection like this is possible for all standard collections,
                    we have to implement a separate <Code>isSingleton</Code> function for each of them.
                </p>

                <Editor flix={this.props.flix}>
                    {`def isSingleton(l: List[a]): Bool = List.length(l) == 1`}
                </Editor>

                <p>
                    We can generalize this behavior by using a type class constraint.
                    Rather than requiring the argument to be a list,
                    we use a type variable <Code>a</Code> and constrain it with to the type class <Code>Length</Code>,
                    which means that the function <Code>Length.length</Code> can be applied to the argument.
                </p>

                <Editor flix={this.props.flix}>
                    {`def isSingleton(l: a): Bool with Length[a] = {
    Length.length(l) == 1
}`}
                </Editor>

                <p>
                    The type class declaration <Code>Length</Code> specifies what can be done with its members.
                    In this case, there is only one function: <Code>Length.length</Code>,
                    which takes the member type as an argument and returns an integer.
                    The law <Code>nonnegative</Code> is also defined as part of the class.
                    Laws will be further explored in section TK.
                </p>

                <Editor flix={this.props.flix}>
                    {`pub class Length[a] {
    pub def length(x: a): Int

    law nonnegative: forall(x: a) . Length.length(x) >= 0
}`}
                </Editor>

                <p>
                    If we try to use the new <Code>isSingleton</Code> function,
                    we will see that it fails to compile:
                </p>

                <Editor flix={this.props.flix}>
                    {`isSingleton(1 :: 2 :: Nil)`}
                </Editor>

                <p>
                    While we know that a list has a length, we haven't proven this to the compiler.
                    To do this, we introduce an <Code>instance</Code> of the type class for the generic type <Code>List[a]</Code>.
                </p>

                <Editor flix={this.props.flix}>
                    {`instance Length[List[a]] {
    pub def length(x: List[a]): Int = List.length(x)
}`}
                </Editor>

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

                <Editor flix={this.props.flix}>
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
                </Editor>

                <p>
                    We have added the <Code>isSingleton</Code> function to the <Code>Length</Code> type class,
                    with a default implementation that works in general.
                    (We also added a new law <Code>singletonMeansOne</Code>; see section TK.)
                    We have added an efficient <Code>override</Code> implementation of <Code>isSingleton</Code>
                    to the <Code>Length</Code> instance for <Code>List[a]</Code>.
                    The advantage of the default implementation is that if there's no special
                    behavior needed for a type, the default is assumed.
                    The function does not have to be implemented.
                </p>

                <Editor flix={this.props.flix}>
                    {`instance Length[String] {
    pub def length(x: String): Int = String.length(x)
}`}
                </Editor>

                <p>
                    The instance <Code>Length[String]</Code> simply uses the default implementation 
                    of the <Code>isSingleton</Code> function.
                </p>

            </Section>
        )
    }

}

export default TypeClasses