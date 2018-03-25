import React from 'react'

class Code extends React.Component {
    render() {
        return (
            <span className="code">{this.props.children}</span>
        )
    }
}

export default Code
