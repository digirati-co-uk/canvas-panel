import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Measure from 'react-measure';

import {
  FullPageViewport,
  SingleTileSource,
  withBemClass,
  OpenSeadragonViewport,
  AnnotationProvider,
  parseSelectorTarget,
} from '@canvas-panel/core';

import './SwappableView.scss';

//---------------------------------------
// NOTE: this code should not be in here
// just I've already created it when Stephen
// told me to NOT to. Obviosly, it is crutial
// to undersand that it is cannot stay, but
// on the other hand if, I don't have this
// here I cannot satisfy the requirements
// from Tom.
//---------------------------------------
function getEmbededAnnotations(canvas) {
  return (canvas.__jsonld.annotations || []).reduce((list, next) => {
    if (next.type === 'AnnotationPage') {
      return (next.items || []).reduce((innerList, annotation) => {
        innerList.push(annotation);
        return innerList;
      }, list);
    }
    if (next.type === 'Annotation') {
      list.push(next);
    }
    return list;
  }, []);
}

function createRegionFromAnnotations(canvas) {
  const viewportFocuses = getEmbededAnnotations(canvas).filter(
    annotation => annotation.motivation === 'layout-viewport-focus'
  );
  if (viewportFocuses.length > 0) {
    return parseSelectorTarget(
      viewportFocuses[0].target || viewportFocuses[0].on
    );
  }
}

class SwappableView extends Component {
  state = {
    isInteractive: false,
    itemWidth: 0,
    itemHeight: 0,
  };

  osdOptions = {
    visibilityRatio: 1,
    constrainDuringPan: true,
    showNavigator: false,
    immediateRender: false,
    preload: true,
  };

  static propTypes = {
    exitInteractiveModeButtonLabel: PropTypes.string,
    enterInteractiveModeButtonLabel: PropTypes.string,
    canvas: PropTypes.any,
    manifest: PropTypes.any,
  };

  static defaultProps = {
    exitInteractiveModeButtonLabel: 'Exit Interactive Mode',
    enterInteractiveModeButtonLabel: 'Explore',
  };

  setViewportToStatic = () => {
    this.setState({
      isInteractive: false,
    });
  };

  setViewportToInteractive = () => {
    this.setState({
      isInteractive: true,
    });
  };

  setViewport = viewport => {
    this.viewport = viewport;
    if (this.viewport && this.props.region) {
      this.viewport.goToRect(this.props.region, 0, 0);
    }
  };

  componentDidMount() {
    if (this.props.region) {
      this.viewport.goToRect(this.props.region, 0, 0.0000001);
    } else {
      const region = createRegionFromAnnotations(this.props.canvas);
      if (region) {
        this.setState({ region });
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.canvas !== this.props.canvas && this.state.viewport) {
      if (nextProps.region) {
        this.viewport.goToRect(nextProps.region, 0, 0.00000001);
      } else {
        const region = createRegionFromAnnotations(this.props.canvas);
        if (region) {
          this.setState({ region });
        }
      }
    }
  }

  render() {
    const { isInteractive, region } = this.state;
    const {
      manifest,
      canvas,
      exitInteractiveModeButtonLabel,
      enterInteractiveModeButtonLabel,
      bem,
    } = this.props;

    return (
      <div
        className={bem
          .element('viewport')
          .modifiers({ interactive: isInteractive })}
      >
        <SingleTileSource manifest={manifest} canvas={canvas}>
          <FullPageViewport
            setRef={this.setViewport}
            position="absolute"
            interactive={isInteractive}
          >
            <OpenSeadragonViewport
              useMaxDimensions={true}
              interactive={isInteractive}
              osdOptions={this.osdOptions}
              initialBounds={region}
            />
          </FullPageViewport>
        </SingleTileSource>
        {isInteractive ? (
          <button
            onClick={this.setViewportToStatic}
            className={bem.element('interactive-btn')}
          >
            {exitInteractiveModeButtonLabel}
          </button>
        ) : (
          <button
            onClick={this.setViewportToInteractive}
            className={bem.element('interactive-btn')}
          >
            {enterInteractiveModeButtonLabel}
          </button>
        )}
      </div>
    );
  }
}

export default withBemClass('slide')(SwappableView);
