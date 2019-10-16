import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { withApollo } from 'react-apollo';
import ResultList from './Result';
import Categories from './Categories';

import { ReactComponent as SearchIcon } from './icons/magnifying-glass.svg';
import { ReactComponent as Loader } from './icons/loading-indicator.svg';
import { ReactComponent as Clear } from './icons/clear.svg';

const GET_SEARCH_RESULTS = gql`
  query getSearchResults($filter: String!, $category: SearchEntity!) {
    search(query: $filter, first: 5, entities: [$category]) {
      edges {
        node {
          displayLabel
          imageUrl
        }
      }
    }
  }
`;

class App extends Component {
  state = {
    filter: '',
    category: '',
    results: [],
    isLoading: false
  };

  onChange($event) {
    this.setState({ filter: $event.target.value });

    if (this.state.category && !this.state.isLoading) {
      this.search(this.state.category);
    }
  }

  selectCategory = category => {
    this.setState({ category: category });
    this.search(category);
  };

  search = async category => {
    const { filter } = this.state;
    this.setState({ isLoading: true });
    const result = await this.props.client.query({
      query: GET_SEARCH_RESULTS,
      variables: { filter: filter, category: category.toUpperCase() }
    });
    this.setState({ results: result.data.search.edges, isLoading: false });
  };

  clearSearch = () => {
    this.setState({ filter: '' });
  };

  render() {
    let loader, clear;
    if (this.state.isLoading) {
      loader = <Loader />;
    }

    if (this.state.filter.length && !this.state.isLoading) {
      clear = <Clear onClick={() => this.clearSearch()} />;
    }

    return (
      <div>
        <div className="search-bar-wrapper">
          <div className="search-bar-container">
            <div>
              <SearchIcon />
            </div>
            <div>
              <input
                type="text"
                className="search-bar"
                onChange={this.onChange.bind(this)}
                placeholder="Search by artist, gallery, style, theme, tag, etc."
              />
            </div>
            <div className="search-bar-right-icon">
              <div>{loader}</div>
              {clear}
            </div>
          </div>
          <div>
            <Categories
              selected={this.state.category}
              onClick={category => this.selectCategory(category)}
            />
          </div>
          <div>
            {!this.state.isLoading &&
              !this.state.results.length &&
              this.state.category &&
              this.state.filter && (
                <p className="no-results">No results found...</p>
              )}

            {this.state.results.map((result, i) => (
              <ResultList
                key={i}
                item={result.node}
                category={this.state.category}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(App);
