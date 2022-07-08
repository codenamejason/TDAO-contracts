pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

/// @dev TDAO token interface
interface IVETDAOToken {
    function setupMinterRole(address minter) external;
    function setupOperatorRole(address operator) external;
    function setupDaoRole(address dao) external;
    function setupDistributorRole(address distributor) external;
    function mintTokensTo(address _to, uint256 _amount) external;
    function mintTokens(uint256 amount) external;
    function permit(address owner, address spender, uint rawAmount, uint deadline, uint8 v, bytes32 r, bytes32 s) external;
    function transfer ( address recipient, uint256 amount ) external returns ( bool );
    function transferFrom ( address sender, address recipient, uint256 amount ) external returns ( bool );
    function approve ( address spender, uint256 amount ) external returns ( bool );
    function burnTokens(uint256 amount, address from) external;
    function balanceOf ( address account ) external view returns ( uint256 );
    function delegate(address delegatee) external;
    function burnFrom(address _from, uint256 _amount) external;
}