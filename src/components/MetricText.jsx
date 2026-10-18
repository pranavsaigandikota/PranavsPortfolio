import { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';

// Highlight text nodes only; links, attributes, and the original copy stay intact.
const metricPattern = /(\b\d[\d,]*(?:\.\d+)?(?:%|\+|st\b|nd\b|rd\b|th\b)?(?![A-Za-z])|\b(?:six|three|two|first prize|first place)\b)/gi;

function emphasize(value) {
  if (typeof value === 'string') {
    return value.split(metricPattern).map((part, index) => index % 2
      ? <strong className="ed-metric" key={index}>{part}</strong>
      : part);
  }
  if (isValidElement(value) && value.props.children !== undefined) {
    return cloneElement(value, undefined, Children.map(value.props.children, emphasize));
  }
  return value;
}

export function MetricText({ children }) {
  return <>{Children.map(children, emphasize)}</>;
}
MetricText.propTypes = { children: PropTypes.node };
