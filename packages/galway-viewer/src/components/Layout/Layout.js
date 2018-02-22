/**
 * @flow
 */
import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Layout.scss';

type Props = {
  bem: any,
  header: void => any,
  content: void => any,
  footer: void => any,
};

class Layout extends Component<Props> {
  render() {
    const { bem, header, content, footer, ...props } = this.props;

    return (
      <main className={bem} {...props}>
        <header className={bem.element('header')}>{header()}</header>
        <section className={bem.element('content')}>{content()}</section>
        <footer className={bem.element('footer')}>{footer()}</footer>
      </main>
    );
  }
}

export default withBemClass('layout')(Layout);
