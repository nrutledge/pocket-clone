import React from 'react';
import PropTypes from 'prop-types';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';

const ErrorDisplay: React.FunctionComponent<{ error: string }> = ({ error }) => {
  return (
    <Box as="p">
      <Text color="red">{error}</Text>
    </Box>
  );
};
ErrorDisplay.propTypes = {
  error: PropTypes.string
};

export default ErrorDisplay;
