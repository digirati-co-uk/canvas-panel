import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Layout.scss';

class Layout extends Component {
  render() {
    const { bem, children, ...props } = this.props;
    return (
      <main className={bem} {...props}>
        {children}
      </main>
    );
  }
}

const StyledLayout = withBemClass('layout')(Layout);

StyledLayout.Header = withBemClass('layout')(({ children, bem }) => (
  <header className={bem.element('header')}>{children}</header>
));

StyledLayout.Main = withBemClass('layout')(({ children, bem }) => (
  <article className={bem.element('main')}>{children}</article>
));

StyledLayout.Footer = withBemClass('layout')(({ children, bem }) => (
  <footer className={bem.element('footer')}>{children}</footer>
));

export default StyledLayout;
