require("@nomicfoundation/hardhat-toolbox");

const DEFAULT_COMPILER_SETTINGS = {
  version: "0.5.16",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  metadata: {
    bytecodeHash: "none",
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  networks: {
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: [
        "",
      ],
    },
  },
};
