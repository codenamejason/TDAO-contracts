pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

/// @dev TDAO token interface
interface ITDAOToken {
    function setupMinterRole(address newMinter) external;
    function setupOperatorRole(address newOperator) external;
    function setupDaoRole(address dao) external;
    function setupDistributorRole(address distributor) external;
    function setupNewAdminRole(address _newAdmin, address _oldAdmin) external;
    function mintTokensTo(address _to, uint256 _amount) external;
    function transfer (address recipient, uint256 amount ) external returns ( bool );
    function transferFrom (address sender, address recipient, uint256 amount ) external returns ( bool );
    function approve (address spender, uint256 amount ) external returns ( bool );
    function burn(address from, uint256 amount) external;
    function balanceOf (address account ) external view returns ( uint256 );
}