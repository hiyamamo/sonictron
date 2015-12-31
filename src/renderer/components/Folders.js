import Component from './Component';
import React from 'react';
import { NavTitle } from 'react-photonkit';

export default class Folders extends Component {
  render() {
    let items = null;
    let folderGroup = null;
    if (this.props.items !== null) {
      items = this.props.items.map((m) => {
        return <option key={m.id} value={m.id}>{m.name}</option>
      });
      folderGroup = <select onChange={this.props.onChangeSelect} value={this.props.selected} ><option value='all' >all</option>{items}</select>
    }
    return (
      <div className='folders'>
        <NavTitle>Folders</NavTitle>
        {folderGroup}
      </div>
    );
  }
}
