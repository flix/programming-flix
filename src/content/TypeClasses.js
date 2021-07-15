
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

                    Sealed:
                    1. some example?

                    Higher-order classes
                    1. functor example
                    2. kind discussion
                */
                }
                <p>
                    Similar to Haskell, Flix supports type classes in order to allow for highly generic code.
                    A type class can be seen as a contract: 
                    in order for a type to be considered a member of the class, it must fulfill certain requirements.
                </p>
                {/* TODO something like isSingleton (with Length) */}

                <Editor flix={this.props.flix}>
                    {`pub class Length[a] {
    pub def length(x: a): Int

    law nonnegative: forall(x: a) . Length.length(x) >= 0
}`}
                </Editor>

                <p>
                    The <Code>Length</Code> class defines the function <Code>length</Code>.
                    The contract imposed by this class includes
                    the definition of this <Code>length</Code> function
                    and fulfillment of the law <Code>nonnegative</Code>. {/* TODO something something we will discuss laws later */}
                    In order to show that a type fulfills this contract, an instance must be created.
                </p>

                <Editor flix={this.props.flix}>
                    {`instance Length[String] {
    pub def length(x: String): Int = String.length(x)
}`}
                </Editor>

                <p>
                    Here we have defined an instance of the class <Code>Length</Code> for the type <Code>String</Code>.
                    Since the standard library already contains a function for getting the length of a string,
                    we can simply use this as the implementation.
                </p>

            </Section>
        )
    }

}

export default TypeClasses