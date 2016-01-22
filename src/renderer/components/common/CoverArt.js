import React from 'react';
import classNames from 'classnames';
import { getPtClassSet } from './Utils';
import { getCoverArtURL } from '../../Utils';

export default class CoverArt extends React.Component { 
  render() {
    const ptClass = 'coverart';

    let classes = getPtClassSet(ptClass, this.props.size);
    const src = getCoverArtURL(this.props.id);


    const className = classNames(this.props.className, classes);
    return (
      <img src={src} alt='coverart' className={className} onError={this.onError} />
    );
  }

  onError(ev) {
    ev.target.src = '../../images/albumdefault.jpg';
  }
}

CoverArt.defaultProps = {
  size: 'default',
};
