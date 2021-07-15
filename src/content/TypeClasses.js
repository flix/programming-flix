
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

                <p>
                    Similar to Haskell, Flix supports type classes in order to allow for highly generic code.
                    A type class can be seen as a contract: 
                    in order for a type to be considered a member of the class, it must fulfill certain requirements.
                </p>

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
                    and fulfillment of the law <Code>reflexivity</Code>.

                    In order to show that a type fulfills this contract, an instance must be created.
                </p>

            </Section>
        )
    }

}

export default TypeClasses