const ethers = require("ethers");
const hre = require("hardhat");

async function main() {
  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
  const wallet = new ethers.Wallet(
    "", //본인의 private key를 입력해주세요
    provider
  );
  const artifact = hre.artifacts.readArtifactSync("UniswapV2Pair");
  const abi = artifact.abi;
  const pairAddress = "";

  const IERC20 = await hre.artifacts.readArtifact("IERC20");
  const IERC20abi = IERC20.abi;

  const token0 = "";
  const token1 = "";

  const amountIn = ethers.parseUnits("10", 18);
  const amountOutMin = ethers.parseUnits("0", 18);

  const token0Contract = new ethers.Contract(token0, IERC20abi, wallet);
  const approve0 = await token0Contract.approve(pairAddress, amountIn);
  await approve0.wait();
  const tx0 = await token0Contract.transfer(pairAddress, amountIn);
  await tx0.wait();
  console.log('승인완료, 토큰 전송하겠습니다');


  const pair = new ethers.Contract(pairAddress, abi, wallet);

  const [reserve0, reserve1] = await pair.getReserves();
  const amountInWithFee = BigInt(amountIn) * BigInt(997);
  const numerator = amountInWithFee * BigInt(reserve1);
  const denominator = BigInt(reserve0) * BigInt(1000) + amountInWithFee;
  const amountOut = numerator / denominator; // CPMM formula with BigInt

  console.log("예상 토큰 양", amountOut.toString());
  const swap = await pair.swap(0, amountOut.toString(), wallet.address, "0x");
  const receipt = await swap.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
