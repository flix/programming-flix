import React from 'react'
import { Alert } from 'reactstrap'

class Warning extends React.Component {
  render() {
    return (
      <Alert color="warning">
        <i>Warning:</i> {this.props.children}
      </Alert>
    )
  }
}

export default Warning
