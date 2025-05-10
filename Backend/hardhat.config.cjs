require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env file
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: process.env.AMOY_RPC_URL,
      accounts: [process.env.SUPERADMIN_PRIVATE_KEY],
    },
  },
};
