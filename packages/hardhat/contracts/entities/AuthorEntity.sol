pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ArticleEntity.sol";

contract AuthorEntity is ArticleEntity {
    using Counters for Counters.Counter;

    Counters.Counter public _authorIds;

    struct Author {
        address authorAddress;
        uint256 id;
        string arweaveProfileHash;
        Article[] articles;
    }

    Author[] authorList;

    mapping(address => Author) public authors;
    mapping(uint256 => Author) public idToAuthor;

    constructor() public {}

    /// @dev add a new author on-chain
    /// @param authorAddress the address of the author
    function addAuthor(address authorAddress, uint256 articleId, string memory profileHash)
        public
        returns (uint256)
    {
        _authorIds.increment();
        uint256 id = _authorIds.current();
        Author storage newAuthor = authors[authorAddress];
        newAuthor.id = id;
        newAuthor.arweaveProfileHash = profileHash;

        //Article storage articleRef = articleList[articleId];
        //newAuthor.articles[articleId].author = authorAddress;
        return id;
    }

    /// @dev edit an author on-chain
    /// @param authorAddress the address of the author
    function updateAuthor(address authorAddress)
        public
    {
        Author storage newAuthor = authors[authorAddress];
        // now edit...

    }

    function getAuthor(address authorAddress)
        public
        view
        returns(address, uint256, string memory)
    {
        return (authors[authorAddress].authorAddress, authors[authorAddress].id, authors[authorAddress].arweaveProfileHash);
    }
}