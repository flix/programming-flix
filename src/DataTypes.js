import React from 'react'

import Code from './Code';
import Editor from './Editor';

class DataTypes extends React.Component {

    render() {
        return (
            <div className="section">
                <h3>User Defined Data Types</h3>



                <h4>Enumerated Types</h4>

                <Editor runProgram={this.props.runProgram} lines={5}>
                    {`enum Color {
    case Red,
    case Blue,
    case
}

def f(): Color = Red`}
                </Editor>

                <h4>Recursive Types</h4>

                <h4>Polymorphic Types</h4>

            </div>
        )
    }

}

export default DataTypes
