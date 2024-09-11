

export const sortExplorer = (obj: any) => {
   let newArray: any[] = [];
   let list: any[] = [];
   Object.entries(obj).forEach(([key, value]) => {
      newArray = [...newArray, ...value as any]
      switch (key) {
         case "registeredDrugs":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Registered Drug",
                  type: "Drug Registration",
               })
            });
            break;

         case "logs":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Logs",
                  type: "Activity Log",
               })
            });

            break;

         case "issueOpeneds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Issue Opened",
                  type: "Isse Reported",
               })
            });
            break;

         case "issueCloseds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Issue Closed",
                  type: "Issue Resolved",
               })
            });
            break;

         case "manufacturerRevokeds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Manufacturer Revoked",
                  type: "Revoked",
               })
            });
            break;

         case "registeredManufacturers":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Registered Manufacturer",
                  type: "Manufacturer Registration",
               })
            });
            break;

         default:
            break;
      }
   })
   const sorted = list.sort((a,b) => b.blockTimestamp - a.blockTimestamp)
   // console.log(list)
   // console.log(sorted)
   return sorted
}