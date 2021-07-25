import React from 'react'
import ReactGA from 'react-ga';

import Section from "../components/Section";
import SubSection from "../components/SubSection";
import Code from "../components/Code";
import Table from "reactstrap";
import Warning from "../components/Warning";
import CodeBlock from "../util/CodeBlock";

class BuildAndPackages extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Build and Package Management";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Build and Package Management">

                <p>
                    Flix has a nascent build system and package manager. The package manager does not yet support <i>dependency
                    resolution</i>, but the system is sufficient to build and share packages. There is no central
                    package registry, so versioning must be handled manually. We propose that the semantic version of
                    a package is included as part of its name, e.g. <Code>foo-1.2.1.fpkg</Code>.
                </p>

                <p>
                    The Flix build system makes it easy to create a new Flix project, to compile a project, to run
                    a project, to run all tests in a project, to package a project into a Flix package, and to compile
                    a project to a JAR-file.
                </p>


                <SubSection name="Overview">

                    <p>
                        The Flix build system supports the following commands:
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
                            <td><Code>check</Code></td>
                            <td>checks the current project for errors.</td>
                        </tr>
                        <tr>
                            <td><Code>build</Code></td>
                            <td>builds (i.e. compiles) the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>build-jar</Code></td>
                            <td>builds a jar-file from the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>build-pkg</Code></td>
                            <td>builds a fpkg-file from the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>run</Code></td>
                            <td>runs main for the current project.</td>
                        </tr>
                        <tr>
                            <td><Code>test</Code></td>
                            <td>runs tests for the current project.</td>
                        </tr>
                        </tbody>
                    </Table>

                    <p>
                        A command is executed by running <Code>flix &lt;command&gt;</Code> in the project directory.
                    </p>

                    <p>
                        For example:
                    </p>

                    <CodeBlock>{`java -jar path/to/flix.jar init`}</CodeBlock>

                    <p>
                        Build commands can also be invoked from Visual Studio Code by pressing <kbd>CTRL + P</kbd> and
                        typing the name of the relevant command.
                    </p>

                </SubSection>

                <SubSection name="Creating a New Project">

                    <p className="text-muted">
                        We can create a new project by creating an empty directory and running
                        the <Code>init</Code> command inside it:
                    </p>

                    <CodeBlock>
                        {`$ mkdir myproject
$ cd myproject
$ java -jar path/to/flix.jar init`}
                    </CodeBlock>

                    <p>
                        This will create a project structure with the following layout:
                    </p>

                    <CodeBlock>
                        {`build/
src/
.../Main.flix
lib/
test/
..../TestMain.flix
HISTORY.md
LICENSE.md
README.md`}
                    </CodeBlock>

                    <p>
                        The most relevant files are <Code>src/Main.flix</Code> and <Code>test/TestMain.flix</Code>.
                    </p>

                    <p>
                        The <Code>lib/</Code> directory is intended to hold Flix package files (<Code>.fpkg</Code>-files).
                        The build system and the Visual Studio Code extension both automatically load Flix package files
                        from the <Code>lib/</Code> directory.
                    </p>

                </SubSection>


                <SubSection name="Checking a Project">

                    <p>
                        We can check a project for errors by running the <Code>check</Code> command inside the project
                        directory:
                    </p>

                    <CodeBlock>
                        {`$ java -jar path/to/flix.jar check`}
                    </CodeBlock>

                    <p>
                        Checking a project is equivalent to building a project, except no code is generated, and
                        consequently the process is significantly faster.
                    </p>

                </SubSection>

                <SubSection name="Building a Project">

                    <p>
                        We can build a project by running the <Code>build</Code> command inside the project directory:
                    </p>

                    <CodeBlock>
                        {`$ java -jar path/to/flix.jar build`}
                    </CodeBlock>

                    <p>
                        Building a project populates the <Code>build</Code> directory with class files.
                    </p>

                </SubSection>

                <SubSection name="Building a JAR-file">

                    <p>
                        We can compile a project to a JAR-file that includes all dependencies:
                    </p>

                    <CodeBlock>
                        {`$ java -jar path/to/flix.jar build-jar`}
                    </CodeBlock>

                    <p>
                        which will produce a <Code>myproject.jar</Code> ready to run:
                    </p>

                    <CodeBlock>
                        {`$ java -jar myproject.jar`}
                    </CodeBlock>

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

                    <CodeBlock>
                        {`$ java -jar path/to/flix.jar run`}
                    </CodeBlock>

                    <p>
                        which will compile and run the main entry point.
                    </p>

                    <p>
                        The <Code>run</Code> command can also be executed directly from within Visual Studio Code.
                    </p>

                </SubSection>

                <SubSection name="Testing a Project">

                    <p>
                        We can use the <Code>test</Code> command to run all test cases in a project:
                    </p>

                    <CodeBlock>
                        {`$ java -jar path/to/flix.jar test`}
                    </CodeBlock>

                    <p>
                        Flix will collect all functions marked with <Code>@test</Code>, execute them, and print a
                        summary of the results:
                    </p>

                    <CodeBlock>
                        {`-- Tests -------------------------------------------------- root
✓ testMain01`}
                    </CodeBlock>

                </SubSection>

            </Section>
        )
    }

}

export default BuildAndPackages
