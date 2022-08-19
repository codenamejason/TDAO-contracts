pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

interface IRTalentNFTToken {
    function mintReputationToken(address ownerAddress, uint256 amount) external returns(uint256);
}
