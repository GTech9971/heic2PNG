import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

export const ConvertUtil = () => {

    /** heic画像をpngに変換する */
    const convertHeic2Png = async (input: Blob): Promise<Blob> => {
        const dstBlob: Blob | Blob[] = await heic2any({ blob: input });
        return dstBlob as Blob;
    };


    const option = {
        maxSizeMB: 0,
        alwaysKeepResolution: true,
        maxWidthOrHeight: 1920,
    };

    /** 画像を圧縮させる */
    const compressImage = async (input: File, compressLevel: number): Promise<File> => {
        option.maxSizeMB = compressLevel;
        return await imageCompression(input, option);
    }

    /** 画像を圧縮させる */
    const compressBlob = async (input: Blob, compressLevel: number): Promise<Blob> => {
        option.maxSizeMB = compressLevel;
        return await imageCompression(new File([input], "", { type: input.type }), option) as Blob;
    }

    return { convertHeic2Png, compressImage, compressBlob };
};