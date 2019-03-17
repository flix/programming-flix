import React from 'react'

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import Warning from "../components/Warning";

class Concurrency extends React.Component {

    render() {
        return (
            <Section name="Concurrency with Channels and Processes">

                <p>
                    Flix supports CSP-style concurrency with processes and channels inspired by Go.
                </p>

                <SubSection name="Spawning Processes">

                    <p> We can spawn a process with the <Code>spawn</Code> keyword: </p>

                    <Editor flix={this.props.flix}>
                        def main(): Unit = spawn (1 + 2)
                    </Editor>

                    <p>
                        This spawns a process that computes <Code>1 + 2</Code> and throws the result away.
                        The <Code>spawn</Code> expression returns <Code>Unit</Code>. We can spawn any
                        expression, but typically we spawn functions to run in a new process:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def sum(x: Int, y: Int): Int = x + y
def main(): Unit = spawn sum(1, 2)`}
                    </Editor>

                    <Warning>
                        A Flix program does not terminate until <i>all</i> processes have terminated.
                    </Warning>

                </SubSection>

                <SubSection>

                </SubSection>

            </Section>
        )
    }

}

export default Concurrency
