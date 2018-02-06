/**
 * @flow
 */
import React, { Component, type Node } from 'react';
import createReactContext from 'create-react-context';
import BEM from 'digirati-bem-js';

const defaultContext = {
  prefix: '',
  cssClassMap: {},
};

// Flow bem
export type BemBlockType = {
  element(name: string): BemElementType | string,
  modifier(name: string): BemBlockType | string,
  modifiers({ [string]: boolean }): BemBlockType | string,
};

export type BemElementType = {
  modifier(name: string): BemElementType | string,
};

export type BemType = {
  block(name: string): BemBlockType | string,
};

const BemContext = createReactContext(defaultContext);

type Context = {
  prefix: string,
  cssClassMap: { [string]: string },
};

type Props = {
  ...Context,
  children: Node,
};

class Bem extends Component<Props> {
  static defaultProps = Object.assign({}, defaultContext);

  render() {
    const { children, prefix, cssClassMap } = this.props;
    return (
      <BemContext.Provider
        value={{
          prefix,
          cssClassMap,
        }}
      >
        {children}
      </BemContext.Provider>
    );
  }
}

function constructBemFromContext(
  className: string,
  ctx: Context
): BemBlockType {
  if (ctx.cssClassMap[className]) {
    return BEM.block(`${ctx.prefix}${ctx.cssClassMap[className]}`);
  }
  return BEM.block(`${ctx.prefix}${className}`);
}

export function withBemClass(className: string) {
  return (WrappedComponent: any) => {
    return class extends Component<any> {
      render() {
        return (
          <BemContext.Consumer>
            {bemCtx => (
              <WrappedComponent
                {...this.props}
                bem={constructBemFromContext(
                  className,
                  Object.assign({}, defaultContext, bemCtx)
                )}
              />
            )}
          </BemContext.Consumer>
        );
      }
    };
  };
}

export default Bem;
