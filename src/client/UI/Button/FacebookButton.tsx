import * as React from 'react';
import * as classNames from 'classnames';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { SocialButtonStyle } from './style';
import SvgIcon from '@material-ui/core/SvgIcon';

const decorate = withStyles(() => ({
  ...SocialButtonStyle(),
  facebook: {
    background: '#4267B2'
  }
}));

const FacebookIcon = (props: any) => {
  return (
    <SvgIcon viewBox="0 0 268 268" {...props}>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="fb_logo_white" fill="#FFFFFF" fillRule="nonzero">
          <g id="FB-fLogo_2016">
            <g id="White">
              <path d="M252.72,0.55 L15.28,0.55 C7.1471314,0.555515681 0.555515681,7.1471314 0.55,15.28 L0.55,252.72 C0.555515681,260.852869 7.1471314,267.444484 15.28,267.45 L143.11,267.45 L143.11,164.09 L108.33,164.09 L108.33,123.81 L143.11,123.81 L143.11,94.11 C143.11,59.63 164.11,40.86 194.92,40.86 C205.301219,40.8238496 215.676667,41.3546398 226,42.45 L226,78.45 L204.67,78.45 C187.94,78.45 184.67,86.39 184.67,98.06 L184.67,123.77 L224.55,123.77 L219.36,164.05 L184.71,164.05 L184.71,267.45 L252.71,267.45 C260.842869,267.444484 267.434484,260.852869 267.44,252.72 L267.44,15.28 C267.434493,7.1510313 260.848963,0.561027945 252.72,0.55 Z" id="White-2" />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

declare let FB: any;
declare let window: any;

interface PropTypes {
  label: string
}

type Props = PropTypes
  & RouteComponentProps<{}>
  & WithStyles<'buttonContainer' | 'button' | 'facebook' | 'icon' | 'text'>;

const SocialButtons = decorate(
  class extends React.PureComponent<Props, {}> {
    public componentDidMount() {
      window.fbAsyncInit = () => {
        FB.init({
          appId: '1844014309225868',
          cookie: true,
          xfbml: true,
          version: 'v2.12',
          status: true
        });
        FB.AppEvents.logPageView();
        window.FB = FB;
      };

      (function(d, s, id) {
        let js = d.getElementsByTagName(s)[0] as any;
        const fjs = d.getElementsByTagName(s)[0] as any;
        if (d.getElementById(id)) { return; }
        js = d.createElement(s) as any;
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }

    public componentWillUnmount() {
      document.removeEventListener('facebookinit', this.initializeFacebookLogin);
    }

    public render() {
      const { classes, label } = this.props;
      return (
        <div className={classes.buttonContainer}>
          <Button color="primary" variant="raised" className={classNames(classes.button, classes.facebook)} onClick={this.facebookLogin} fullWidth>
            <FacebookIcon className={classes.icon} />
            <span className={classes.text}>{label}</span>
          </Button>
        </div>
      );
    }

    private initializeFacebookLogin = () => {
      this.checkFacebookLoginStatus();
    }

    private checkFacebookLoginStatus = () => {
      if (!FB) { return; }
      FB.getLoginStatus(this.facebookLoginHandler);
    }

    private facebookLogin = () => {
      if (!FB) { return; }

      // FB.getLoginStatus((response: any) => {
      // if (response.status === 'connected') {
      //   this.facebookLoginHandler(response);
      // } else {
      FB.login(this.facebookLoginHandler, { scope: 'public_profile' });
      //   }
      // }, null);
    }

    private facebookLoginHandler = (response: any) => {
      if (response.status === 'connected') {
        FB.api('/me', (userData: any) => {
          const result = {
            ...response,
            user: userData
          };
          // console.log(result);
          // this.props.onLogin(true, result);
        });
      } else {
        // this.props.onLogin(false);
      }
    }
  }
);

export default connect(
  (state: ApplicationState) => ({
    label: state.initial.social.facebookLabel
  })
)(SocialButtons as any) as any;
