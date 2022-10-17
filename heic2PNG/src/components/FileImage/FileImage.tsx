import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";

export interface FileImageProp {
    imgBlob: Blob | null;
}

export const FileImage = (props: FileImageProp) => {
    const { imgBlob } = props;
    const [base64, setBase64] = useState<string>("");

    const file2Base64 = async (file: File): Promise<string> => {
        const fs: FileReader = new FileReader();
        fs.readAsDataURL(file);
        return new Promise((resolve) => {
            fs.onload = () => {
                resolve(fs.result as string);
            }
        });
    }

    useEffect(() => {
        (async () => {
            if (!imgBlob) { return; }
            const result: string = await file2Base64(new File([imgBlob], "", { type: "image/png" }));
            setBase64(result);
        })();
    }, [imgBlob]);

    return (
        <IonImg src={base64}></IonImg>
    )
}