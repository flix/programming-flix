import React from 'react'
import ReactGA from 'react-ga';

import Section from "../components/Section";
import SubSection from "../components/SubSection";
import Code from "../components/Code";
import {Card, CardBody, Table} from "reactstrap";

class Build extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Build System";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Build">

                <p>
                    Flix features a simple build system. The build system makes it easy to create a Flix project, to
                    compile a Flix project, to test and benchmark it, and finally to ship a standalone "fat" JAR with
                    all dependencies included. We plan to develop and extend the build system as Flix matures.
                </p>

                <SubSection name="Overview">

                    <p>
                        Here is a brief overview of the project commands:
                    </p>

                    <Table>
                        <thead>
                        <tr>
                            <th>Command</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><Code>init</Code></td>
                            <td>create a new project in the current directory.</td>
                        </tr>
                        <tr>
                            <td><Code>build</Code></td>
                            <td>build the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>build-jar</Code></td>
                            <td>build a jar-file for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>build-pkg</Code></td>
                            <td>build a fpkg-file for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>run</Code></td>
                            <td>run main for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>benchmark</Code></td>
                            <td>run benchmarks for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>test</Code></td>
                            <td>run tests for the current project.</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p>
                        A command is executed by running <Code>flix &lt;command&gt;</Code> inside the project directory.
                    </p>

                </SubSection>

                <SubSection name="Creating a Project">

                    <p>
                        We can create a new project by creating an empty directory and running the <Code>flix
                        init</Code> command inside it:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ mkdir myproject <br/>
                                $ cd myproject <br/>
                                $ flix init
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        This will create a project structure with the following layout:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                build/ <br/>
                                src/ <br/>
                                .../Main.flix <br/>
                                test/ <br/>
                                .../TestMain.flix <br/>
                                HISTORY.md <br/>
                                LICENSE.md <br/>
                                README.md <br/>
                                package.sn <br/>
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        The most relevant files are <Code>src/Main.flix</Code> and <Code>test/Main.flix</Code>.
                    </p>

                </SubSection>

                <code>
                    fds
                </code>

            </Section>
        )
    }

}

export default Build
