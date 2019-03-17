import React from 'react'

import Code from '../components/Code';
import Editor from '../util/Editor';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import Warning from "../components/Warning";
import PlannedFeature from "../components/PlannedFeature";

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
                        The <Code>spawn</Code> expression always returns <Code>Unit</Code>. We can spawn any
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

                <SubSection name="Communicating with Channels">

                    <p>
                        To communicate between processes, we use channels. A <i>channel</i> allows two or more
                        processes to exchange data by sending immutable messages to each other.
                    </p>

                    <p>
                        A channel comes in one of two variants: <i>buffered</i> and <i>unbuffered</i>. A buffered
                        channel has a size, set at creation time, and can hold that many messages. If a process attempts
                        to put a message into a buffered channel that is full the process is blocked until space becomes
                        available. If, on the other hand, a process attempts to get a message from an empty channel, the
                        process is blocked until a message is put into the channel. An unbuffered channel works like a
                        buffered channel of size zero; for a get and a put to happen with an unbuffered channel both
                        processes must rendezvous for the hand-off of the message.
                    </p>

                    <p>
                        Here is an example of sending and receiving a message over a channel:
                    </p>

                    <Editor flix={this.props.flix}>
                        {`def send(c: Channel[Int]): Unit = c <- 42; ()
def main(): Int =
    let c = chan Int 0;
    spawn send(c);
    <- c`}
                    </Editor>

                    <p>
                        Here the <Code>main</Code> function creates an unbuffered channel <Code>c</Code>, spawns
                        the <Code>send</Code> function, and wait for a message from <Code>c</Code>.
                        The <Code>send</Code> function simply puts the value <Code>42</Code> into the channel.
                    </p>

                    <PlannedFeature>
                        Flix does not currently enforce that only immutable data that can be shared between processes,
                        but it is something we plan to enforce in the future.
                    </PlannedFeature>

                </SubSection>

            </Section>
        )
    }

}

export default Concurrency
