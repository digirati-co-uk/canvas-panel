import React from 'react';
import PropTypes from 'prop-types';
import detectIt from 'detect-it';
import AnnotationResizers from './AnnotationResizers';

const clearSelection = () => {
  var selection = window.getSelection
    ? window.getSelection()
    : document.selection
      ? document.selection
      : null;
  if (!!selection) {
    if (selection.empty) {
      selection.empty();
    } else {
      selection.removeAllRanges();
    }
  }
};

export default class EditableAnnotation extends React.Component {
  state = {
    mouseX: 0,
    mouseY: 0,
    dX: 0,
    dY: 0,
    dWidth: 0,
    dHeight: 0,
    dragStarted: false,
    resizeStarted: false,
  };

  static defaultStyles = {
    outline: '1px solid skyblue',
    background: 'rgba(135, 206, 235, 0.3)',
    pointerEvents: 'all',
    transformOrigin: '0 0',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  static propTypes = {
    boxStyles: PropTypes.object,
    boxSizeInt: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    boxStyles: {},
    boxSizeInt: true,
  };

  componentWillReceiveProps() {
    this.detachNativeHandlers();
    clearSelection();
  }

  attachNativeHandlers = () => {
    if (detectIt.hasMouse) {
      document.addEventListener('mousemove', this.onPointerMove);
      document.addEventListener('mouseup', this.onPointerUp);
    }
    if (detectIt.hasTouch) {
      document.addEventListener('touchmove', this.onPointerMove, {
        passive: false,
      });
      document.addEventListener('touchend', this.onPointerUp, {
        passive: false,
      });
    }
  };

  detachNativeHandlers = () => {
    if (detectIt.hasMouse) {
      document.removeEventListener('mousemove', this.onPointerMove);
      document.removeEventListener('mouseup', this.onPointerUp);
    }
    if (detectIt.hasTouch) {
      document.removeEventListener('touchmove', this.onPointerMove);
      document.removeEventListener('touchend', this.onPointerUp);
    }
  };

  onPointerMove = ev => {
    if (ev.type !== 'mousemove' && ev.touches.length !== 1) {
      return;
    }
    if (ev.type === 'mousemove') {
      ev.stopPropagation();
    } else if (ev.type === 'touchmove') {
      ev.preventDefault();
    }
    clearSelection();
    const X = ev.type === 'mousemove' ? ev.pageX : ev.touches[0].pageX;
    const Y = ev.type === 'mousemove' ? ev.pageY : ev.touches[0].pageY;
    const { position, ratio } = this.props;
    const zam = position ? position.zoom * (1 / ratio) : 1;
    const rzam = 1 / zam;
    if (this.state.dragStarted) {
      this.dragMove(X, Y, rzam);
    } else if (this.state.resizeStarted) {
      this.resizeMove(X, Y, rzam);
    }
  };

  onPointerUp = ev => {
    clearSelection();
    if (ev.type === 'mouseup') {
      ev.stopPropagation();
    } else if (ev.type === 'touchend') {
      ev.preventDefault();
    }
    this.detachNativeHandlers();
    if (this.state.dragStarted) {
      this.dragEnd();
    } else if (this.state.resizeStarted) {
      this.resizeEnd();
    }
  };

  dragStart = ev => {
    if (ev.type === 'mousedown') {
      ev.stopPropagation();
    } else if (ev.type === 'touchstart') {
      ev.preventDefault();
    }
    this.attachNativeHandlers();
    this.setState({
      mouseX: ev.type === 'mousedown' ? ev.pageX : ev.touches[0].pageX,
      mouseY: ev.type === 'mousedown' ? ev.pageY : ev.touches[0].pageY,
      dX: 0,
      dY: 0,
      dWidth: 0,
      dHeight: 0,
      dragStarted: true,
      resizeStarted: false,
    });
  };

  dragMove = (X, Y, rzam) => {
    if (this.props.setCoords && this.state.dragStarted) {
      this.setState({
        dX: this.applyPrecision((X - this.state.mouseX) * rzam),
        dY: this.applyPrecision((Y - this.state.mouseY) * rzam),
        dragStarted: true,
        resizeStarted: false,
      });
    }
  };

  dragEnd = () => {
    this.props.setCoords({
      x: this.props.x + this.state.dX,
      y: this.props.y + this.state.dY,
    });
    this.setState({
      dragStarted: false,
      resizeStarted: false,
      dX: 0,
      dY: 0,
    });
  };

  resizeStart = direction => ev => {
    clearSelection();
    ev.stopPropagation();
    this.attachNativeHandlers();
    this.setState({
      mouseX: ev.type === 'mousedown' ? ev.pageX : ev.touches[0].pageX,
      mouseY: ev.type === 'mousedown' ? ev.pageY : ev.touches[0].pageY,
      dWidth: 0,
      dHeight: 0,
      dX: 0,
      dY: 0,
      resizeStarted: direction,
      dragStarted: false,
    });
  };

  resizeMove = (X, Y, rzam) => {
    if (this.props.setCoords && this.state.resizeStarted) {
      if (!this.state.resizeStarted) {
        return;
      }
      const newState = {
        dragStarted: false,
      };
      if (this.state.resizeStarted.startsWith('n')) {
        newState.dHeight = this.applyPrecision(
          -((Y - this.state.mouseY) * rzam)
        );
        newState.dY = this.applyPrecision((Y - this.state.mouseY) * rzam);
      }
      if (this.state.resizeStarted.startsWith('s')) {
        newState.dHeight = this.applyPrecision((Y - this.state.mouseY) * rzam);
      }
      if (this.state.resizeStarted.endsWith('e')) {
        newState.dWidth = this.applyPrecision((X - this.state.mouseX) * rzam);
      }
      if (this.state.resizeStarted.endsWith('w')) {
        newState.dWidth = this.applyPrecision(-(X - this.state.mouseX) * rzam);
        newState.dX = this.applyPrecision((X - this.state.mouseX) * rzam);
      }
      this.setState(newState);
    }
  };

  resizeEnd = () => {
    this.props.setCoords({
      width: this.applyPrecision(this.props.width + this.state.dWidth),
      height: this.applyPrecision(this.props.height + this.state.dHeight),
      x: this.applyPrecision(this.props.x + this.state.dX),
      y: this.applyPrecision(this.props.y + this.state.dY),
    });
    this.setState({
      resizeStarted: false,
      dragStarted: false,
      dWidth: 0,
      dHeight: 0,
      dX: 0,
      dY: 0,
    });
  };

  applyPrecision = value => {
    return this.props.boxSizeInt ? parseInt(value, 10) : value;
  };

  render() {
    const { x, y, width, height, children, boxStyles } = this.props;
    const X = this.applyPrecision(x) + this.state.dX;
    const Y = this.applyPrecision(y) + this.state.dY;
    return (
      <div
        style={{
          ...EditableAnnotation.defaultStyles,
          ...boxStyles,
          transform: `translate(${X}px, ${Y}px)`,
          width: this.applyPrecision(width) + this.state.dWidth,
          height: this.applyPrecision(height) + this.state.dHeight,
        }}
        onMouseDown={this.dragStart}
        onTouchStart={this.dragStart}
      >
        {children}
        <AnnotationResizers resizeStart={this.resizeStart} />
      </div>
    );
  }
}
