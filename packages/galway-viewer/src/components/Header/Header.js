import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Header.scss';

class Header extends Component {
  render() {
    const { bem, onClickInfo, onClickMenu } = this.props;
    return (
      <header className={bem}>
        <button
          onClick={onClickMenu}
          className={`${bem.element('menu')} material-icons`}
        >
          menu
        </button>
        <span className={`${bem.element('title')} mdc-typography`}>
          O’Shaughnessy Memoirs
        </span>
        <button className={`${bem.element('share')} material-icons`}>
          share
        </button>
        <button
          onClick={onClickInfo}
          className={`${bem.element('info')} material-icons`}
        >
          info
        </button>
      </header>
    );
  }
}

export default withBemClass('header')(Header);
