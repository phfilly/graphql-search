import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import Search from './search/Search';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default withApollo(App);
