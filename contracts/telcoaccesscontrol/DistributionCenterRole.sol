pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'DistributionCenterRole' to manage this role - add, remove, check
contract DistributionCenterRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event DistributionCenterAdded(address indexed account);
  event DistributionCenterRemoved(address indexed account);
  // Define a struct 'distributioncenters' by inheriting from 'Roles' library, struct Role
  Roles.Role distributioncenters;
  // In the constructor make the address that deploys this contract the 1st DistributionCenter
  constructor() public {
    _addDistributionCenter(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyDistributionCenter() {
    require(isDistributionCenter(msg.sender));
    _;
  }

  // Define a function 'isDistributionCenter' to check this role
  function isDistributionCenter(address account) public view returns (bool) {
    return distributioncenters.has(account);

  }

  // Define a function 'addDistributionCenter' that adds this role
  function addDistributionCenter(address account) public onlyDistributionCenter {
    _addDistributionCenter(account);
  }

  // Define a function 'renounceDistributionCenter' to renounce this role
  function renounceDistributionCenter() public {
    _removeDistributionCenter(msg.sender);
  }

  // Define an internal function '_addDistributionCenter' to add this role, called by 'addDistributionCenter'
  function _addDistributionCenter(address account) internal {
    distributioncenters.add(account);
    emit DistributionCenterAdded(account);
  }

  // Define an internal function '_removeDistributionCenter' to remove this role, called by 'removeDistributionCenter'
  function _removeDistributionCenter(address account) internal {
    distributioncenters.remove(account);
    emit DistributionCenterRemoved(account);
  }
}
