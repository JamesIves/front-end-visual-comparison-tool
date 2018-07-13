import React, { Component } from 'react';

class Diff extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showOverlay: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      showOverlay: !this.state.showOverlay
    })
  }

  render() {
    return (
      <div>
        <img src={this.state.showOverlay ? this.props.overlay : this.props.src} onClick={this.handleClick} />
      </div>
    )
  }
}

export default Diff;