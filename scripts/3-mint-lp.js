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

  const amount0 = ethers.parseUnits("1000", 18);
  const amount1 = ethers.parseUnits("1000", 18);

  const token0Contract = new ethers.Contract(token0, IERC20abi, wallet);
  const token1Contract = new ethers.Contract(token1, IERC20abi, wallet);

  const approve0 = await token0Contract.approve(pairAddress, amount0);
  await approve0.wait();
  const approve1 = await token1Contract.approve(pairAddress, amount1);
  await approve1.wait();

  console.log('승인완료, 토큰 전송하겠습니다');

  const tx0 = await token0Contract.transfer(pairAddress, amount0);
  await tx0.wait();
  const tx1 = await token1Contract.transfer(pairAddress, amount1);
  await tx1.wait();

  console.log('토큰 전송완료, 이제 페어 컨트랙트에서 페어 토큰 발행하겠습니다');

  const pair = new ethers.Contract(pairAddress, abi, wallet);
  const mint = await pair.mint(wallet.address);
  const receipt = await mint.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
