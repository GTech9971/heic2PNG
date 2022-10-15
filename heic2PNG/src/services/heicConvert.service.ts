import { ConvertData } from "../model/ConvertData";
import heic2any from "heic2any";

export const useHeicConvert = () => {

    const convertHeic2Png = async (data: ConvertData): Promise<Blob> => {
        const input: Blob = data.file;
        const dstBlob: Blob | Blob[] = await heic2any({ blob: input });
        return dstBlob as Blob;
    };

    return { convertHeic2Png };
};