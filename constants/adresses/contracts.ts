export let dai_address;
export let barber_address;
export let grocery_address;
export let diner_address;
export let proxy_competition_helper;
export let treasury_address;

if(process.env.NODE_ENV == "production"){
    dai_address = "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70";
    barber_address = "0xAF803Fe0fb6c68f0e839f00d14D6599bBD1cB413";
    grocery_address = "0x54Fab4370E9Ad1486277323c093Aa845c089Cdc0";
    diner_address = "0x8eC8D20d779CF0ACF0E8b246C7C0396f24366970";
    proxy_competition_helper = "0xEEAD66b86bAe351B6777F53664ECE2988715f71f";
    treasury_address = "0x6565d2c7EB4eeBBBc5504162f5f14Ca8B15ba5CC";
}
// Contracts bellow are all on Fuji Test Chain for testing purposes ;)
if(process.env.NODE_ENV == "development"){
    dai_address = "0xAe72Ff0EFa43e25F509dC0d300D28EFfcaA1d3f3";
    barber_address = "0x6D873078e0Fc75D6DeF2E578d52a709d20b8bcD0";
    grocery_address = "0x32dA23a7dF89b85803f83935AD344D0c245547bb";
    diner_address = "0xE38528c3F3168C6fa0cF6504F0B5909983512a65";
    proxy_competition_helper = "0x9Ac47BE3db71115c0ba71BB50A690E5Ba3628e73";
    treasury_address = "0x0E76F7D22615b7152Fe89c48e46207490e749cD0";
}
