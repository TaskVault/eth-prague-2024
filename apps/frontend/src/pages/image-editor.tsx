'use client';
import type {NextPage} from "next";
import 'tui-image-editor/dist/tui-image-editor.css';
// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor';
import dynamic from "next/dynamic";
import {ImageEditorComp} from "@/components/ImageEditorComp";

const TerminalComponent = dynamic(() => import('@/components/ImageEditorComp').then(
    mod => mod.ImageEditorComp
), {
    ssr: false
})

const ImageEditorPage: NextPage = () => {
    return (
        <TerminalComponent/>
    );
}

export default ImageEditorPage;

