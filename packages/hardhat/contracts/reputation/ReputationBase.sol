pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol"; // Remove after testing is completed - JR
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../libs/Timers.sol";
import "../libs/Counters.sol";
import "../libs/ABDKMath64x64.sol";

abstract contract ReputationBase is Ownable {
    using Counters for Counters.Counter;
    using ABDKMath64x64 for uint256;
    using SafeERC20 for IERC20;

    // state variables
    Counters.Counter public userIds;


    // custom errors
    error BadId();
    error ZeroAddress();


    // structs
    struct User {
        uint128 id;
        uint128 totalScore;
        address walletId;
        Reputation[] reputations;
    }

    struct Reputation {
        uint128 id;
        uint128 score;
    }

    struct Metadata {
        uint128 id;
        // not sure how to use this yet...
    }


    // events
    event NewUser(address indexed user);
    event ReputationIncreased(address indexed user, uint256 increaseAmt);
    event ReputationDecreased(address indexed user, uint256 decreaseAmt);
    event Blacklisted(address indexed user);


    // logic/functions
}