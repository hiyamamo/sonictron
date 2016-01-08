import Component from './Component';
import React from 'react';

export default class Config extends Component {
  constructor(...args) {
    super(...args);
    this.configStore = this.context.stores.configStore;
    this.configAction = this.context.actions.configAction;

    this.state = {
      server: this.configStore.getServer(),
      user: this.configStore.getUser(),
      password: '',
    };
  }

  componentDidMount() {
    this.configStore.onChange(this._onSave.bind(this));
  }

  componentWillUnmount() {
    this.configStore.removeAllChangeListeners();
  }

  _onSave() {
    console.log('Save');
  }

  _handleSave(ev) {
    ev.preventDefault();
    this.configAction.save(this.state.server, this.state.user, this.state.password);
  }

  _onServerChange(event) {
    this.setState({
      server: event.target.value,
    });
  }

  _onUserChange(event) {
    this.setState({
      user: event.target.value,
    });
  }

  _onPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div className="config">
        <p>server</p>
        <input type="text" onChange={this._onServerChange.bind(this)} value={this.state.server} ></input>
        <p>user</p>
        <input type="text" onChange={this._onUserChange.bind(this)} value={this.state.user} ></input>
        <p>password</p>
        <input type="password" onChange={this._onPasswordChange.bind(this)} value={this.state.password} ></input>
        <button onClick={this._handleSave.bind(this)} >save</button>
      </div>
    );
  }
}

Config.prototype.History = History;
