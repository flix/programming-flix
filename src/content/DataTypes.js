import React from 'react'
import Code from '../components/Code';
import Editor from '../components/Editor';

class DataTypes extends React.Component {

    render() {
        return (
            <section>
                <h1>User-Defined Data Types</h1>

                <p>
                    As we have seen, Flix comes with a collection of built-in data types. These includes base types,
                    such as booleans, floats and integers, and compound types, such as tuples. Moreover, the Flix
                    standard library defines types such as <Code>Option[a]</Code>, <Code>Result[t,
                    e]</Code>, <Code>List[a]</Code>, <Code>Set[a]</Code>, and <Code>Map[k, v]</Code>. In addition, Flix
                    allows users to define their own data types, including <i>enumerated types</i>, <i>recursive
                    types</i>, and <i>polymorphic types</i>.
                </p>

                <h2>Enumerated Types</h2>

                <p>
                    Enumerated types are used to define a type that a finite sequence of values. Enumerated types are
                    useful for thing such as modeling a set of primary colors, a deck of cards, the compass directions,
                    and so forth.
                </p>

                <p>For example, here is how to define an enum for the three colors: red, green, and blue:</p>

                <Editor runProgram={this.props.runProgram} main={false} lines={5}>
                    {`enum Color {
    case Red,
    case Green,
    case Blue
}`}
                </Editor>



                <h2>Recursive Types</h2>

                <h2>Polymorphic Types</h2>

            </section>
        )
    }

}

export default DataTypes
