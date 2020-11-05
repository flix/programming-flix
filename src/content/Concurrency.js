import React from 'react'
import ReactGA from 'react-ga'

import Code from '../components/Code'
import Editor from '../util/Editor'
import Section from '../components/Section'
import SubSection from '../components/SubSection'
import Warning from '../components/Warning'
import PlannedFeature from '../components/PlannedFeature'
import SubSubSection from '../components/SubSubSection'
import DesignNote from '../components/DesignNote'

class Concurrency extends React.Component {
  componentDidMount() {
    document.title = 'Programming Flix | Concurrency'
    ReactGA.pageview(window.location.pathname)
  }

  render() {
    return (
      <Section name="Concurrency with Channels and Processes">
        <p>
          Flix supports CSP-style concurrency with processes and channels
          inspired by Go.
        </p>

        <SubSection name="Spawning Processes">
          <p>
            {' '}
            We can spawn a process with the <Code>spawn</Code> keyword:{' '}
          </p>

          <Editor flix={this.props.flix}>
            def main(): Unit & Impure = spawn (1 + 2)
          </Editor>

          <p>
            This spawns a process that computes <Code>1 + 2</Code> and throws
            the result away. The <Code>spawn</Code> expression always returns{' '}
            <Code>Unit</Code>. We can spawn any expression, but we typically
            spawn functions to run in a new process:
          </p>

          <Editor flix={this.props.flix}>
            {`def sum(x: Int, y: Int): Int = x + y
def main(): Unit & Impure = spawn sum(1, 2)`}
          </Editor>

          <Warning>
            A Flix program does not terminate until <i>all</i> processes have
            terminated.
          </Warning>
        </SubSection>

        <SubSection name="Communicating with Channels">
          <p>
            To communicate between processes we use channels. A <i>channel</i>{' '}
            allows two or more processes to exchange data by sending immutable
            messages to each other.
          </p>

          <p>
            A channel comes in one of two variants: <i>buffered</i> or{' '}
            <i>unbuffered</i>. A buffered channel has a size, set at creation
            time, and can hold that many messages. If a process attempts to put
            a message into a buffered channel that is full, then the process is
            blocked until space becomes available. If, on the other hand, a
            process attempts to get a message from an empty channel, the process
            is blocked until a message is put into the channel. An unbuffered
            channel works like a buffered channel of size zero; for a get and a
            put to happen both processes must rendezvous (block) until the
            message is passed from sender to receiver.
          </p>

          <p>
            Here is an example of sending and receiving a message over a
            channel:
          </p>

          <Editor flix={this.props.flix}>
            {`def send(c: Channel[Int]): Unit & Impure = c <- 42; ()
def main(): Int & Impure =
    let c = chan Int 0;
    spawn send(c);
    <- c`}
          </Editor>

          <p>
            Here the <Code>main</Code> function creates an unbuffered channel{' '}
            <Code>c</Code>, spawns the <Code>send</Code> function, and waits for
            a message from <Code>c</Code>. The <Code>send</Code> function simply
            puts the value <Code>42</Code> into the channel.
          </p>

          <PlannedFeature>
            Flix does not currently enforce that messages are immutable, but it
            is something we are planning to add in the future.
          </PlannedFeature>
        </SubSection>

        <SubSection name="Selecting on Channels">
          <p>
            We can use the <Code>select</Code> expression to receive a message
            from a collection of channels. For example:
          </p>

          <Editor flix={this.props.flix}>
            {`def meow(c: Channel[String]): Unit & Impure = c <- "Meow!"; ()
def woof(c: Channel[String]): Unit & Impure = c <- "Woof!"; ()
def main(): String & Impure =
    let c1 = chan String 1;
    let c2 = chan String 1;
    spawn meow(c1);
    spawn woof(c1);
    select {
        case m <- c1 => m
        case m <- c2 => m
    }`}
          </Editor>

          <p>
            Many important concurrency patterns such as producer-consumer and
            load balancers can be expressed using the <Code>select</Code>{' '}
            expression.
          </p>

          <Warning>
            The absence of (manual) locks in Flix does not prevent deadlocks! A
            process can easily deadlock, e.g. by reading from a channel that is
            never written to!
          </Warning>
        </SubSection>

        <SubSubSection name="Selecting with Default">
          <p>
            In some cases, we do not want to block until a message arrives,
            potentially waiting forever. Instead, we want to take some
            alternative action if no message is readily available. We can
            achieve this with a <i>default case</i> as shown below:
          </p>

          <Editor flix={this.props.flix}>
            {`def main(): String & Impure =
    let c1 = chan String 1;
    let c2 = chan String 1;
    select {
        case m <- c1 => "one"
        case m <- c2 => "two"
        case _       => "default"
    }`}
          </Editor>

          <p>
            Here a message is never sent to <Code>c1</Code> nor <Code>c2</Code>.
            The <Code>select</Code> expression tries all cases in order, and if
            no channel is ready, it immediately selects the default case. Hence
            using a default case prevents the <Code>select</Code> expression
            from (potentially) blocking (potentially forever).
          </p>
        </SubSubSection>

        <SubSubSection name="Selecting with Tickers and Timers">
          <p>
            As an alternative to a default case, we can use <i>tickers</i> and{' '}
            <i>timers</i> to wait for pre-defined periods of time inside a{' '}
            <Code>select</Code> expression.
          </p>

          <p>
            For example, here is a program that has a slow function that takes a
            minute to send a message on a channel, but the <Code>select</Code>{' '}
            expression relies on <Code>Timer.seconds</Code> to only wait{' '}
            <Code>5</Code> seconds before giving up:
          </p>

          <Editor flix={this.props.flix}>
            {`def slow(c: Channel[String]): Unit & Impure =
    import java.lang.Thread:sleep(Int64);
    sleep(Duration.oneMinute() / 1000000i64);
    c <- "I am very slow";
    ()

def main(): String & Impure =
    let c = chan String 1;
    spawn slow(c);
    select {
        case m <- c                    => m
        case t <- Timer.seconds(5i64)  => "timeout"
    }
`}
          </Editor>

          <DesignNote>
            The argument to <Code>Timer.seconds</Code> requires a 64-bit
            integer, so for now we have to specify it with the <Code>i64</Code>{' '}
            suffix, since otherwise <Code>5</Code> would be interpreted as a
            32-bit number and we would get a type error. In the future, we plan
            to have some form of integer promotion.
          </DesignNote>

          <p>
            This program returns the string <Code>"timeout"</Code> after five
            seconds, but terminates after one minute when the last process
            terminates (!)
          </p>

          <p>
            Flix also supports <i>tickers</i> which are similar to timers, but
            instead of sending a message one after a pre-defined time they
            repeatedly send a message every tick.
          </p>

          <PlannedFeature>
            Flix does not currently support <i>put</i> operations in{' '}
            <Code>select</Code> expressions. This is something that we might
            support in the future.
          </PlannedFeature>
        </SubSubSection>
      </Section>
    )
  }
}

export default Concurrency
