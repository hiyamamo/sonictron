import { FoldersConstants } from '../constants/Constants';
import { Store } from 'material-flux';

const LOAD_EVENT = 'load';

export default class FoldersStore extends Store {
  constructor(context) {
    super(context);

    this.state = {
      folders: null,
    };

    this.register(FoldersConstants.LOAD_FOLDERS, this._load);
  }

  getFolders() {
    return this.state.folders;
  }


  _load(folders) {
    this.setState({
      folders: folders,
    });
  }

}

