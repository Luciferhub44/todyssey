import { createConfig, http } from '@wagmi/core';
import { mainnet, goerli } from '@wagmi/core/chains';

export const wagmiConfig = createConfig({
  chains: [mainnet, goerli],
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http(),
  },
});

export default wagmiConfig;