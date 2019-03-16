import React from 'react'

class SubSection extends React.Component {
    render() {
        return (
            <div className="asubsection">
                <h2>{this.props.name}</h2>
                {this.props.children}
            </div>
        )
    }
}

export default SubSection
