
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
                    TODO this section is all about type classes
                </p>

                <Editor flix={this.props.flix}>
                    {`here I will put some flix code
the second line has to start all the way over here`}
                </Editor>

                <p>
                    I can also put <Code>code in the paragraph</Code>
                </p>

            </Section>
        )
    }

}

export default TypeClasses