import { Wallet } from 'ethers';
import { MockTimeNonfungiblePositionManager } from '../../typechain';
import { FeeAmount, TICK_SPACINGS } from './constants';
import { encodePriceSqrt } from './encodePriceSqrt';
import { getMaxTick, getMinTick } from './ticks';
import { ZERO_ADDRESS } from '../CallbackValidation.spec';

export async function createPool(
  nft: MockTimeNonfungiblePositionManager,
  wallet: Wallet,
  tokenAddressA: string,
  tokenAddressB: string,
  deployer: string
) {
  if (tokenAddressA.toLowerCase() > tokenAddressB.toLowerCase())
    [tokenAddressA, tokenAddressB] = [tokenAddressB, tokenAddressA];

  await nft.createAndInitializePoolIfNecessary(tokenAddressA, tokenAddressB, deployer, encodePriceSqrt(1, 1), '0x');

  const liquidityParams = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: deployer,
    tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    recipient: wallet.address,
    amount0Desired: 1000000,
    amount1Desired: 1000000,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  return nft.mint(liquidityParams);
}

export async function createPoolWithMultiplePositions(
  nft: MockTimeNonfungiblePositionManager,
  wallet: Wallet,
  tokenAddressA: string,
  tokenAddressB: string
) {
  if (tokenAddressA.toLowerCase() > tokenAddressB.toLowerCase())
    [tokenAddressA, tokenAddressB] = [tokenAddressB, tokenAddressA];

  await nft.createAndInitializePoolIfNecessary(tokenAddressA, tokenAddressB, ZERO_ADDRESS, encodePriceSqrt(1, 1), '0x');

  const liquidityParams = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: ZERO_ADDRESS,
    tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    recipient: wallet.address,
    amount0Desired: 1000000,
    amount1Desired: 1000000,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  await nft.mint(liquidityParams);

  const liquidityParams2 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: ZERO_ADDRESS,
    tickLower: -60,
    tickUpper: 60,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  await nft.mint(liquidityParams2);

  const liquidityParams3 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: ZERO_ADDRESS,
    tickLower: -120,
    tickUpper: 120,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  return nft.mint(liquidityParams3);
}

export async function createPoolWithZeroTickInitialized(
  nft: MockTimeNonfungiblePositionManager,
  wallet: Wallet,
  tokenAddressA: string,
  tokenAddressB: string
) {
  if (tokenAddressA.toLowerCase() > tokenAddressB.toLowerCase())
    [tokenAddressA, tokenAddressB] = [tokenAddressB, tokenAddressA];

  await nft.createAndInitializePoolIfNecessary(tokenAddressA, tokenAddressB, ZERO_ADDRESS, encodePriceSqrt(1, 1), '0x');

  const liquidityParams = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: ZERO_ADDRESS,
    tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
    recipient: wallet.address,
    amount0Desired: 1000000,
    amount1Desired: 1000000,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  await nft.mint(liquidityParams);

  const liquidityParams2 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: ZERO_ADDRESS,
    tickLower: 0,
    tickUpper: 60,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  await nft.mint(liquidityParams2);

  const liquidityParams3 = {
    token0: tokenAddressA,
    token1: tokenAddressB,
    deployer: ZERO_ADDRESS,
    tickLower: -120,
    tickUpper: 0,
    recipient: wallet.address,
    amount0Desired: 100,
    amount1Desired: 100,
    amount0Min: 0,
    amount1Min: 0,
    deadline: 1,
  };

  return nft.mint(liquidityParams3);
}
