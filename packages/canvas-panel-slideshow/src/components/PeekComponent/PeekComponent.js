import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { withBemClass } from '@canvas-panel/core';
import './PeekComponent.scss';

class PeekComponent extends Component {
  static defaultProps = {
    threshold: 75,
    customOffset: 0,
    lastOffset: 0,
    onNext: () => null,
    onPrevious: () => null,
  };

  state = { down: false, revert: false, lastOffset: 0, isTransitioning: false };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.down && nextProps.down === false) {
      if (
        this.props.customOffset >= nextProps.threshold &&
        this.props.index !== 0
      ) {
        nextProps.onPrevious();
      } else if (
        this.props.customOffset <= -nextProps.threshold &&
        this.props.index + 1 < this.props.size
      ) {
        nextProps.onNext();
      }
    }
  }

  render() {
    const {
      down,
      customOffset,
      index,
      renderLeft,
      renderRight,
      children,
      bem,
    } = this.props;
    const x = customOffset;
    const shouldAnimate = down === false;

    return (
      <div className={bem}>
        <div className={bem.element('inner')}>
          <FlipMove
            typeName={null}
            enterAnimation="none"
            leaveAnimation="none"
            duration={300}
          >
            <div
              key={index - 1}
              className={bem.element('wing').modifier('left')}
              style={{
                left: `calc(-100% + ${x - 20}px)`,
                transition: shouldAnimate ? 'left .2s' : null,
              }}
            >
              {renderLeft()}
            </div>
            <div
              key={index}
              className={bem.element('wing').modifier('center')}
              style={{
                left: !down ? `calc(0px + ${x}px)` : null,
              }}
            >
              {children}
            </div>
            <div
              className={bem.element('wing').modifier('right')}
              key={index + 1}
              style={{
                left: `calc(100% + ${x + 20}px)`,
                transition: shouldAnimate ? 'left .2s' : null,
              }}
            >
              {renderRight()}
            </div>
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default withBemClass('peek-component')(PeekComponent);
