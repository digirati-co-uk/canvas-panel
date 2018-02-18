import React, { Component } from 'react';

class Breadcrumbs extends Component {
  render() {
    const { breadcrumbs, onBack } = this.props;

    return (
      <div className="galway-timeline__breadcrumbs galway-timeline__breadcrumbs--active">
        <div className="galway-timeline__breadcrumb-container">
          {breadcrumbs.path && breadcrumbs.path.length !== 0 ? (
            breadcrumbs.path.map((item, key) => (
              <div
                key={key}
                onClick={onBack}
                className="galway-timeline__breadcrumb-item"
              >
                <div className="material-icons">navigate_before</div>{' '}
                {item.label}
              </div>
            ))
          ) : (
            <div className="galway-timeline__breadcrumb-static">Timeline</div>
          )}
        </div>
      </div>
    );
  }
}

export default Breadcrumbs;
