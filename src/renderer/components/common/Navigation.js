import React from 'react';
import { Link } from 'react-router';
import Button from './Button';

export default class Navigation extends React.Component {
  render() {
    return (
      <div className='navigation'>
        <Link to={this.props.to} ><Button ptSize='large' glyph={this.props.glyph} /></Link>
      </div>
    );
  }
}
