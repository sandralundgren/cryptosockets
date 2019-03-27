import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const CoinDropdown = props => {
  const {
    coinOptions,
    selectedCoinOption,
    handleSelectChange,
  } = props;
  
  return (
    <Dropdown
      placeholder="Select Coin Pair To Add"
      selection
      search
      options={coinOptions}
      onChange={handleSelectChange}
      value={selectedCoinOption}
    />
  );
};

export default CoinDropdown;
