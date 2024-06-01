import 'tui-image-editor/dist/tui-image-editor.css';
// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor';
import {useEffect, useRef } from 'react';
import {Button} from "@/components/ui/button";


export const ImageEditorComp = () => {
    const editorRef = useRef(null);

    const handleDownload = () => {
        const imageEditorInst = editorRef.current.getInstance();
        const imgEl = imageEditorInst.toDataURL();

        console.log("handleDownload", imgEl);
    }

    // hide .tui-image-editor-download-btn button after component mounted
    useEffect(() => {
        const downloadBtn = document.querySelector('.tui-image-editor-download-btn');
        downloadBtn.style.display = 'none !important';
        console.log("downloadBtn", downloadBtn);
    }, []);
    return (
        <>
            <ImageEditor
                includeUI={{
                    loadImage: {
                        path: 'img/sampleImage.jpg',
                        name: 'SampleImage',
                    },
                    initMenu: 'filter',
                    uiSize: {
                        width: '1000px',
                        height: '700px',
                    },
                    menuBarPosition: 'bottom',
                }}
                ref={editorRef}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                }}
                usageStatistics={true}
                onFocus={(props) => console.log("onFocus", props)}
                onAddText={(props) => console.log("onAddText", props)}
                onDownload={(props) => console.log("onDownload", props)}
            />
            <Button onClick={handleDownload}>Download</Button>
        </>
    );
}
