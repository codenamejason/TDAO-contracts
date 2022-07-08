pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

interface ITDAOMemberToken{
    function mintMembershipToken(address authorAddress, string memory metadataPtr, uint256 amount) external returns(uint256);
    function getContractBalance(address token) external returns (uint256);
    function withdrawTDAOTokens() external;
}