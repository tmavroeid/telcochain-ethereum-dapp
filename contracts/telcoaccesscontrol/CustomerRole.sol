pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract CustomerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event CustomerAdded(address indexed account);
  event CustomerRemoved(address indexed account);
  // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
  Roles.Role private customers;
  // In the constructor make the address that deploys this contract the 1st consumer
  constructor() public {
    _addCustomer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyCustomer() {
    require(isCustomer(msg.sender));
    _;
  }

  // Define a function 'isConsumer' to check this role
  function isCustomer(address account) public view returns (bool) {
    return customers.has(account);
  }

  // Define a function 'addConsumer' that adds this role
  function addCustomer(address account) public onlyCustomer {
    _addCustomer(account);
  }

  // Define a function 'renounceConsumer' to renounce this role
  function renounceCustomer() public {
    _removeCustomer(msg.sender);
  }

  // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
  function _addCustomer(address account) internal {
    customers.add(account);
    emit CustomerAdded(account);
  }

  // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
  function _removeCustomer(address account) internal {
    customers.remove(account);
    emit CustomerRemoved(account);
  }
}
