import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <main className="row">
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;