import Component from './Component';
import React from 'react';
import { Link } from 'react-router';
import { Icon, Input } from 'react-photonkit';
import Button from './common/Button';
import { remote } from 'electron';

const dialog = remote.dialog;

export default class Config extends Component {
  constructor(...args) {
    super(...args);
    this.configStore = this.context.stores.configStore;
    this.configAction = this.context.actions.configAction;

    this.state = {
      server: this.configStore.getServer(),
      user: this.configStore.getUser(),
      password: this.configStore.getPassword(),
    };
  }

  componentDidMount() {
    this.configStore.onChange(this._onSave.bind(this));
  }

  componentWillUnmount() {
    this.configStore.removeAllChangeListeners();
  }

  _onSave() {
    location.hash = "/";
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

  _handleDemoClick(ev) {
    ev.preventDefault();
    const ret = confirm("Do you want to connect to the Subsonic Demo Server?");
    if (ret) {
      const server = "demo.subsonic.org";
      const user = "guest1";
      const password = "guest";
      this.configAction.save(server, user, password);
    }
  }

  render() {
    return (
      <div className="config">
        <div className='cog-title'>
          <Icon glyph='cog' withText={true} />
          <span>Configurations</span>
        </div>
        <Link to='/'><Button text='Home' /></Link>
        <form className='cog-form'>
          <Input label='Server' placeholder='Server' onChange={this._onServerChange.bind(this)} value={this.state.server} />
          <Input label='User' placeholder='User' onChange={this._onUserChange.bind(this)} value={this.state.user} />
          <Input type='password' label='Password' placeholder='Password' onChange={this._onPasswordChange.bind(this)} value={this.state.password} />
        <div className="btnContainer">
          <Button text='Save' onClick={this._handleSave.bind(this)} />
          <Button text="Demo" onClick={this._handleDemoClick.bind(this)} />
        </div>
        </form>
      </div>
    );
  }
}
