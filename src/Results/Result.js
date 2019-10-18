import React, { Component } from 'react';
import { ReactComponent as Placeholder } from '../Icons/photo.svg';
import './Result.css';

class ResultList extends Component {
  truncateText = title => {
    return title.length > 10 ? title.substring(0, 40) + '...' : title;
  };

  render() {
    let image;
    const category = this.props.item.href.split('/')[1];
    if (this.props.item.imageUrl) {
      image = (
        <img src={this.props.item.imageUrl} alt="item" className="image" />
      );
    } else {
      image = (
        <div className="placeholder-image">
          <Placeholder />
        </div>
      );
    }

    return (
      <div className="result-item">
        <div>
          <span className="result-title">
            {this.truncateText(this.props.item.displayLabel)}
          </span>
          {image}
        </div>
        <div className="sub-title">{category}</div>
      </div>
    );
  }
}

export default ResultList;