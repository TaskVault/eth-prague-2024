import { generateReactHelpers } from "@uploadthing/react";
import {OurFileRouter} from "@/server/uploadthings";



export const { useUploadThing, uploadFiles } =
    generateReactHelpers<OurFileRouter>();
