import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonProgressBar,
    IonRow
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { CompressData } from "../../model/CompressData";
import { ConvertData } from "../../model/ConvertData";
import { ConvertStatus } from "../../model/ConvertStatus";
import { ConvertUtil } from "../../services/ConvertUtil.service";
import { FileCardDownloadButton } from "../FileCardDownloadButton/FileCardDownloadButton";
import { FileImage } from "../FileImage/FileImage";
import { FileSizeLabel } from "../FileSizeLabel/FileSizeLabel";
import { compressContext } from "../providers/CompressProvider";
import { convertStatusContext } from "../providers/ConvertStatusProvider";
import './FileCard.scss';

export interface FileCardProps {
    /** HEIC画像 */
    heic: File;
}


export const FileCard = (props: FileCardProps) => {
    const { heic } = props;
    const [data, setData] = useState<ConvertData>({ file: heic, status: ConvertStatus.NONE, proccess: 0.0, convertedBlob: null });
    // 変換ステータス
    const status: ConvertStatus = useContext<ConvertStatus>(convertStatusContext);
    // 圧縮
    const compress: CompressData = useContext<CompressData>(compressContext);
    const { convertHeic2Png, compressBlob } = ConvertUtil();
    const progressType: "indeterminate" | undefined = data?.status === ConvertStatus.PROCESSING ? "indeterminate" : undefined;

    // 変換開始の監視
    useEffect(() => {
        if (status === ConvertStatus.PROCESSING) {
            convert();
        }
    }, [status]);

    //変換処理
    const convert = async () => {
        //一部分だけ更新
        setData((prevState) => ({ ...prevState, status: ConvertStatus.PROCESSING }));
        try {
            let dest: Blob = await convertHeic2Png(data.file);
            //圧縮処理
            if (compress.isCompress) {
                dest = await compressBlob(dest, compress.CompressLevel as number);
            }
            setData((prevState) => ({ ...prevState, convertedBlob: dest }));
            console.log(dest);
        } catch (e) {
            throw e;
        }

        setData((prevState) => ({ ...prevState, status: ConvertStatus.DONE, proccess: 1.0 }));
        console.log(data);
    };


    //ダウンロード処理
    const onClickDownloadBtn = () => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(data?.convertedBlob as Blob);
        link.download = data.file.name.toUpperCase().replace(".HEIC", ".png");
        link.click();
        URL.revokeObjectURL(link.href);
        console.log("dlc process");
    };

    return (
        <>
            <FileImage imgBlob={data?.convertedBlob} />
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{data?.file.name}</IonCardTitle>
                    <IonCardSubtitle>
                        <FileSizeLabel data={data} />
                    </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol className="progress-center">
                                <IonProgressBar type={progressType} value={data?.proccess}></IonProgressBar>
                            </IonCol>

                            <IonCol className="btn-center">
                                <FileCardDownloadButton onClickDownload={onClickDownloadBtn} status={data?.status} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        </>
    );
};