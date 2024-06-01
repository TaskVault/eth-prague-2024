'use client';
import type {NextPage} from "next";
import {useState} from "react";
import 'tui-image-editor/dist/tui-image-editor.css';
import dynamic from "next/dynamic";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import {useUploadThing} from "@/lib/useUploadThing";

const ImageEditorDynamic = dynamic(() => import('@/components/ImageEditorComp').then(
    mod => mod.ImageEditorComp
), {
    ssr: false
})

const ImageEditorPage: NextPage = () => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const { startUpload, isUploading } = useUploadThing(
        "imageUploader",
        {
            onClientUploadComplete: (data) => {
                console.log("upload complete", data);
                setFileUrl(data[0].url);
            },
            onUploadError: () => {
                alert("error occurred while uploading");
            },
            onUploadBegin: () => {
                alert("upload has begun");
            },
        },
    );
    const onDownload = async (props: { file: File }) => {
        console.log("onDownload", props);
        await startUpload([props.file]);
    }
    return (
        <>
            <ImageEditorDynamic onDownload={onDownload}/>
            <div>
                {isUploading ? (
                    <p>Uploading...</p>
                ) : null}
                {fileUrl ? (
                    <>
                        <img src={fileUrl} alt="uploaded image"/>
                        <div>
                            <a href={fileUrl}>click here to download</a>
                        </div>

                    </>
                ) : null}
            </div>
        </>
    );
}

export default ImageEditorPage;

