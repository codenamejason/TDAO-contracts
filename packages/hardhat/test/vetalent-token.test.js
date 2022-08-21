const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("veTalent Token Tests", function () {
  let veTalentContract;
  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("veTalent Token", function () {
    it("Should deploy veTalent Token", async function () {
      const Contract = await ethers.getContractFactory("veTalentToken");
      veTalentContract = await Contract.deploy(
        "0xA4ca1b15fE81F57cb2d3f686c7B13309906cd37B"
      );
      console.log("veTalentContract", veTalentContract);
    });
  });
});
