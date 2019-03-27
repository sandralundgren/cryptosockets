import React from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import styled from 'styled-components';

import WrappedCoin from './CoinSubscriber';
import { ReactComponent as Hamburger } from '../assets/hamburger.svg';

const CoinListWrapper = styled.div`
  background: linear-gradient(to top, #ffc371, #ff5f6d);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const CoinListInnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.25rem 1.25rem;
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 0.25);
  &:hover {
    color: #ffe8e9;
  }
`;

const DragHandle = SortableHandle(() => <Hamburger className="icon drag-icon" />);

const SortableItem = SortableElement(({ coin, sortIndex, onRemove }) => (
  <CoinListInnerWrapper>
    <CoinWrapper>
      <DragHandle />
      <WrappedCoin key={coin} coin={coin} index={sortIndex} onRemove={onRemove}/>
    </CoinWrapper>
  </CoinListInnerWrapper>
));

const SortableList = SortableContainer(({ coinPairs, onRemove }) => {
  return (
    <CoinListWrapper>
      {
        coinPairs.map((coin, index) => (
          <SortableItem
            key={`item-${coin}`}
            index={index}
            sortIndex={index}
            coin={coin}
            onRemove={onRemove}
          />
        ))
      }
    </CoinListWrapper>
  );
});

export default SortableList;