import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { getTheme } from 'shared/theme';

function withRoot(Component: any) {
  function WithRoot(props: any) {
    return (
      <MuiThemeProvider theme={getTheme(props.theme)}>
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return connect(
    (state: ApplicationState) => ({
      theme: state.initial.theme
    })
  )(WithRoot);
}

export { withRoot };
