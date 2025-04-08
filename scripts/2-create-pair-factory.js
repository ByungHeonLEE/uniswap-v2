const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
  const wallet = new ethers.Wallet(
    "", //본인의 private key를 입력해주세요
    provider
  );

  const artifact = hre.artifacts.readArtifactSync("UniswapV2Factory");
  const abi = artifact.abi;
  console.log(wallet.address);

//미리 배포되어있는 erc20 컨트랙트 주소
  const token0 = "";
  const token1 = "";

  console.log("Erc20 주소 두가지는 이걸 사용합니다", token0, token1);

  const Factory = new ethers.Contract(
    "",
    abi,
    wallet
  );
  const createPair = await Factory.createPair(
    token0,
    token1
  );
  const receipt = await createPair.wait();
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
