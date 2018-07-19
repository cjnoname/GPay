import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { RouteComponentProps } from 'react-router-dom';
import { loadScript } from 'utils/loadScript';
import { GooglePayResponse } from 'models/googlePay';
import { CircularProgress } from '@material-ui/core';

declare const google: any;

interface PropTypes {
  decryptAction: any
}

type Props = PropTypes & RouteComponentProps<{}>;

const allowedPaymentMethods = ['CARD'];
const allowedCardNetworks = ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA'];
const paymentMethodTokenizationParameters = {
  tokenizationType: 'DIRECT',
  parameters: {
    publicKey: 'BK6rm+glXxji53mEXYFvhjughW9R0FmvW4zCTsjZLa7zkDkOjAnqSv2EarmKAsb1conap3m00KTPHDh/nH/FYu0='
  }
};

class GooglePayButton extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    loadScript('https://pay.google.com/gp/p/js/pay.js', this.initializeGooglePay, 'googlePay', true);
  }

  public render() {
    return (
      <div id="googlePayButton">
        <CircularProgress
          size={30}
        />
      </div>
    );
  }

  private getGooglePaymentsClient = () => {
    return (new google.payments.api.PaymentsClient({ environment: 'TEST' }));
  }

  private addGooglePayButton = () => {
    const paymentsClient = this.getGooglePaymentsClient();
    const button = paymentsClient.createButton({ onClick: this.onGooglePaymentButtonClicked });
    (document.getElementById('googlePayButton') as any).innerHTML = '';
    (document.getElementById('googlePayButton') as any).appendChild(button);
  }

  private onGooglePaymentButtonClicked = () => {
    const paymentDataRequest = this.getGooglePaymentDataConfiguration() as any;
    paymentDataRequest.transactionInfo = this.getGoogleTransactionInfo();

    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        // handle the response
        this.processPayment(paymentData);
      })
      .catch((err: any) => {
        // show error in developer console for debugging
        console.error(err);
      });
  }

  private getGoogleTransactionInfo = () => {
    return {
      currencyCode: 'AUD',
      totalPriceStatus: 'FINAL',
      // set to cart total
      totalPrice: '1.00'
    };
  }

  private getGooglePaymentDataConfiguration = () => {
    return {
      // @todo a merchant ID is available for a production environment after approval by Google
      // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
      // merchantId: '01234567890123456789',
      paymentMethodTokenizationParameters,
      allowedPaymentMethods,
      cardRequirements: {
        allowedCardNetworks
      }
    };
  }

  private processPayment = (paymentData: GooglePayResponse) => {
    // show returned data in developer console for debugging
    console.log(paymentData);
    if (paymentData.paymentMethodToken.tokenizationType === 'DIRECT') {
      this.props.decryptAction(paymentData);
    }
    // @todo pass payment data response to gateway to process payment
  }

  private initializeGooglePay = () => {
    const paymentsClient = this.getGooglePaymentsClient();
    paymentsClient.isReadyToPay({ allowedPaymentMethods })
      .then((response: any) => {
        if (response.result) {
          this.addGooglePayButton();
        }
      })
      .catch((err: any) => {
        // show error in developer console for debugging
        console.error(err);
      });
  }
}

export default connect(
  (state: ApplicationState) => ({
  })
)(GooglePayButton as any) as any;
