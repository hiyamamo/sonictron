import React from 'react';
import { NavTitle } from 'react-photonkit';
import NavItem from './NavItem';

export default class ArtistList extends React.Component {

  render() {
    let artists = <div></div>;
    if (this.props.items != null) {
      const index = this.props.items.index;
      artists = index.map((i) => {
        const artists = i.artist.map((a) => {
          return <NavItem key={a.id} onClick={this.props.onClick} value={a.id} text={a.name} />
        });
        return (
          <div key={i.name}>
            <NavTitle>#{i.name}</NavTitle>
            {artists}
          </div>
         );
      });
    }

    return (
      <div className='artistList'>
        <NavTitle>Artists</NavTitle>
        {artists}
      </div>
    );
  }
}

