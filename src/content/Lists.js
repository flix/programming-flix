import React from 'react'
import ReactGA from 'react-ga'

import Code from '../components/Code'
import Editor from '../util/Editor'
import Section from '../components/Section'

class Lists extends React.Component {
  componentDidMount() {
    document.title = 'Programming Flix | Lists'
    ReactGA.pageview(window.location.pathname)
  }

  render() {
    return (
      <Section name="Programming with Lists">
        <p>
          The bread and butter of functional programming is list processing. A
          list is either the empty list, written as <Code>Nil</Code>, or a cons
          cell, written as <Code>x :: xs</Code> where <Code>x</Code> is the head
          element and <Code>xs</Code> is the tail of the list. The{' '}
          <Code>List</Code> type is polymorphic so you can have a list of
          integers, written as <Code>List[Int]</Code>, or a list of strings
          written as <Code>List[String]</Code>. The <Code>List</Code> type and
          list operations are part of the Flix standard library.
        </p>

        <p> We can construct the empty list of integer as follows: </p>

        <Editor flix={this.props.flix}>def main(): List[Int] = Nil</Editor>

        <p>
          {' '}
          And we can construct a list with the integers 1, 2, and 3 as follows:{' '}
        </p>

        <Editor flix={this.props.flix}>
          def main(): List[Int] = 1 :: 2 :: 3 :: Nil
        </Editor>

        <p>
          We can also construct a list of strings with the strings{' '}
          <Code>"Hello"</Code> and <Code>"World"</Code>:
        </p>

        <Editor flix={this.props.flix}>
          def main(): List[String] = "Hello" :: "World" :: Nil
        </Editor>

        <p>
          Given a list there are many useful operations we can perform on it.
        </p>

        <p>For example, we can compute the length of the list as follows:</p>

        <Editor flix={this.props.flix}>
          def main(): Int = List.length(1 :: 2 :: 3 :: Nil)
        </Editor>

        <p>We can also reverse the order of elements in the list:</p>

        <Editor flix={this.props.flix}>
          def main(): List[Int] = List.reverse(1 :: 2 :: 3 :: Nil)
        </Editor>

        <p>
          We can append to lists using the <Code>List.append</Code> function as
          follows:
        </p>

        <Editor flix={this.props.flix}>
          {`def main(): List[Int] =
    let xs = (1 :: 2 :: 3 :: Nil);
    let ys = (4 :: 5 :: 6 :: Nil);
        List.append(xs, ys)`}
        </Editor>

        <p>
          Or, alternatively, we can use the built-in append operator{' '}
          <Code>:::</Code> as follows:
        </p>

        <Editor flix={this.props.flix}>
          {`def main(): List[Int] =
    let xs = (1 :: 2 :: 3 :: Nil);
    let ys = (4 :: 5 :: 6 :: Nil);
        xs ::: ys`}
        </Editor>

        <p>
          Flix has an extensive collection of functions to operate on lists.
        </p>

        <p>Here are some of the most common:</p>

        <Editor flix={this.props.flix}>
          {`def main(): Int = List.count(x -> x == 1, 1 :: 2 :: 3 :: Nil)`}
        </Editor>

        <Editor flix={this.props.flix}>
          {`def main(): List[Int] = List.filter(x -> x == 1, 1 :: 2 :: 3 :: Nil)`}
        </Editor>

        <Editor flix={this.props.flix}>
          {`def main(): List[Int] = List.map(x -> x + 1, 1 :: 2 :: 3 :: Nil)`}
        </Editor>

        <Editor flix={this.props.flix}>
          {`def main(): Int = List.foldLeft((x, y) -> x + y, 0, 1 :: 2 :: 3 :: Nil)`}
        </Editor>

        <p>And here are some more exotic:</p>

        <Editor flix={this.props.flix}>
          {`def main(): List[String] = List.intersperse("X", "a" :: "b" :: "c" :: Nil)`}
        </Editor>

        <Editor flix={this.props.flix}>
          {`def main(): List[String] =
    let l1 = "X" :: "Y" :: Nil;
    let l2 = ("a" :: "b" :: Nil) :: ("c" :: "d" :: Nil) :: Nil;
    List.intercalate(l1, l2)`}
        </Editor>

        <p>We can write our own recursive functions to operate on lists.</p>

        <p>
          For example, here is the library implementation of{' '}
          <Code>List.map</Code>:
        </p>

        <Editor flix={this.props.flix}>
          {`///
/// Returns the result of applying \`f\` to every element in \`xs\`.
/// That is, the result is of the form: \`f(x1) :: f(x2) :: ...\`.
///
pub def map[a,b](f: a -> b, xs: List[a]): List[b] = match xs with {
    case Nil => Nil
    case x :: rs => f(x) :: map(f, rs)
}`}
        </Editor>

        <p>
          Before you write your own list function, be sure to check if it is
          already available in the library.
        </p>
      </Section>
    )
  }
}

export default Lists
