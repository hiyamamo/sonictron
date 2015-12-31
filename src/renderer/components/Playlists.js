import Component from './Component';
import React from 'react';
import { NavTitle, NavGroupItem } from 'react-photonkit';

export default class Playlists extends Component {
  render() {
    let playlists = null;
    if (this.props.playlists !== null){
      playlists = this.props.playlists.map((p) => {

        return <NavGroupItem key={p.id} eventKey={p.id} text={p.name} />;
      });
    }

    return (
      <div className='playlists'>
        <NavTitle>Playlists</NavTitle>
        {playlists}
      </div>
    );
  }
}
