import Manifesto from 'manifesto.js';
import PropTypes from 'prop-types';


function LocaleString(props) {
  return Manifesto.TranslationCollection.getValue(props.children);
}

LocaleString.propTypes = {
  children: PropTypes.instanceOf(Manifesto.TranslationCollection).isRequired,
};

export default LocaleString;
