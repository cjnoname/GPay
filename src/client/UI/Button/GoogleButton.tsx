import * as React from 'react';
import * as classNames from 'classnames';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { SocialButtonStyle } from './style';
import SvgIcon from '@material-ui/core/SvgIcon';
import { loadScript } from 'utils/loadScript';

const decorate = withStyles(() => ({
  ...SocialButtonStyle(),
  google: {
    background: 'white',
    color: '#666'
  }
}));

const GoogleIcon = (props: any) => {
  return (
    <SvgIcon viewBox="0 0 44 44" {...props}>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="google-g">
          <path d="M43.12,22.5 C43.12,20.94 42.98,19.44 42.72,18 L22,18 L22,26.51 L33.84,26.51 C33.33,29.26 31.78,31.59 29.45,33.15 L29.45,38.67 L36.56,38.67 C40.72,34.84 43.12,29.2 43.12,22.5 Z" id="Shape" fill="#4285F4" fillRule="nonzero" />
          <path d="M22,44 C27.94,44 32.92,42.03 36.56,38.67 L29.45,33.15 C27.48,34.47 24.96,35.25 22,35.25 C16.27,35.25 11.42,31.38 9.69,26.18 L2.34,26.18 L2.34,31.88 C5.96,39.07 13.4,44 22,44 Z" id="Shape" fill="#34A853" fillRule="nonzero" />
          <path d="M9.69,26.18 C9.25,24.86 9,23.45 9,22 C9,20.55 9.25,19.14 9.69,17.82 L9.69,12.12 L2.34,12.12 C0.799998104,15.1857166 -0.00135897715,18.5692243 -8.8817842e-16,22 C-8.8817842e-16,25.55 0.85,28.91 2.34,31.88 L9.69,26.18 Z" id="Shape" fill="#FBBC05" fillRule="nonzero" />
          <path d="M22,8.75 C25.23,8.75 28.13,9.86 30.41,12.04 L36.72,5.73 C32.91,2.18 27.93,0 22,0 C13.4,0 5.96,4.93 2.34,12.12 L9.69,17.82 C11.42,12.62 16.27,8.75 22,8.75 Z" id="Shape" fill="#EA4335" fillRule="nonzero" />
          <polygon id="Shape" points="0 0 44 0 44 44 0 44" />
        </g>
      </g>
    </SvgIcon>
  );
};

declare let GoogleAuth: any;
declare let gapi: any;
declare let window: any;

interface PropTypes {
  label: string
}

type Props = PropTypes
  & RouteComponentProps<{}>
  & WithStyles<'buttonContainer' | 'button' | 'google' | 'icon' | 'text'>;

const SocialButtons = decorate(
  class extends React.PureComponent<Props, {}> {
    public componentDidMount() {
      loadScript('https://apis.google.com/js/platform.js', this.initializeGoogleLogin, 'googleSignin');
    }

    public render() {
      const { classes, label } = this.props;
      return (
        <div className={classes.buttonContainer}>
          <Button color="primary" variant="raised" className={classNames(classes.button, classes.google)} onClick={this.googleSignIn} fullWidth>
            <GoogleIcon className={classes.icon} />
            <span className={classes.text}>{label}</span>
          </Button>
        </div>
      );
    }

    private initializeGoogleLogin = () => {
      gapi.load('auth2', () => {
        window.GoogleAuth = gapi.auth2.init({
          client_id: '23587345422-gdsfcf8nnhr1q5kitp969eb36qf7meqr.apps.googleusercontent.com'
        });
      });
      // GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
      // this.updateSigninStatus(GoogleAuth.isSignedIn.get());
    }

    private updateSigninStatus = (isSignedIn: any) => {
      // console.log('isSignedIn', isSignedIn);
      // console.log('GoogleAuth.isSignedIn.get()', gapi.auth2.getAuthInstance().isSignedIn.get());
    }

    private googleSignIn = async () => {
      const res = await GoogleAuth.signIn();
      // console.log(res);
    }
  }
);

export default connect(
  (state: ApplicationState) => ({
    label: state.initial.social.googleLabel
  })
)(SocialButtons as any) as any;
