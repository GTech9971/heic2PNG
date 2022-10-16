import { ConvertData } from "../model/ConvertData";
import { ConvertStatus } from "../model/ConvertStatus";
import { HeicConvert } from "./heicConvert.service";

export const Convert = async (dataList: ConvertData[]): Promise<void> => {
    const { convertHeic2Png } = HeicConvert();

    for (let data of dataList) {
        data.status = ConvertStatus.PROCESSING;
        try {
            data.convertedBlob = await convertHeic2Png(data);
        } catch (e) {
            throw e;
        }

        data.status = ConvertStatus.DONE;
        console.log(data);
    }
}