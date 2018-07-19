import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import * as classNames from 'classnames';
import { Typography } from 'UI/Tabs';
import Spinner from 'UI/Spinner';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LockIcon from '@material-ui/icons/Lock';
import { Account } from 'models/shared/account';
import { FacebookButton, GoogleButton, GooglePayButton } from 'UI/Button';
import { Authenticators } from 'enums/authenticators';

const decorate = withStyles(({ mixins, palette }) => ({
  parent: {
    height: '100%',
    width: '100%',
    maxWidth: 500
  },
  title: {
    color: palette.primary.main,
    fontWeight: 'bold' as 'bold'
  },
  paper: mixins.gutters({
    paddingTop: 25,
    paddingBottom: 25,
  }),
  marginTop20: {
    marginTop: 20
  },
  text: {
    marginTop: 20,
    width: '100%',
    textAlign: 'center' as 'center'
  },
  urlText: {
    fontSize: '1rem',
    fontWeight: 600 as 600,
    '&:link': {
      color: '#666',
      textDecoration: 'none'
    },
    '&:visited': {
      color: '#666',
      textDecoration: 'none'
    },
    '&:focus': {
      color: '#666',
      textDecoration: 'none'
    },
    '&:hover': {
      color: '#666',
      textDecoration: 'underline'
    },
    '&:active': {
      color: '#666',
      textDecoration: 'underline'
    }
  },
  forgotPassword: {
    fontSize: '0.875rem',
    fontWeight: 400 as 400
  },
  icon: {
    verticalAlign: 'bottom' as 'bottom',
    color: palette.primary.main,
    fontSize: 20
  }
}));

interface PropTypes {
  isLoading: boolean,
  account: Account,
  bottomUrl: string
}

type Props = PropTypes
  & WithStyles<'parent' | 'title' | 'paper' | 'marginTop20' | 'text' | 'urlText' | 'forgotPassword' | 'icon'>;

const AccountComponent = decorate(
  class extends React.PureComponent<Props, {}> {
    public render() {
      const { classes, isLoading, account, bottomUrl } = this.props;
      return (
        <div className={classes.parent}>
          <Spinner loading={isLoading} />
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="headline" component="h2" className={classes.title}>
              {account.title}
            </Typography>
            {account.authenticators.contains(Authenticators.Facebook) &&
              <FacebookButton />
            }
            {account.authenticators.contains(Authenticators.Google) &&
              <GoogleButton />
            }
            {(account.authenticators.contains(Authenticators.Facebook) || account.authenticators.contains(Authenticators.Google)) &&
              <Divider className={classes.marginTop20} />
            }
            {account.authenticators.contains(Authenticators.MyTicketek) && this.props.children}
            <Divider className={classes.marginTop20} />
            {account.forgotPassword &&
              <div className={classes.text}>
                <NavLink to="/forgotPassword" className={classNames(classes.urlText, classes.forgotPassword)}><LockIcon className={classes.icon} />
                  &nbsp;{account.forgotPassword}
                </NavLink>
              </div>
            }
            <div className={classes.text}>
              <NavLink to={bottomUrl} className={classes.urlText}>{account.bottomUrlText}</NavLink>
            </div>
          </Paper>
        </div>
      );
    }
  }
);

export default AccountComponent;
