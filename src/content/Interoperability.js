import React from 'react'
import ReactGA from 'react-ga';

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";

class Interoperability extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Interoperability";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Interoperability">

                <p>
                    Flix supports interoperability with Java through the <Code>import</Code> mechanism.
                </p>

                <SubSection name="Creating Objects">
                    <p>
                        TBD
                    </p>

                    <Editor flix={this.props.flix}>
                        def main(): List[Int] = Nil
                    </Editor>
                </SubSection>

                <SubSection name="Invoking Object Methods">
                    YBD
                </SubSection>

                <SubSection name="Reading Object Fields">
                    TBD
                </SubSection>

                <SubSection name="Writing Object Fields">
                    TBD
                </SubSection>

                <SubSection name="Invoking Static Methods">
                    TBD
                </SubSection>

                <SubSection name="Reading Static Fields">
                    TBD
                </SubSection>

                <SubSection name="Writing Static Fields">
                    TBD
                </SubSection>

            </Section>
        )
    }

}

export default Interoperability
