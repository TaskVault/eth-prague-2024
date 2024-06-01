'use client';
import type {NextPage} from "next";
import 'tui-image-editor/dist/tui-image-editor.css';
// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor';
import dynamic from "next/dynamic";
import {ImageEditorComp} from "@/components/ImageEditorComp";


// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import {useCallback, useState } from "react";
import {useUploadThing} from "@/lib/useUploadThing";



function MultiUploader() {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, permittedFileInfo } = useUploadThing(
        "imageUploader",
        {
            onClientUploadComplete: (data) => {
                console.log("upload complete", data);
                alert("uploaded successfully!");
            },
            onUploadError: () => {
                alert("error occurred while uploading");
            },
            onUploadBegin: () => {
                alert("upload has begun");
            },
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
                {files.length > 0 && (
                    <button onClick={() => startUpload(files)}>
                        Upload {files.length} files
                    </button>
                )}
            </div>
            Drop files here!
        </div>
    );
}

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

