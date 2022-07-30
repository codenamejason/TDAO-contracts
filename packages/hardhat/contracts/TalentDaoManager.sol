pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./entities/AuthorEntity.sol";
import "./entities/ArticleEntity.sol";
import "./interfaces/ITDAOToken.sol";
import {IArticleNft} from "./interfaces/IArticleNft.sol";
import "./interfaces/ITDAOMemberToken.sol";


/// @title TokenRecover
/// @author Jaxcoder
/// @dev Allow to recover any ERC20 sent into the contract for error
contract TokenRecover is Ownable {
    /**
     * @dev Remember that only owner can call so be careful when use on contracts generated from other contracts.
     * @param tokenAddress The token contract address
     * @param tokenAmount Number of tokens to be sent
     */
    function recoverERC20(address tokenAddress, uint256 tokenAmount) public onlyOwner {
        IERC20(tokenAddress).transfer(owner(), tokenAmount);
    }
}

/// @title Manages the Authors and Articles on-chain
/// @author jaxcoder
/// @notice 
/// @dev 
contract TalentDaoManager is Ownable, AuthorEntity, AccessControl, TokenRecover {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    error FailedTransfer();
    
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    address public manager;

    ITDAOToken public tDaoToken;
    IArticleNft public articleNft;
    ITDAOMemberToken public tDaoMemberToken;

    event ManagerRemoved(address indexed oldManager);
    event ManagerAdded(address indexed newManager);
   
    constructor(address _manager, address _owner, address _TDAOToken, address _TDAONFTToken) {
        manager = _manager;
        _setupRole(MANAGER_ROLE, _manager);
        tDaoToken = ITDAOToken(_TDAOToken);
        articleNft = IArticleNft(_TDAONFTToken);
        // tDaoMemberToken = ITDAOMemberToken(_TDAOMemberToken);
        transferOwnership(_owner);
    }

    function mintMemberToken (address to, string memory metadataPtr, uint256 amount) public {
        tDaoMemberToken.mintMembershipToken(to, metadataPtr, amount);
    }
    
    /// @dev transfer TDAO tokens
    /// @param to the recipient of the tokens
    function _transferTokens (address to, uint256 amount) internal {
        tDaoToken.transfer(to, amount);
    }
    
    /// @dev transfer TDAO tokens
    /// @param from the sender(author) of the tokens
    function transferTokens (address from, uint256 amount) public onlyRole(MANAGER_ROLE) {
        tDaoToken.transferFrom(from, address(this), amount);
    }

    /// @dev admin function to update the contract manager
    /// @param newManager the address of the new manager
    function updateManger (address newManager) public onlyOwner {
        revokeRole(MANAGER_ROLE, manager);
        emit ManagerRemoved(manager);
        manager = newManager;
        grantRole(MANAGER_ROLE, manager);
        emit ManagerAdded(manager);
    }


    function mintArticleNFT(address owner, string memory metadataPtr, uint256 amount)
        public
        returns (uint256)
    {
        (uint256 newItemId) = articleNft.mintNFTForArticle(owner, metadataPtr, amount);

        return (newItemId);
    }
    

    function tipAuthor(address author, uint256 amount) public {
        require(tDaoToken.balanceOf(msg.sender) >= amount, "You don't have enough TDAO tokens");
        (bool success) = tDaoToken.transferFrom(msg.sender, author, amount);
        if(!success) revert FailedTransfer();
    }

    function tipAuthorEth() public payable {
        (bool success, ) = msg.sender.call{ value: msg.value }("");
        if(!success) revert FailedTransfer();
    }
    
}