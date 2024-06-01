"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { use, useCallback, useRef, useState, useEffect } from "react";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useUploadThing } from "@/lib/useUploadThing";
import { usePosts } from "@/lib/usePosts";
import { v4 as uuidv4 } from "uuid";

interface iMeme {
  title: string;
  subTitle: string;
  description: string;
  imageUrl?: string;
}
const Menu = ({
  meme,
  onClose,
  onSubmitMeme,
}: {
  meme: iMeme;
  onSubmitMeme: () => void;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
      >
        Close
      </button>
      <img
        src={meme.imageUrl}
        alt={meme.title}
        className="w-full h-48 object-cover mb-4 rounded-lg"
        width={400}
        height={200}
      />
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        {meme.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{meme.subTitle}</p>
      <p className="text-gray-700 dark:text-gray-300">{meme.description}</p>
      <div className="flex">
        <Button
          className=""
          onClick={() => {
            console.log("Submit meme");
            console.log(meme);
            onSubmitMeme();
            onClose();
          }}
        >
          Submit Meme
        </Button>
        <Button
          className=""
          onClick={() => {
            console.log("Edit meme");
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

const ImageEditorDynamic = dynamic(
  () =>
    import("@/components/ImageEditorComp").then((mod) => mod.ImageEditorComp),
  {
    ssr: false,
  }
);
export default function Component() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<"yes" | "no" | "loading">("no");
  const [memeData, setMemeData] = useState<iMeme>({
    title: "",
    subTitle: "",
    description: "",
  });
  const [downloadHandler, setDownloadHandler] = useState<(() => void) | null>(
    null
  );

  const registerDownloadHandler = useCallback((handler: () => void) => {
    setDownloadHandler(() => handler);
  }, []);

  const triggerDownload = () => {
    if (downloadHandler) {
      downloadHandler();
    }
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (data) => {
      setFileUrl(data[0].url);
      console.log("upload complete");
      console.log(memeData);
      setMemeData({
        ...memeData,
        imageUrl: data[0].url,
      });
      setShowPopup("yes");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      setShowPopup("loading");
    },
  });
  const onDownload = async (props: { file: File }) => {
    const r = await startUpload([props.file]);
  };

  const handleCreateMeme = () => {
    triggerDownload();
    console.log("Create meme");
    console.log(memeData);
    setShowPopup("loading");
  };

  const { createPost } = usePosts();
  const submitPost = async () => {
    //Hardcoded cuz beginning
    const newUuid = "766b287e-cf55-4ee0-956b-9b010dc9400e";
    const res = await createPost
      .mutateAsync({
        title: memeData.title,
        description: memeData.description,
        image: memeData.imageUrl || "",
        userId: newUuid,
      })
      .then((r) => {
        console.log("post sent");
        return r;
      })
      .catch((e) => {
        console.log("error");
        console.log(e);
      });
    console.log("post sent");
    console.log(res);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ImageEditorDynamic
        onDownload={onDownload}
        setDownloadHandler={registerDownloadHandler}
      />
      <div className="space-y-4 min-w-[1000px]">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your name"
            className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
            onChange={(e) => {
              setMemeData({
                ...memeData,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Subtitle
          </Label>
          <Input
            id="subtitle"
            type="text"
            placeholder="Subtitle"
            className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
            onChange={(e) => {
              setMemeData({
                ...memeData,
                subTitle: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter your message"
            className="rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none min-h-[120px]"
            onChange={(e) => {
              setMemeData({
                ...memeData,
                description: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            id="cancel"
            variant="outline"
            className="rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none"
          >
            Cancel
          </Button>
          <Button
            className="rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none"
            id="create-meme"
            onClick={handleCreateMeme}
          >
            Generate Meme
          </Button>
        </div>
      </div>
      {showPopup == "loading" ? <p>Uploading...</p> : null}
      {showPopup == "yes" && (
        <Menu
          meme={{
            title: memeData.title,
            subTitle: memeData.subTitle,
            description: memeData.description,
            imageUrl: fileUrl || "",
          }}
          onClose={() => setShowPopup("no")}
          onSubmitMeme={() => submitPost()}
        />
      )}
    </div>
  );
}
