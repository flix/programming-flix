import React from 'react'

import Editor from '../util/Editor';
import Section from "../components/Section";

class Introduction extends React.Component {

    render() {
        return (
            <Section name="Introduction to Flix">
                <p>
                    Flix is a principled and opinionated functional programming language that takes inspiration from F#,
                    Go, OCaml, Haskell, Rust, and Scala.
                </p>

                <p>
                    Flix visually resembles Scala, but its type system is closer to that of OCaml and Haskell. Its
                    concurrency model is inspired by Go-style processes and channels.
                </p>

                <p> Here is an example Flix program to show the flavour: </p>

                <Editor flix={this.props.flix}>
                    {`def main(): Bool = List.range(1, 100) |>
    List.map(x -> x * 2) |>
    List.exists(x -> x == 88)`}
                </Editor>
            </Section>
        )
    }

}

export default Introduction
