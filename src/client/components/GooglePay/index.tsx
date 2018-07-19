import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { GooglePayButton } from 'UI/Button';
import { decryptActions } from './actions';
import { GooglePayState } from 'models/googlePay';
import { Card, CardContent, Typography, withStyles, WithStyles, Paper } from '@material-ui/core';
import Spinner from 'UI/Spinner';
import * as classNames from 'classnames';

const decorate = withStyles(({ mixins, palette }) => ({
  card: {
    width: 350,
    height: 180,
    margin: '0 auto'
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: 'left' as 'left',
    fontWeight: 'bold' as 'bold',
  },
  paper: mixins.gutters({
    paddingTop: 40,
    paddingBottom: 50,
    minHeight: 600
  }),
  pos: {
    marginBottom: 12,
    textAlign: 'right' as 'right'
  },
  middle: {
    width: '100%',
    textAlign: 'center' as 'center'
  },
  parent: {
    height: '100%',
    width: '100%',
    maxWidth: 700
  },
  newTitle: {
    color: palette.primary.main,
    fontWeight: 'bold' as 'bold'
  },
  bottomText: {
    color: palette.primary.main,
    fontWeight: 'bold' as 'bold'
  },
  blockContainer: {
    marginTop: 20,
    textAlign: 'center' as 'center'
  },
  cardNumber: {
    fontSize: 17,
    textAlign: 'center' as 'center',
    fontWeight: 'bold' as 'bold',
  },
  orderSummary: {
    fontSize: 16,
    marginTop: 30,
    fontWeight: 'bold' as 'bold',
    textAlign: 'center' as 'center'
  },
  orderdetails: {
    fontSize: 15,
    textAlign: 'center' as 'center'
  },
  paymentFinished: {
    marginTop: 25,
    textAlign: 'center' as 'center',
    fontSize: 25,
    fontWeight: 'bold' as 'bold',
  }
}));

interface PropTypes {
  isLoading: boolean,
  googlePay: GooglePayState
}

type Props = PropTypes
  & typeof decryptActions
  & WithStyles<'card' | 'paper' | 'title' | 'pos' | 'middle' | 'parent' | 'newTitle' | 'paper' | 'blockContainer' | 'block' | 'bottomText' | 'cardNumber' | 'orderSummary' | 'orderdetails' | 'paymentFinished'>;

const GooglePayComponent = decorate(
  class extends React.PureComponent<Props, {}> {
    public componentDidMount() {
      document.title = 'Google Pay | Ticketek';
    }

    public render() {
      const { googlePay: { decryptResponse, googlePayResponse, isLoading }, classes } = this.props;
      return (
        <div className={classes.parent}>
          <Spinner loading={isLoading} />
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="headline" component="h2" className={classes.newTitle}>
              Payment
            </Typography>
            <Typography className={classes.orderSummary} component="h4" color="textSecondary">
              Order Summary
            </Typography>
            <Typography className={classes.orderdetails} component="h4" color="textSecondary">
              Total price: $123.5 AUD
            </Typography>
            {googlePayResponse && decryptResponse ?
              <div className={classes.blockContainer}>
                <Card className={classNames(classes.card, classes.block)}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                      {googlePayResponse.cardInfo.cardClass}
                    </Typography>
                    <Typography className={classes.cardNumber} color="textSecondary">
                      {decryptResponse.paymentMethodDetails.pan}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {decryptResponse.paymentMethodDetails.expirationMonth}/{decryptResponse.paymentMethodDetails.expirationYear}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {googlePayResponse.cardInfo.cardNetwork}&nbsp;&nbsp;&nbsp;
                      <img src={googlePayResponse.cardInfo.cardImageUri} />
                    </Typography>
                  </CardContent>
                </Card>
                <Typography className={classes.paymentFinished} color="textSecondary">
                  Payment Successful!!!
                </Typography>
              </div>
              : <div className={classes.blockContainer}>
                <div className={classes.block}>
                  <GooglePayButton decryptAction={this.props.decryptAction} />
                </div>
              </div>
            }
          </Paper>
        </div>
      );
    }
  }
);

export default connect(
  (state: ApplicationState) => ({
    googlePay: state.googlePay
  }),
  decryptActions
)(GooglePayComponent as any) as any;
