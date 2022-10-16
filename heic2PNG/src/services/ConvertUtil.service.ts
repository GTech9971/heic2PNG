import { ConvertData } from "../model/ConvertData";
import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

export const ConvertUtil = () => {

    /** heic画像をpngに変換する */
    const convertHeic2Png = async (data: ConvertData): Promise<Blob> => {
        const input: Blob = data.file;
        const dstBlob: Blob | Blob[] = await heic2any({ blob: input });
        return dstBlob as Blob;
    };


    /** 画像を圧縮させる */
    const compressImage = async (input: Blob, compressLevel: number): Promise<Blob> => {
        const option = {
            maxSizeMB: compressLevel,
            alwaysKeepResolution: true,
        };

        return await imageCompression(new File([input], "", { type: input.type }), option) as Blob;
    }

    return { convertHeic2Png, compressImage };
};