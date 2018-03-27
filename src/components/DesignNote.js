import React from 'react'

class DesignNote extends React.Component {
    render() {
        return (
            <p className="design-note">
                <i>Design Note:</i> {this.props.children}
            </p>
        )
    }
}

export default DesignNote
