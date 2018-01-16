import Manifesto from 'manifesto.js';
import PropTypes from 'prop-types';


function LocaleString(props) {
  return Manifesto.TranslationCollection.getValue(props.children);
}

LocaleString.propTypes = {
  children: PropTypes.arrayOf(PropTypes.instanceOf(Manifesto.Translation)),
};

export default LocaleString;
