import 'tui-image-editor/dist/tui-image-editor.css';
// @ts-ignore
import ImageEditor from '@toast-ui/react-image-editor';
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

export const ImageEditorComp = (props: {
    onDownload?: (props: {
        file: File;
    }) => void;
    setDownloadHandler?: (handler: () => void) => void;
}) => {
    const editorRef = useRef(null);
    const [hasDownloaded, setHasDownloaded] = useState(false);

    const handleDownload = () => {
        // @ts-ignore
        const imageEditorInst = editorRef.current.getInstance();
        const imgEl = imageEditorInst.toDataURL();
        const buffer = Buffer.from(imgEl.split(',')[1], 'base64');
        const blob = new Blob([buffer], { type: 'image/png' });
        const file = new File([blob], 'image.png', { type: 'image/png' });
        props?.onDownload?.({ file });
    };

    useEffect(() => {
        if (props.setDownloadHandler) {
            props.setDownloadHandler(handleDownload);
        }
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
            />
            {!props.setDownloadHandler && (
                <Button onClick={handleDownload} disabled={hasDownloaded}>
                    {hasDownloaded ? 'Downloaded' : 'Download'}
                </Button>
            )}
        </>
    );
};
