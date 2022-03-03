import React from 'react'
import ReactGA from "react-ga";

import Code from '../components/Code';
import Section from "../components/Section";
import SubSection from "../components/SubSection";
import PlannedFeature from "../components/PlannedFeature";
import SubSubSection from "../components/SubSubSection";
import CodeBlock from "../util/CodeBlock";

class Concurrency extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Concurrency";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Concurrency with Channels and Processes">

                <p>
                    Flix supports CSP-style concurrency with channels and processes inspired by Go.
                </p>

                <SubSection name="Spawning Processes">

                    <p>
                        We can spawn a process with the <Code>spawn</Code> keyword:
                    </p>

                    <CodeBlock>
                        {`spawn (1 + 2)`}
                    </CodeBlock>

                    <p>
                        This spawns a process that computes <Code>1 + 2</Code> and throws the result away.
                        The <Code>spawn</Code> expression always returns <Code>Unit</Code>. We can spawn any
                        expression, but we typically spawn functions to run in a new process:
                    </p>

                    <CodeBlock>
                        {`def sum(x: Int32, y: Int32): Int32 = x + y

def main(_args: Array[String]): Int32 & Impure = spawn sum(1, 2); 0`}
                    </CodeBlock>

                </SubSection>

                <SubSection name="Communicating with Channels">

                    <p>
                        To communicate between processes we use channels. A <i>channel</i> allows two or more
                        processes to exchange data by sending immutable messages to each other.
                    </p>

                    <p>
                        A channel comes in one of two variants: <i>buffered</i> or <i>unbuffered</i>. A buffered
                        channel has a size, set at creation time, and can hold that many messages. If a process attempts
                        to put a message into a buffered channel that is full, then the process is blocked until space
                        becomes available. If, on the other hand, a process attempts to get a message from an empty
                        channel, the process is blocked until a message is put into the channel. An unbuffered channel
                        works like a buffered channel of size zero; for a get and a put to happen both processes must
                        rendezvous (block) until the message is passed from sender to receiver.
                    </p>

                    <p>
                        Here is an example of sending and receiving a message over a channel:
                    </p>

                    <CodeBlock>
                        {`def send(c: Channel[Int32]): Unit & Impure = c <- 42; ()

def main(_args: Array[String]): Int32 & Impure =
    let c = chan Int32 0;
    spawn send(c);
    <- c`}
                    </CodeBlock>

                    <p>
                        Here the <Code>main</Code> function creates an unbuffered channel <Code>c</Code>, spawns
                        the <Code>send</Code> function, and waits for a message from <Code>c</Code>.
                        The <Code>send</Code> function simply puts the value <Code>42</Code> into the channel.
                    </p>

                </SubSection>

                <SubSection name="Selecting on Channels">

                    <p>
                        We can use the <Code>select</Code> expression to receive a message from a collection of
                        channels. For example:
                    </p>

                    <CodeBlock>
                        {`def meow(c: Channel[String]): Unit & Impure = c <- "Meow!"; ()
                        
def woof(c: Channel[String]): Unit & Impure = c <- "Woof!"; ()

def main(_args: Array[String]): Int32 & Impure =
    let c1 = chan String 1;
    let c2 = chan String 1;
    spawn meow(c1);
    spawn woof(c1);
    select {
        case m <- c1 => m
        case m <- c2 => m
    } |> println;
    0`}
                    </CodeBlock>

                    <p>
                        Many important concurrency patterns such as producer-consumer and load balancers can be
                        expressed using the <Code>select</Code> expression.
                    </p>

                </SubSection>

                <SubSubSection name="Selecting with Default">

                    <p>
                        In some cases, we do not want to block until a message arrives, potentially waiting forever.
                        Instead, we want to take some alternative action if no message is readily available.
                        We can achieve this with a <i>default case</i> as shown below:
                    </p>

                    <CodeBlock>
                        {`let c1 = chan String 1;
let c2 = chan String 1;
select {
    case m <- c1 => "one"
    case m <- c2 => "two"
    case _       => "default"
}`}
                    </CodeBlock>

                    <p>
                        Here a message is never sent to <Code>c1</Code> nor <Code>c2</Code>.
                        The <Code>select</Code> expression tries all cases, and if no channel is ready, it
                        immediately selects the default case. Hence using a default case prevents
                        the <Code>select</Code> expression from blocking forever.
                    </p>

                </SubSubSection>

                <SubSubSection name="Selecting with Tickers and Timers">

                    <p>
                        As an alternative to a default case, we can use <i>tickers</i> and <i>timers</i> to wait for
                        pre-defined periods of time inside a <Code>select</Code> expression.
                    </p>

                    <p>
                        For example, here is a program that has a slow function that takes a minute to send a message on
                        a channel, but the <Code>select</Code> expression relies on <Code>Timer.seconds</Code> to only
                        wait <Code>5</Code> seconds before giving up:
                    </p>

                    <CodeBlock>
                        {`def slow(c: Channel[String]): Unit & Impure =
    import java.lang.Thread:sleep(Int64);
    sleep(Duration.oneMinute() / 1000000i64);
    c <- "I am very slow";
    ()

def main(_args: Array[String]): Int32 & Impure =
    let c = chan String 1;
    spawn slow(c);
    select {
        case m <- c                    => m
        case t <- Timer.seconds(5i64)  => "timeout"
    } |> println;
    0
`}
                    </CodeBlock>

                    <p>
                        This program prints the string <Code>"timeout"</Code> after five seconds.
                    </p>

                    <p>
                        Flix also supports <i>tickers</i> which are similar to timers, but instead of sending a message
                        one after a pre-defined time they repeatedly send a message every tick.
                    </p>

                    <PlannedFeature>
                        Flix does not currently support <i>put</i> operations in <Code>select</Code> expressions.
                        This is something that we might support in the future.
                    </PlannedFeature>

                </SubSubSection>

            </Section>
        )
    }

}

export default Concurrency
