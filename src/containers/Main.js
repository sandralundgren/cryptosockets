import React from 'react';
import arrayMove from 'array-move';
import 'semantic-ui-css/semantic.min.css';

import '../styles/App.scss';
import SortableList from '../components/Sortable';
import CoinDropdown from '../components/CoinDropdown';
import { initialCoinPairs } from '../utils/constants';
import { coinbaseProductsUrl } from '../utils/apiUrl';
import { formatOptions, difference } from '../utils/helpers';
import { ReactComponent as Error } from '../assets/error.svg';

class Main extends React.Component {
  state = {
    coinPairs: initialCoinPairs,
    coinOptions: [],
    allowedCoinOptions: [],
    selectedCoinOption: '',
    hasError: false,
  };

  componentDidMount = () => {
    fetch(coinbaseProductsUrl)
      .then(res => res.json())
      .then(coins => {
        this.setState({ coinOptions: coins });
        this.checkDifference(coins);
      })
      .catch(() => this.setState({ hasError: true }));
  };

  checkDifference = coins => {
    const { coinPairs } = this.state;
    const coinIds = coins.map(el => el.id);

    const alreadyListed = difference(coinIds, coinPairs);
    const optMinusListed = coins.filter(el => alreadyListed.includes(el.id));

    this.setState({
      allowedCoinOptions: formatOptions(optMinusListed),
    });
  };

  handleSelectChange = (e, { value }) => {
    this.setState(prevState => ({
      selectedCoinOption: value,
      coinPairs: [...prevState.coinPairs, value],
    }));

    const {
      coinOptions,
    } = this.state;

    this.checkDifference(coinOptions);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ coinPairs }) => ({
      coinPairs: arrayMove(coinPairs, oldIndex, newIndex)
    }));
  };

  onRemove = index => {
    const {
      coinPairs,
      coinOptions,
      selectedCoinOption,
    } = this.state;
    const coinPairsCopy = [...coinPairs];
    const toRemove = coinPairsCopy.splice(index, 1);

    if (selectedCoinOption === toRemove.toString()) {
      this.setState({
        selectedCoinOption: '',
      });
    }

    this.setState({ coinPairs: coinPairsCopy }, () => {
      this.checkDifference(coinOptions);
    });

  };

  render() {
    const {
      coinPairs,
      allowedCoinOptions,
      selectedCoinOption,
      hasError,
    } = this.state;

    if (hasError) {
      return (
        <div className="message-wrapper">
          <Error className="error-icon icon" />
          <span>Something went wrong</span>
        </div>
      );
    }

    return (
      <main className="main-container">
        <div>
          <CoinDropdown
            coinOptions={allowedCoinOptions}
            selectedCoinOption={selectedCoinOption}
            handleSelectChange={this.handleSelectChange}
          />
          <SortableList
            coinPairs={coinPairs}
            onSortEnd={this.onSortEnd}
            onRemove={this.onRemove}
            useDragHandle
          />
          <div className="src-description">
            Live data from Coinbase Pro
          </div>
        </div>
      </main>
    );
  }
}

export default Main;
