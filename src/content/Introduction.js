import React from 'react'
import ReactGA from "react-ga";

import Section from "../components/Section";
import CodeBlock from "../util/CodeBlock";

class Introduction extends React.Component {

    componentDidMount() {
        document.title = "Programming Flix | Introduction";
        ReactGA.pageview(window.location.href);
    }

    render() {
        return (
            <Section name="Introduction to Flix">

                <p>
                    Flix is a principled functional, logic, and imperative programming language
                    developed at <a href="https://cs.au.dk/">Aarhus University</a>, at the <a
                    href="https://uwaterloo.ca/">University of Waterloo</a>, and by a community of <a
                    href="https://github.com/flix/flix">open source contributors</a>.
                </p>

                <p>
                    Flix is inspired by OCaml and Haskell with ideas from Rust and Scala. Flix looks like
                    Scala, but its type system is based on Hindley-Milner. Two unique features
                    of Flix are its polymorphic effect system and its support for first-class Datalog
                    constraints. Flix compiles to efficient JVM bytecode, runs on the Java Virtual Machine, and supports
                    full tail call elimination.
                </p>

                <p>
                    Here are a few Flix programs to illustrate the look and feel of the language:
                </p>

                <p>
                    This program illustrates the use of algebraic data types and pattern matching:
                </p>

                <CodeBlock>
                    {`/// An algebraic data type for shapes.
enum Shape {
    case Circle(Int),        // circle radius
    case Square(Int),        // side length
    case Rectangle(Int, Int) // height and width
}

/// Computes the area of the given shape using
/// pattern matching and basic arithmetic.
def area(s: Shape): Int = match s {
    case Circle(r)       => 3 * (r * r)
    case Square(w)       => w * w
    case Rectangle(h, w) => h * w
}

// Computes the area of a 2 by 4.
def main(_args: Array[String]): Int32 & Impure = 
    area(Rectangle(2, 4)) |> println;
    0
`}
                </CodeBlock>

                <p>
                    Here is a Flix program using polymorphic records:
                </p>

                <CodeBlock>
                    {`/// Returns the area of the polymorphic record \`r\`.
/// Note that the use of the type variable \`a\` permits the record \`r\`
/// to have labels other than \`x\` and \`y\`.
def polyArea[a : RecordRow](r: {x:: Int, y:: Int | a}): Int = r.x * r.y

/// Computes the area of various rectangle records.
/// Note that some records have additional fields.
def polyAreas(): List[Int] =
    polyArea({x = 1, y = 2}) ::
    polyArea({x = 2, y = 3, z = 4}) :: Nil

def main(_args: Array[String]): Int32 & Impure = 
    polyAreas() |> println;
    0
`}
                </CodeBlock>

                <p>
                    and here is one using processes and channels:
                </p>

                <CodeBlock>
                    {`/// A function that sends every element of a list
def send(o: Channel[Int], l: List[Int]): Unit & Impure =
    match l {
        case Nil     => ()
        case x :: xs => o <- x; send(o, xs)
    }

/// A function that receives n elements
/// and collects them into a list.
def recv(i: Channel[Int], n: Int): List[Int] & Impure =
    match n {
        case 0 => Nil
        case _ => (<- i) :: recv(i, n - 1)
    }

/// A function that calls receive and sends the result on d.
def wait(i: Channel[Int], n: Int, d: Channel[List[Int]]): Unit & Impure =
    d <- recv(i, n);
    ()

/// Spawn a process for send and wait, and print the result.
def main(_args: Array[String]): Int32 & Impure =
    let l = 1 :: 2 :: 3 :: Nil;
    let c = chan Int 100;
    let d = chan List[Int] 100;
    spawn send(c, l);
    spawn wait(c, List.length(l), d);
    println(<- d);
    0
`}
                </CodeBlock>

            </Section>
        )
    }

}

export default Introduction
