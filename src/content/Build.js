import React from 'react'
import ReactGA from 'react-ga';

import Section from "../components/Section";
import SubSection from "../components/SubSection";
import Code from "../components/Code";
import {Card, CardBody, Table} from "reactstrap";
import PlannedFeature from "../components/PlannedFeature";
import Warning from "../components/Warning";

class Build extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Build System";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Build">

                <p>
                    Flix has a simple build system that comes with the compiler. The build system makes it easy to
                    create a new Flix project, to compile a Flix project, to test and benchmark it, and to ship a
                    standalone "fat" JAR with all the required dependencies included, i.e. the Flix runtime. We plan to
                    extend the build system as Flix matures.
                </p>

                <SubSection name="Overview">

                    <p>
                        Here is a brief overview of the build system commands:
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
                            <td>creates a new project in the current directory.</td>
                        </tr>
                        <tr>
                            <td><Code>build</Code></td>
                            <td>builds the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>build-jar</Code></td>
                            <td>builds a jar-file for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>run</Code></td>
                            <td>runs main for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>benchmark</Code></td>
                            <td>runs benchmarks for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>test</Code></td>
                            <td>runs tests for the current project.</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p>
                        A command is executed by running <Code>flix &lt;command&gt;</Code> inside the project directory.
                        Depending on how Flix is installed on your machine, you may need to run <Code>java -jar
                        flix.jar &lt;command&gt;</Code>.
                    </p>

                </SubSection>

                <SubSection name="Creating a New Project">

                    <p>
                        We can create a new project by creating an empty directory and running
                        the <Code>init</Code> command inside it:
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
                        This will create a project structure with approximately the following layout:
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
                        The most relevant files are <Code>src/Main.flix</Code> and <Code>test/TestMain.flix</Code>.
                    </p>

                </SubSection>

                <SubSection name="Building a Project">

                    <p>
                        We can build a project by running the <Code>build</Code> command inside the project directory:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ flix build
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        If there are compilation errors, Flix will show them.
                    </p>

                    <p>
                        Running the build command populates the <Code>build</Code> directory with class files.
                    </p>

                </SubSection>

                <SubSection name="Building a JAR-file">

                    <p>
                        We can compile a project to a single standalone "fat" JAR-file that includes all dependencies:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ flix build-jar
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        which will produce a <Code>myproject.jar</Code> ready to run:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ java -jar myproject.jar <br/>
                                Hello World!
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        The JAR-file contains all class files generated by the project and also the few classes that
                        constitute the Flix runtime, e.g. the implementation of channels and the fixpoint solver.
                    </p>

                    <Warning>
                        The project must have been built before with the <Code>build</Code> command.
                    </Warning>

                </SubSection>

                <SubSection name="Running a Project">

                    <p>
                        We do not have to build a JAR-file to run a project, we can simply use
                        the <Code>run</Code> command:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ flix run <br/>
                                Hello World!
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        which will compile and run the main entry point.
                    </p>

                </SubSection>

                <SubSection name="Testing a Project">

                    <p>
                        We can use the <Code>test</Code> command to run all test cases in a project:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ flix test
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        Flix will collect all functions marked with <Code>@test</Code>, execute them, and print a
                        summary of the results:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                -- Tests -------------------------------------------------- root <br/>
                                <br/>
                                ✓ testMain01
                            </code>
                        </CardBody>
                    </Card>

                </SubSection>

                <SubSection name="Benchmarking a Project">

                    <p>
                        We can use the the <Code>benchmark</Code> command to run all benchmarks in a project:
                    </p>

                    <Card>
                        <CardBody>
                            <code>
                                $ flix benchmark
                            </code>
                        </CardBody>
                    </Card>

                    <p>
                        Flix will collect all functions marked with <Code>@benchmark</Code>, execute them multiple times
                        while measuring their performance, and print a summary of the results.
                    </p>

                    <PlannedFeature>
                        We have plans to expand the benchmark facilities with a better measurement framework with
                        statistics and to move from function-level towards expression-level benchmarking.
                    </PlannedFeature>

                </SubSection>

            </Section>
        )
    }

}

export default Build
