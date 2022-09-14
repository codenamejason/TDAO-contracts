const contractList = import("../contracts/hardhat_contracts.json");
// @ts-ignore
const externalContracts = import("../contracts/external_contracts");

export const talentTokenContract = async () => {
  return {
    addressOrName: (await contractList).default[80001][0].contracts.TalentDaoToken.address,
    contractInterface: (await contractList).default[80001][0].contracts.TalentDaoToken.abi,
  };
};

export const veTalentTokenContract = async () => {
  return {
    addressOrName: (await contractList).default[80001][0].contracts.veTalentToken.address,
    contractInterface: (await contractList).default[80001][0].contracts.veTalentToken.abi,
  };
};

export const managerContract = async () => {
  return {
    addressOrName: (await contractList).default[80001][0].contracts.TalentDaoManager.address,
    contractInterface: (await contractList).default[80001][0].contracts.TalentDaoManager.abi,
  };
};

export const lensHubMumbaiContract = async () => {
  return {
    addressOrName: (await externalContracts).default[80001].contracts.LENS.address,
    contractInterface: (await externalContracts).default[80001].contracts.LENS.abi,
  };
};

export const lensHubPolygonContract = async () => {
  return {
    addressOrName: (await externalContracts).default[137].contracts.LENS.address,
    contractInterface: (await externalContracts).default[137].contracts.LENS.abi,
  };
};
