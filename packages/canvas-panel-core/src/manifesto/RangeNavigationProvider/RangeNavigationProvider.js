/**
 * @flow
 */
import React, { Component } from 'react';
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import functionOrMapChildren from '../../utility/functionOrMapChildren';
import extractCanvasAndRegionsFromRange from '../../utility/extractCanvasAndRegionsFromRange';

type Props = {
  manifest: Manifesto.Manifest,
  rangeId?: string, // defaults to top level.
  rangeViewingHint?: string, // @todo later for selecting range.
  fallbackToTop: boolean,
  fallbackToSequence: boolean,
  children: any,
  // For controlled input
  currentIndex?: number,
  onNavigate: (index: number, canvasId: string) => void,
  controlled: boolean,
};

type State = {
  currentIndex: number,
  currentRange: ?string,
  currentRangeObject: ?Manifesto.Range,
  canvasList: Array<string>,
  regionList: Array<any>,
};

type RangeLike = {
  range: ?Manifesto.Range,
  canvasList: Array<string>,
  regionList: Array<any>,
  id: string,
};

class RangeNavigationProvider extends Component<Props, State> {
  state = {
    currentIndex: 0,
    currentRangeObject: null,
    currentRange: null,
    canvasList: [],
    regionList: [],
  };

  static defaultProps = {
    fallbackToTop: true,
    fallbackToSequence: true,
    controlled: false,
  };

  componentWillMount() {
    const matchingRange = this.getMatchingRange(this.props);
    if (matchingRange) {
      return this.setState({
        currentRangeObject: matchingRange.range,
        currentRange: matchingRange.id,
        canvasList: matchingRange.canvasList,
        regionList: matchingRange.regionList || [],
      });
    }
  }

  getMatchingRange({ manifest, rangeId, rangeViewingHint }: Props): RangeLike {
    const allRanges: Array<Manifesto.Range> = manifest.getAllRanges();

    const matchingRange: Manifesto.Range = allRanges.reduce(
      (match, next: Manifesto.Range) => {
        if (match) return match;

        // Allow exact match range.
        if (rangeId && next.id === rangeId) {
          return next;
        }

        // Allow by viewing hint.
        if (
          rangeViewingHint &&
          next.getViewingHint() &&
          next.getViewingHint().toString() === rangeViewingHint
        ) {
          return next;
        }

        // Also allow sequences.
        if (
          next.getBehavior() &&
          next.getBehavior().toString() === 'sequence'
        ) {
          return next;
        }

        return null;
      },
      null
    );

    if (matchingRange) {
      const { canvases, regions } = extractCanvasAndRegionsFromRange(
        matchingRange
      );

      return {
        range: matchingRange,
        id: matchingRange.id,
        canvasList: canvases,
        regionList: regions,
      };
    }

    return {
      range: null,
      id: manifest.id,
      regionList: [], // @todo maybe points of interest will be somewhere else?
      canvasList: manifest
        .getSequenceByIndex(0)
        .getCanvases()
        .map((canvas: Manifesto.Canvas) => canvas.id),
    };
  }

  componentWillReceiveProps(newProps: Props, newContext: any) {
    if (
      newProps.currentIndex !== this.props.currentIndex &&
      newProps.currentIndex !== this.state.currentIndex
    ) {
      // We have a controlled input.
      this.setState({ currentIndex: newProps.currentIndex });
    }

    if (
      newProps.rangeId !== this.props.rangeId ||
      newProps.rangeViewingHint !== this.props.rangeViewingHint ||
      newProps.manifest !== this.props.manifest
    ) {
      const matchingRange = this.getMatchingRange(this.props);
      this.setState({
        currentRangeObject: matchingRange.range,
        currentRange: matchingRange.id,
        canvasList: matchingRange.canvasList,
        regionList: matchingRange.regionList || [],
      });
    }
  }

  nextRange = () => {
    const { currentIndex, canvasList } = this.state;

    if (currentIndex >= canvasList.length - 1) {
      return;
    }

    this.goToRange(currentIndex + 1);
  };

  previousRange = () => {
    const { currentIndex } = this.state;

    if (currentIndex === 0) {
      return;
    }

    this.goToRange(currentIndex - 1);
  };

  goToRange = (newIndex: number) => {
    const { controlled } = this.props;
    const { canvasList } = this.state;

    if (controlled === false) {
      this.setState({
        currentIndex: newIndex,
      });
    }

    if (this.props.onNavigate) {
      this.props.onNavigate(newIndex, canvasList[newIndex]);
    }
  };

  render() {
    const { children, ...props } = this.props;
    const {
      currentIndex,
      currentRange,
      canvasList,
      regionList,
      currentRangeObject,
    } = this.state;

    if (!props.manifest) {
      return null;
    }

    const canvas =
      canvasList.length !== 0
        ? props.manifest
            .getSequenceByIndex(0)
            .getCanvasById(canvasList[currentIndex])
        : null;

    const region = regionList.length !== 0 ? regionList[currentIndex] : null;

    return functionOrMapChildren(children, {
      ...props,
      nextRange: this.nextRange,
      previousRange: this.previousRange,
      currentIndex,
      rangeId: currentRange,
      range: currentRangeObject,
      canvasList,
      region,
      currentCanvasId: canvas ? canvas.id : null,
      canvas,
    });
  }
}

export default RangeNavigationProvider;
