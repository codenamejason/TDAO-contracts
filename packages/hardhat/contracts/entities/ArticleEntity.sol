pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArticleEntity {
    using Counters for Counters.Counter;

    Counters.Counter public _articleIds;

    struct Article {
        uint256 id;
        address author; // the address of the author
        string metadataPtr; // token uri to metadata
        string arweaveHash; // the arweave hash
        uint256 tokenId; // the token id representing the authors article
        uint256 paid; // the amount paid for the article to be saved on the system
    }

    Article[] articleList;

    /// @dev the string is the arweave hash
    mapping(string => Article) public articles;

    constructor() public {}

    /// @dev add a new article on-chain
    /// @param authorAddress the address of the author
    /// @param arweaveHash the arweave hash in bytes32
    function addArticle(address authorAddress, string memory arweaveHash, string memory metadataPtr, uint256 paid) public returns (uint256) {
        _articleIds.increment();
        uint256 id = _articleIds.current();
        // console.log(id);
        Article storage article = articles[arweaveHash];
        article.id = id;
        article.author = authorAddress;
        article.paid = paid;
        article.metadataPtr = metadataPtr;

        // articleList[id] = article;

        return id;
    }
    
    /// @dev update the authors address for an article
    /// @param authorAddress the address of the author
    function updateArticleAuthorAddress(uint256 articleId, address authorAddress) public {
        Article storage article = articleList[articleId];
        article.author = authorAddress;
    }

    /// @dev Update article metadata
    /// @param articleId the id of the article
    function updateArticleMetadata(uint256 articleId, string memory newPointer) public {
        Article storage article = articleList[articleId];
        article.metadataPtr = newPointer;
    }


    function getArticleByHash (string memory arweaveHash) public view returns(Article memory) {
        return articles[arweaveHash];
    }

    function getArticleById (uint256 articleId) public view returns(Article memory) {
        return articleList[articleId];
    }
}