import React, { Component } from 'react';
import './Category.css';
import fullCategoryList from './list';

class Categories extends Component {
  state = {
    items: fullCategoryList
  };

  render() {
    return (
      <div className="category-list">
        {this.state.items.map((item, i) => (
          <div
            className={this.props.selected === item.value ? 'is-selected' : ''}
            key={i}
            onClick={() => this.props.onClick(item.value)}
          >
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
