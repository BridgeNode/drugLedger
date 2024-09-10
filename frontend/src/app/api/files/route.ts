import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/backend/ipfs/init"
import { contract } from "@/backend/init";

// export const config = {
//    api: {
//       bodyParser: false,
//    },
// };

export async function POST(request: NextRequest) {
   try {
      const data = await request.json()
      console.log(data)
      const dataJson = JSON.stringify(data)
      const file = new File([dataJson], "drug.json", { type: "application/json" });
      const uploadData = await pinata.upload.file(file)
      const url = await pinata.gateways.createSignedURL({
         cid: uploadData.cid,
         expires: 3600,
      });
      return NextResponse.json({url, cid: uploadData.cid}, { status: 200 });
   } catch (e) {
      console.log(e);
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
}

export async function GET(req: Request) {
   const url = new URL(req.url)
   const {searchParams} = url
   const cid = searchParams.get("cid")
   try {
      const data = await pinata.gateways.get(cid as string);
      console.log(data)
      return NextResponse.json(data, {status: 200})
   } catch(e) {
      console.log(e)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
}