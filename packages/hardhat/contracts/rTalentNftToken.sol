pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Talent DAO NFT Contract
/// @author Jaxcoder
/// @dev ERC1155 to represent articles submitted by authors as the IP and license
contract rTalentNftToken is Ownable, ERC1155 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    constructor(address _owner, string memory tokenURI) ERC1155("") {
        _transferOwnership(_owner);
    }

    /// @dev for OpenSea
    function contractURI() public pure returns (string memory)
    {
        return "";
    }

    /// @dev this is internal mint function
    /// @param ownerAddress the user that is minting the token address
    function mintReputationToken(address ownerAddress, bytes memory data)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        // mint the nft to the author/owner
        uint256 newItemId = _tokenIds.current();
        _mint(ownerAddress, newItemId, 1, data);

        // return the tokenId and the authorId it was minted to
        // the authorId will be
        return (newItemId);
    }
}
