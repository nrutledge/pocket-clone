import React from 'react';

import { ThemeProvider } from 'mineral-ui/themes';

import Button from 'mineral-ui/Button';
import theme from '../style/theme';
import Router from './Router';

const CoreLayout: React.FunctionComponent<{}> = () => {
  return (
    <div className="CoreLayout">
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Button>bleh</Button>
          <Router />
        </React.Fragment>
      </ThemeProvider>
    </div>
  );
};

export default CoreLayout;
