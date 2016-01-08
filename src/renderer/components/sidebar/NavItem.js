import React from 'react';

export default class NavItem extends React.Component {
  render() {
    return <a className='nav-group-item' onClick={this.handleClick.bind(this)} ><span>{this.props.text}</span></a>
  }

  handleClick(ev) {
    this.props.onClick(ev, this.props.value, this.props.text);
  }
}
