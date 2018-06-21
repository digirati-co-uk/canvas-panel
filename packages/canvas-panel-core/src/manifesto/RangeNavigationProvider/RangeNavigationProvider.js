/**
 * @flow
 */
import React, { Component } from 'react';
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import functionOrMapChildren from '../../utility/functionOrMapChildren';

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
  canvasList: Array<string>,
};

type RangeLike = {
  canvasList: Array<string>,
  id: string,
} | null;

class RangeNavigationProvider extends Component<Props, State> {
  state = {
    currentIndex: 0,
    currentRange: null,
    canvasList: [],
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
        currentRange: matchingRange.id,
        canvasList: matchingRange.canvasList,
      });
    }
  }

  setRanges({ manifest, rangeId, rangeViewingHint }: Props) {
    const allRanges: Array<Manifesto.Range> = manifest.getAllRanges();

    // Get range by viewing hint or ID.
    const matchingRange: Manifesto.Range = allRanges.reduce(
      (match, next: Manifesto.Range) => {
        if (match) return match;
        if (rangeId && next.id === rangeId) {
          return next;
        }
        if (
          rangeViewingHint &&
          next.getViewingHint().toString() === rangeViewingHint
        ) {
          return next;
        }
        return null;
      },
      null
    );

    if (matchingRange) {
      this.setState({
        currentRange: matchingRange.id,
        canvasList: matchingRange.getCanvasIds(),
      });
    }

    return {
      currentRange: manifest.id,
      canvasList: manifest
        .getSequenceByIndex(0)
        .getCanvases()
        .map((canvas: Manifesto.Canvas) => canvas.id),
    };
  }

  getMatchingRange({ manifest, rangeId, rangeViewingHint }: Props): RangeLike {
    const allRanges: Array<Manifesto.Range> = manifest.getAllRanges();
    const matchingRange: Manifesto.Range = allRanges.reduce(
      (match, next: Manifesto.Range) => {
        if (match) return match;
        if (rangeId && next.id === rangeId) {
          return next;
        }
        if (
          rangeViewingHint &&
          next.getViewingHint().toString() === rangeViewingHint
        ) {
          return next;
        }
        return null;
      },
      null
    );

    if (matchingRange) {
      return {
        id: matchingRange.id,
        canvasList: matchingRange.getCanvasIds(),
      };
    }

    return {
      id: manifest.id,
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
    const { currentIndex, currentRange, canvasList } = this.state;

    if (!props.manifest) {
      return null;
    }

    const canvas =
      canvasList.length !== 0
        ? props.manifest
            .getSequenceByIndex(0)
            .getCanvasById(canvasList[currentIndex])
        : null;

    return functionOrMapChildren(children, {
      ...props,
      nextRange: this.nextRange,
      previousRange: this.previousRange,
      currentIndex,
      rangeId: currentRange,
      canvasList,
      currentCanvasId: canvas ? canvas.id : null,
      canvas,
    });
  }
}

export default RangeNavigationProvider;
