import { createTheme } from 'mineral-ui/themes';

const appColor = {
  10: '#faf0f4',
  20: '#fad4e4',
  30: '#fab4d1',
  40: '#f78bb8',
  50: '#ed5393',
  60: '#d6246e',
  70: '#b01355',
  80: '#8a1244',
  90: '#611535',
  100: '#421527'
};

export default createTheme({
  colors: {
    theme: appColor,
    danger: 'bronze',
    warning: 'dusk',
    success: 'teal'
  }
});
