pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'CompanyDepartmentRole' to manage this role - add, remove, check
contract CompanyDepartmentRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  // event CompanyDepartmentAdded(address indexed account);
  // event CompanyDepartmentRemoved(address indexed account);

  // Define a struct 'CompanyDepartments' by inheriting from 'Roles' library, struct Role
  Roles.Role private companydepartments;

  // In the constructor make the address that deploys this contract the 1st CompanyDepartment
  constructor() public {
    _addCompanyDepartment(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyCompanyDepartment() {
    require(isCompanyDepartment(msg.sender));
    _;
  }

  // Define a function 'isCompanyDepartment' to check this role
  function isCompanyDepartment(address account) public view returns (bool) {
    return companydepartments.has(account);
  }

  // Define a function 'addCompanyDepartment' that adds this role
  function addCompanyDepartment(address account) internal {
    _addCompanyDepartment(account);
  }

  // Define a function 'renounceCompanyDepartment' to renounce this role
  function renounceCompanyDepartment(address account) internal {
    _removeCompanyDepartment(account);
  }

  // Define an internal function '_addCompanyDepartment' to add this role, called by 'addCompanyDepartment'
  function _addCompanyDepartment(address account) internal {
    companydepartments.add(account);
    //emit CompanyDepartmentAdded(account);
  }

  // Define an internal function '_removeCompanyDepartment' to remove this role, called by 'removeCompanyDepartment'
  function _removeCompanyDepartment(address account) internal {
    companydepartments.remove(account);
    //emit CompanyDepartmentRemoved(account);
  }
}
