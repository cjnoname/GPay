import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';

export const theme = (themeObj: any): Theme => {
  return (
    createMuiTheme({
      palette: {
        primary: {
          light: themeObj.primaryColor,
          main: themeObj.primaryColor,
          dark: themeObj.primaryColor
        },
        secondary: {
          light: themeObj.secondaryColor,
          main: themeObj.secondaryColor,
          dark: themeObj.secondaryColor
        }
      },
    }));
};

export const getTheme = ((themeObj: any): Theme => {
  return theme(themeObj);
});
