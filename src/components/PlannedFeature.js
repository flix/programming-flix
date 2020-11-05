import React from 'react'
import { Alert } from 'reactstrap'

class PlannedFeature extends React.Component {
  render() {
    return (
      <Alert color="secondary">
        <i>Planned Feature:</i> {this.props.children}
      </Alert>
    )
  }
}

export default PlannedFeature
