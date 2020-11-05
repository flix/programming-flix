import React from 'react'

class SubSubSection extends React.Component {
  render() {
    return (
      <div className="asubsubsection">
        <h3>{this.props.name}</h3>
        {this.props.children}
      </div>
    )
  }
}

export default SubSubSection
