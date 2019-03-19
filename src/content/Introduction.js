import React from 'react'
import ReactGA from "react-ga";

import Editor from '../util/Editor';
import Section from "../components/Section";

class Introduction extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Introduction";
        ReactGA.pageview(window.location.pathname + window.location.hash);
    }

    render() {
        return (
            <Section name="Introduction to Flix">
                <p>
                    Flix is a principled and opinionated functional programming language that takes inspiration from F#,
                    Go, OCaml, Haskell, Rust, and Scala. Flix visually resembles Scala, but its type system is closer to
                    that of OCaml and Haskell. Its concurrency model is inspired by Go-style processes and channels.
                </p>

                <p>
                    Here are three different Flix programs to give you and idea of the look and feel of the language.
                </p>

                <p> This program illustrates the use of algebraic data types and pattern matching: </p>

                <Editor flix={this.props.flix}>
                    {`/// An algebraic data type for shapes.
enum Shape {
    case Circle(Int),        // circle radius
    case Square(Int),        // side length
    case Rectangle(Int, Int) // height and width
}

/// Computes the area of the given shape using
/// pattern matching and basic arithmetic.
def area(s: Shape): Int = match s with {
    case Circle(r)       => 3 * (r * r)
    case Square(w)       => w * w
    case Rectangle(h, w) => h * w
}

// Computes the area of a 2 by 4.
def main(): Int = area(Rectangle(2, 4))
`}
                </Editor>

                <p>
                    Here is a Flix program using polymorphic records:
                </p>

                <Editor flix={this.props.flix}>
                    {`/// Returns the area of the rectangle \`r\`.
/// The record \`r\` must have \`x\` and \`y\` labels, and no other labels.
def area(r: {x: Int, y: Int}): Int = r.x * r.y

/// Computes the area of various rectangle records.
/// Note that the order of labels is immaterial.
def areas(): List[Int] =
    area({x = 1, y = 2}) ::
    area({y = 2, x = 3}) :: Nil

/// Returns the area of the polymorphic record \`r\`.
/// Note that the use of the type variable \`a\` permits the record \`r\`
/// to have labels other than \`x\` and \`y\`.
def polyArea[a](r: {x: Int, y: Int | a}): Int = r.x * r.y

/// Computes the area of various rectangle records.
/// Note that some records have additional fields.
def polyAreas(): List[Int] =
    polyArea({x = 1, y = 2}) ::
    polyArea({x = 2, y = 3, z = 4}) :: Nil

def main(): List[Int] = polyAreas()
`}
                </Editor>

                <p>
                    and here is one using processes and channels:
                </p>

                <Editor flix={this.props.flix}>
                    {`/// A function that sends every element of a list
def send(o: Channel[Int], l: List[Int]): Unit =
    match l with {
        case Nil     => ()
        case x :: xs => o <- x; send(o, xs)
    }

/// A function that receives n elements
/// and collects them into a list.
def recv(i: Channel[Int], n: Int): List[Int] =
    match n with {
        case 0 => Nil
        case _ => (<- i) :: recv(i, n - 1)
    }

/// A function that calls receive and sends the result on d.
def wait(i: Channel[Int], n: Int, d: Channel[List[Int]]): Unit =
    d <- recv(i, n);
    ()

/// Spawn a process for send and wait, and print the result.
def main(): List[Int] =
    let l = 1 :: 2 :: 3 :: Nil;
    let c = chan Int 100;
    let d = chan List[Int] 100;
    spawn send(c, l);
    spawn wait(c, List.length(l), d);
    <- d
`}
                </Editor>

            </Section>
        )
    }

}

export default Introduction
