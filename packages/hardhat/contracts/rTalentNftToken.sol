pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Talent DAO NFT Contract
/// @author Jaxcoder
/// @dev ERC721 to represent articles submitted by authors as the IP and license
contract rTalentNftToken is Ownable, ERC1155 {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    Counters.Counter private _tokenIds;

    constructor(address _owner, string memory tokenURI) public ERC1155("") {
        _transferOwnership(_owner);
    }

    /// @dev for OpenSea
    function contractURI() public pure returns (string memory)
    {
        return "";
    }

    /// @dev this is internal mint function
    /// @param ownerAddress the user that is minting the token address
    /// @param tokenURI the uri for the token metadata
    function mintNFT(address ownerAddress, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        // mint the nft to the author/owner
        uint256 newItemId = _tokenIds.current();
        // _mint(ownerAddress, newItemId);

        // return the tokenId and the authorId it was minted to
        // the authorId will be 
        return (newItemId);
    }
}
