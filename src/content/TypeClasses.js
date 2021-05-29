
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
                    {`pub class Eq[a] {
    pub def eq(x: a, y: a): Bool

    pub def neq(x: a, y: a): Bool = not Eq.eq(x, y)

    law reflexivity: forall(x: a). x == x}

    /* ...additional laws... */
}`}
                </Editor>

                <p>MATT: Eq is a bad example because we can't pull this into try.flix.dev (already defined)</p>
                <p>
                    The <Code>Eq</Code> class defines the operators <Code>==</Code> and <Code>!=</Code>.
                    The contract imposed by this class includes 
                    a definition <Code>eq</Code> of equality,
                    a definition <Code>neq</Code> of inequality,
                    and fulfillment of the law <Code>reflexivity</Code>.

                    In order to show that a type fulfills this contract, an instance must be created.
                </p>

            </Section>
        )
    }

}

export default TypeClasses