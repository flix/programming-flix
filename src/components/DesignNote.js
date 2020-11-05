import React from 'react'
import { Alert } from 'reactstrap'

class DesignNote extends React.Component {
  render() {
    return (
      <Alert color="info">
        <i>Design Note:</i> {this.props.children}
      </Alert>
    )
  }
}

export default DesignNote
