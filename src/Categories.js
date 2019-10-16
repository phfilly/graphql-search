import React, { Component } from 'react';

class Categories extends Component {
  state = {
    items: [
      'Artist',
      'Artwork',
      'Article',
      'City',
      'Collection',
      'Fair',
      'Feature',
      'Gallery',
      'Gene',
      'Institution',
      'Profile',
      'Sale',
      'Show',
      'Tag'
    ]
  };

  render() {
    return (
      <div className="category-list">
        {this.state.items.map((item, i) => (
          <div
            className={this.props.selected === item ? 'is-selected' : ''}
            key={i}
            onClick={() => this.props.onClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
