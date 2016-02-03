import Component from '../Component';
import React from 'react';
import { Link } from 'react-router';
import { Icon, Input, CheckBox } from 'react-photonkit';
import Button from '../common/Button';
import { remote } from 'electron';
import GlobalShortcutItem from './GlobalShortcutItem.js';

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
      globalShortcut: this.configStore.isEnabledGS(),
      expandedSC: false,
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
    this.configAction.save(this.state);
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

  _handleGSCheck(ev) {
    this.setState({
      globalShortcut: ev.target.checked
    });
  }

  _handleExpandSC() {
    this.setState({
      expandedSC: !this.state.expandedSC
    });
  }

  render() {

    let expandSCIcon = 'left-dir';
    let tipsStyle = {
      display: 'none',
    }
    if (this.state.expandedSC) {
      expandSCIcon = 'down-dir';
      tipsStyle.display = 'block';
    }
    const tips = (
      <div className='tips' style={tipsStyle}>
        <GlobalShortcutItem text="Play / Pause" accelerator="Cmd/Ctrl + Shift + Space" />
        <GlobalShortcutItem text="Next Track" accelerator="Cmd/Ctrl + Shift + →" />
        <GlobalShortcutItem text="Previous Track" accelerator="Cmd/Ctrl + Shift + ←" />
        <GlobalShortcutItem text="Volume Up" accelerator="Cmd/Ctrl + Shift + ↑" />
        <GlobalShortcutItem text="Volume Down" accelerator="Cmd/Ctrl + Shift + ↓" />
      </div>
    );

    return (
      <div className="config">
       <Link to='/'><Icon className="homeIcon" glyph='cancel'/></Link>
        <div className='cog-title'>
          <Icon glyph='cog' withText={true} />
          <span>Configurations</span>
        </div>
        <form className='cog-form'>
          <div className="login">
            <Input label='Server' placeholder='Server' onChange={this._onServerChange.bind(this)} value={this.state.server} />
            <Input label='User' placeholder='User' onChange={this._onUserChange.bind(this)} value={this.state.user} />
            <Input type='password' label='Password' placeholder='Password' onChange={this._onPasswordChange.bind(this)} value={this.state.password} />
          </div>
          <CheckBox label='Enable Global Shortcut' checked={this.state.globalShortcut} onChange={this._handleGSCheck.bind(this)}/>
          <Icon glyph={expandSCIcon} title='View Shortcut' className='expandSC' onClick={this._handleExpandSC.bind(this)}/>
          {tips}
        <div className="btnContainer">
          <Button text='Save' onClick={this._handleSave.bind(this)} />
          <Button text="Demo" onClick={this._handleDemoClick.bind(this)} />
        </div>
        </form>
        <Link to='/'><Button className="homeBtn" text='Home' /></Link>
      </div>
    );
  }
}
