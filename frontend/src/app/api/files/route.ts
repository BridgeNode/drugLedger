import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/backend/ipfs/init"
import { parse } from "path";

export async function POST(request: NextRequest) {
   try {
      const data = await request.json()
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
      const blob = await (data as any).data.text().then((text: any) => {
         return JSON.parse(text)
      })
      const result = blob ?? data.data;
      console.log(result)
      return NextResponse.json({data: result}, {status: 200})
   } catch(e) {
      console.log(e)
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
}