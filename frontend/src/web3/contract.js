import { ethers } from "ethers";

const contractAddress = "address";

const abi = [
  {
    "inputs":[{"internalType":"address","name":"_freelancer","type":"address"}],
    "name":"createJob",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"jobCount",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
];

export const createJobOnChain = async (freelancer, amount) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);

  const tx = await contract.createJob(freelancer, {
    value: ethers.parseEther(amount),
  });

  await tx.wait();

  const count = await contract.jobCount();

  return Number(count) - 1;
};