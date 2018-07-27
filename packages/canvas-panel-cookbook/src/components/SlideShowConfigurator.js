import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './SlideShowConfigurator.scss';
import SlideShow from './SlideShow';

// TODO: this is not working because the Manifest component is immutable...
class SlideShowConfiguratorBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        manifesturi: 'https://wellcomelibrary.org/iiif/b18934717/manifest',
        slideClass: 'DummySlideContent',
      },
      submitted: {
        manifesturi: 'https://wellcomelibrary.org/iiif/b18934717/manifest',
        slideClass: 'DummySlideContent',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const newState = {
      formValues: Object.assign({}, this.state.formValues),
      submitted: Object.assign({}, this.state.submitted),
    };
    newState.formValues[name] = value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submitted: Object.assign({}, this.state.formValues),
    });
  }

  render() {
    let { children, bem } = this.props;
    console.log(this.state);
    return (
      <div className={bem}>
        <div className={bem.element('panel')}>
          <form className={bem.element('form')} onSubmit={this.handleSubmit}>
            <legend className={bem.element('legend')}>Configuration</legend>
            <label className={bem.element('label')}>Manifest Url:</label>
            <input
              name="manifesturi"
              value={this.state.formValues.manifesturi}
              type="text"
              onChange={this.handleInputChange}
              className={bem.element('input')}
            />
            <label className={bem.element('label')}>Slide Class:</label>
            <select
              name="slideClass"
              value={this.state.formValues.slideClass}
              onChange={this.handleInputChange}
              className={bem.element('select')}
            >
              <option value="DummySlideContent">Dummy Slide Content</option>
              <option value="P2SlideContent">
                Presentation 2 Slide Content
              </option>
              <option value="P3SlideContent">
                Presentation 3 Slide Content
              </option>
              <option value="LayoutDebugSlideContent">
                Layout Debug Slide Content
              </option>
            </select>
            <input type="submit" value="Update Preview" />
          </form>
        </div>
        <div className={bem.element('previews')}>
          <SlideShow manifesturi={this.state.submitted.manifesturi} />
        </div>
      </div>
    );
  }
}

const SlideShowConfigurator = withBemClass('slideshow-configurator')(
  SlideShowConfiguratorBase
);

export default SlideShowConfigurator;
