import React from 'react';
import Box from 'mineral-ui/Box';
import Text from 'mineral-ui/Text';

const ErrorDisplay: React.FunctionComponent<{ error: string }> = ({ error }) => {
  return (
    <Box as="p"><Text color="red">{error}</Text></Box>
  );
}

export default ErrorDisplay;