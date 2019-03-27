import React from 'react';

import { coinbaseWebsocketsFeed } from '../utils/apiUrl';
import Spinner from '../components/Spinner';

const withSubscription = WrappedCoin => {
  class HOC extends React.Component {
    state = {
      coinData: [],
      isLoading: true,
      hasError: false,
    };

    componentDidMount = () => {
      const {
        coin,
      } = this.props;

      const subscribe = {
        type: 'subscribe',
        channels: [
          {
            name: 'ticker',
            product_ids: [coin], // must be array
          }
        ]
      };

      this.ws = new WebSocket(coinbaseWebsocketsFeed);

      this.ws.onopen = () => {
        this.ws.send(JSON.stringify(subscribe));
      };

      this.ws.onerror = () => {
        this.setState({
          isLoading: false,
          hasError: true,
        });
      };

      this.ws.onmessage = e => {
        const value = JSON.parse(e.data);
        if (value.type !== "ticker") {
          return;
        }

        this.setState({
          coinData: value,
          isLoading: false,
        });
      };
    };

    componentWillUnmount = () => {
      this.ws.close();
    };

    render() {
      const {
        isLoading,
        coinData,
        hasError,
      } = this.state;

      const {
        coin,
      } = this.props;

      if (hasError) {
        return (
          <div className="coin__error">
            Price data for {coin} could not be fetched
          </div>
        );
      }

      if (isLoading) {
        return <Spinner />;
      }
      return (
        <WrappedCoin {...this.props} coinData={coinData} />
      );
    }
  }

  return HOC;
};

export default withSubscription;