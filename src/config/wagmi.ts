import { createConfig, http } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { DefaultChainID } from './constants';

const config = createConfig({
  chains: [DefaultChainID === 1 ? mainnet : goerli],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
});

export default config; 