import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

// async function upload(metadata: any) {
//   try {
//     const file = new File([`${metadata}`], "drug.json", { type: "text/json" });
//     const upload = await pinata.upload.file(file);
//     console.log(upload);
//   } catch (error) {
//     console.log(error);
//   }
// }


// async function getIpfs(cid: string) {
//   try {
//     const data = await pinata.gateways.get(cid);
//     console.log(data)

//     const url = await pinata.gateways.createSignedURL({
//        	cid: cid,
//     	expires: 1800,
//     })
//     console.log(url)
//   } catch (error) {
//     console.log(error);
//   }
// }


export {pinata}
