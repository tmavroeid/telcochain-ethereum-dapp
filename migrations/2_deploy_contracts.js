// migrating the appropriate contracts
var DistributionCenterRole = artifacts.require("./DistributionCenterRole.sol");
var VendorRole = artifacts.require("./VendorRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var CompanyDepartmentRole = artifacts.require("./CompanyDepartmentRole.sol");
var CustomerRole = artifacts.require("./CustomerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(RetailerRole);
  deployer.deploy(CompanyDepartmentRole);
  deployer.deploy(DistributionCenterRole);
  deployer.deploy(VendorRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(SupplyChain);
};
