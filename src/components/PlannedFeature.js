import React from 'react'

class PlannedFeature extends React.Component {
    render() {
        return (
            <p className="planned-feature">
                <i>Planned Feature:</i> {this.props.children}
            </p>
        )
    }
}

export default PlannedFeature
