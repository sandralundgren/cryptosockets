import React from 'react';
import styled from 'styled-components';

import withSubscription from '../containers/withSubscription';
import { roundedPrice } from '../utils/helpers';
import { ReactComponent as Trash } from '../assets/waste-bin.svg';

const CoinDetails = styled.span`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.5rem;
  width: 8rem;
  text-align: left;
`;

const CoinSubscriber = ({ coinData, onRemove, index }) => (
  <React.Fragment>
    <CoinDetails>{coinData.product_id}</CoinDetails>
    <CoinDetails>{roundedPrice(coinData.price)}</CoinDetails>
    <Trash
      className="icon trash-icon"
      onClick={() => onRemove(index)}
    />
  </React.Fragment>
);

const WrappedCoin = withSubscription(CoinSubscriber);

export default WrappedCoin;