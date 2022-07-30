pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Talent DAO NFT Contract
/// @author Jaxcoder
/// @dev ERC721 to represent articles submitted by authors as the IP and license
contract TalentDaoNftToken is Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    Counters.Counter private _tokenIds;

    address public treasury;
    address public tDaoTokenAddress;
    IERC20 private tDaoToken;

    constructor(address _owner, address _tDaoToken) ERC721("Talent DAO Article NFT", "TDAO-ARTICLE") {
        tDaoToken = IERC20(_tDaoToken);
        tDaoTokenAddress = _tDaoToken;
        _transferOwnership(_owner);
    }

    /// @dev we may not need this, for OpenSea
    function contractURI() public pure returns (string memory) {
        return "";
    }

    /// @dev this is internal mint function
    /// @param authorAddress the user that is minting the token address
    /// @param metadataPtr the metadata uri for the nft
    /// @param amount the amount of tdao tokens submitting
    function mintArticleToken(address authorAddress, string memory metadataPtr, uint256 amount)
        public
        returns (uint256)
    {
        require(tDaoToken.balanceOf(msg.sender) > amount, "You don't have enough TDAO tokens");
        tDaoToken.transferFrom(authorAddress, treasury, amount);

        _tokenIds.increment();
        
        uint256 newItemId = _tokenIds.current();
        _mint(authorAddress, newItemId);
        _setTokenURI(newItemId, metadataPtr);

        return (newItemId);
    }

    /// @dev public function to set the token URI
    /// @param _tokenId the id of the token to update
    /// @param _tokenURI the new token URI
    function setTokenURI
    (
        uint256 _tokenId,
        string memory _tokenURI
    )
        public
        onlyOwner
    {
        _setTokenURI(_tokenId, _tokenURI);
    }

    function getContractBalance(address token) public view onlyOwner returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function withdrawTDAOTokens() public onlyOwner {
        tDaoToken.transferFrom(address(this), _msgSender(), tDaoToken.balanceOf(address(this)));
    }
}
