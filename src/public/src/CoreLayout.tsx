import React from 'react';

import { ThemeProvider } from 'mineral-ui/themes';

import Button from 'mineral-ui/Button';
import theme from './style/theme';

const CoreLayout: React.FunctionComponent<{}> = () => {
  return (
    <div className="CoreLayout">
      <ThemeProvider theme={theme}>
        <Button>bleh</Button>
      </ThemeProvider>
    </div>
  );
};

export default CoreLayout;
