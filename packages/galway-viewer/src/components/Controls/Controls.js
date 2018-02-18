import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '../../redux/spaces/manifest';
import './Controls.scss';

class Controls extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <nav className="galway-controls__pagination">
        <button
          onClick={() => dispatch(manifestPrevCanvas())}
          className="galway-controls__button galway-controls__button--previous material-icons"
        >
          navigate_before
        </button>
        <button
          onClick={() => dispatch(manifestNextCanvas())}
          className="galway-controls__button galway-controls__button--next material-icons"
        >
          navigate_next
        </button>
      </nav>
    );
  }
}

export default connect()(Controls);
