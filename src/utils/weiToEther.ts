import { ethers } from 'ethers';
import { BigNumber } from 'ethers/utils';

export const weiToEther = (wei: BigNumber): string => {
  return ethers.utils.formatUnits(wei, 'ether');
};