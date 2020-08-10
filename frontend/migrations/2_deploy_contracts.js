var iotBlockchain = artifacts.require("./iotBlockchain.sol");

module.exports = function(deployer) {
  deployer.deploy(iotBlockchain);
};
