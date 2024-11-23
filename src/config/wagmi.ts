import { createConfig, configureChains } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { DefaultChainID } from './constants';

const { chains, publicClient } = configureChains(
  [DefaultChainID === 1 ? mainnet : goerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  chains,
});

export default config; 