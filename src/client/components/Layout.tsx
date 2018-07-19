import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import * as classNames from 'classnames';
import { ApplicationState } from 'store';
import { withRoot } from 'shared/HOC/withRoot';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Footer, Images } from 'models/initial';
import CssBaseline from '@material-ui/core/CssBaseline';

const decorate = withStyles(({ mixins, palette, spacing, breakpoints }) => ({
  root: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden' as 'hidden',
    position: 'relative' as 'relative',
    width: '100%'
  },
  appBar: {
    position: 'absolute' as 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: -17,
    height: mixins.toolbar.minHeight
  },
  toolbar: {
    height: mixins.toolbar.minHeight
  },
  content: {
    flexGrow: 1,
    backgroundColor: palette.background.default,
    width: '100%',
    display: 'inline-block'
  },
  contentPadding: {
    paddingTop: spacing.unit * 5,
    paddingBottom: spacing.unit * 5,
    minHeight: `calc(100vh - 100px)`
  },
  logo: {
    height: mixins.toolbar.minHeight as number - spacing.unit
  },
  footer: {
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: '#444444',
    height: 100,
    color: '#ccc',
    textAlign: 'center' as 'center',
    lineHeight: '100px',
    verticalAlign: 'middle'
  },
  footerText: {
    color: '#ccc',
    '&:link': {
      color: '#ccc',
      textDecoration: 'none'
    },
    '&:visited': {
      color: '#ccc',
      textDecoration: 'none'
    },
    '&:focus': {
      color: '#ccc',
      textDecoration: 'none'
    },
    '&:hover': {
      color: '#ccc',
      textDecoration: 'underline'
    },
    '&:active': {
      color: '#ccc',
      textDecoration: 'underline'
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    height: '100%'
  },
  [breakpoints.down('md')]: {
    contentPadding: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: `calc(100vh - 100px - ${mixins.toolbar.minHeight})`
    }
  }
}));

interface PropTypes {
  footer: Footer
  images: Images
}

type Props = PropTypes
  & WithStyles<'root' | 'appBar' | 'toolbar' | 'content' | 'logo' | 'footer' | 'footerText' | 'center' | 'contentPadding' | '@media (max-width: 28rem)'>;

let MyLayout = decorate(
  class extends React.PureComponent<Props, {}> {
    public componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    public render() {
      const { classes, footer, images } = this.props;
      return (
        <>
          <CssBaseline />
          <div className={classes.root}>
            <AppBar className={classes.appBar} >
              <Toolbar>
                <a href={images.logoMain.href}>
                  <img src={images.logoMain.url} alt={images.logoMain.alt} className={classes.logo} />
                </a>
              </Toolbar>
            </AppBar>
            <div className={classNames(classes.content, classes.contentPadding)}>
              <div className={classes.toolbar} />
              <div className={classes.center}>
                {this.props.children}
              </div>
            </div>
            <div className={classes.footer}>
              <a className={classes.footerText} href={footer.termsAndConditions.link.href}>{footer.termsAndConditions.link.text}</a>
              &nbsp;{footer.pipe}&nbsp;
            <a className={classes.footerText} href={footer.privacy.link.href}>{footer.privacy.link.text}</a>
            </div>
          </div>
        </>
      );
    }
  }
);

MyLayout = connect(
  (state: ApplicationState) => ({
    footer: state.initial.footer,
    images: state.initial.images
  })
)(MyLayout as any) as any;

export const Layout = withRoot(MyLayout);
