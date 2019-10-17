import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import ResultList from './Results/Result';
import Categories from './Categories/Categories';
import GET_SEARCH_RESULTS from './Api/api';

import { ReactComponent as SearchIcon } from './Icons/magnifying-glass.svg';
import { ReactComponent as Loader } from './Icons/loading-indicator.svg';
import { ReactComponent as Clear } from './Icons/clear.svg';

class App extends Component {
  state = {
    filter: '',
    category: '',
    results: [],
    isLoading: false,
    focus: false
  };

  onChange($event) {
    this.setState({ filter: $event.target.value });

    if (this.state.category && !this.state.isLoading) {
      this.search(this.state.category);
    }
  }

  onFocus() {
    this.setState({ focus: true });
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
    this.setState({ filter: '', focus: false });
  };

  render() {
    const { filter, category, isLoading, results, focus } = this.state;
    let loader, clear;
    if (isLoading) {
      loader = <Loader />;
    }

    if (filter.length && !isLoading) {
      clear = <Clear onClick={() => this.clearSearch()} />;
    }

    return (
      <div>
        <div className="search-bar-wrapper">
          <div className="search-bar-container">
            <div>
              <SearchIcon className={focus ? 'focus' : ''} />
            </div>
            <div>
              <input
                type="text"
                className="search-bar"
                onChange={this.onChange.bind(this)}
                onFocus={this.onFocus.bind(this)}
                value={filter}
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
              selected={category}
              onClick={category => this.selectCategory(category)}
            />
          </div>
          <div>
            {!isLoading && !results.length && category && filter && (
              <p className="no-results">No results found...</p>
            )}

            {results.map((result, i) => (
              <ResultList key={i} item={result.node} category={category} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(App);
