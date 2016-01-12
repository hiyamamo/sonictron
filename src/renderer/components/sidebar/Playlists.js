import React from 'react';
import { NavTitle } from 'react-photonkit';
import NavItem from './NavItem';

export default class Playlists extends React.Component {
  render() {
    let playlists = null;
    if (this.props.playlists !== null){
      playlists = this.props.playlists.map((p) => {

        return <NavItem key={p.id} onClick={this.props.onClick} value={p.id} text={p.name} />;
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
