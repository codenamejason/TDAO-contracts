const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("TalentDAO Journal of Decentralized Work", function () {
  let reputationController;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("ReputationController", function () {
    it("Should deploy ReputationController", async function () {
      const Contract = await ethers.getContractFactory("ReputationController");
      reputationController = await Contract.deploy();
    });

    describe("createNewUser()", function () {
      it("Should create a new user", async function () {
        const [user] = await ethers.getSigners();

        expect(reputationController.createNewUser(user.address))
          .to.emit(reputationController, "NewUser")
          .withArgs(user.address);
      });

      // Uncomment the event and emit lines in YourContract.sol to make this test pass

      /* it("Should emit a SetPurpose event ", async function () {
        const [owner] = await ethers.getSigners();

        const newPurpose = "Another Test Purpose";

        expect(await myContract.setPurpose(newPurpose)).to.
          emit(myContract, "SetPurpose").
            withArgs(owner.address, newPurpose);
      }); */
    });
  });
});
