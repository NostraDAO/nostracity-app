import fedoraIcon from "../public/assets/icons/fedora.png";
const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
const tokenSymbol = 'FAKE BOSS';
const tokenDecimals = 18;
const tokenImage = "../public/assets/icons/fedora.png";
declare const window: any;


export default async function addToken(){

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('$BOSS Token added!');
  } else {
    console.log('$BOSS Token not added!');
  }
} catch (error : any) {
  console.log(error);
}
}