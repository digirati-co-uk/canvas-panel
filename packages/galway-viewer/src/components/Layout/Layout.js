import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Layout.scss';

class Layout extends Component {
  render() {
    const { bem, header, content, footer } = this.props;

    return (
      <main className={bem}>
        <header className={bem.element('header')}>{header()}</header>
        <section className={bem.element('content')}>{content()}</section>
        <footer className={bem.element('footer')}>{footer()}</footer>
      </main>
    );
  }
}

export default withBemClass('layout')(Layout);
