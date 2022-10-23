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
import { memo, useContext, useEffect, useState } from "react";
import { CompressData } from "../../model/CompressData";
import { ConvertData } from "../../model/ConvertData";
import { ConvertJobData } from "../../model/ConvertJobData";
import { ConvertStatus } from "../../model/ConvertStatus";
import { ConvertUtil } from "../../services/ConvertUtil.service";
import { FileCardDownloadButton } from "../FileCardDownloadButton/FileCardDownloadButton";
import { FileImage } from "../FileImage/FileImage";
import { FileSizeLabel } from "../FileSizeLabel/FileSizeLabel";
import { compressContext } from "../providers/CompressProvider";
import { convertJobContext, setConvertJobContext } from "../providers/ConvertJobStatusProvider";
import './FileCard.scss';

export interface FileCardProps {
    /** HEIC画像 */
    heic: File;
    /** ジョブID */
    id: number;
}

/**
 * 変換データカード
 * @param props 
 * @returns 
 */
export const FileCard = memo<FileCardProps>(props => {
    const { heic, id } = props;

    // 変換データ
    const [data, setData] = useState<ConvertData>({
        file: heic,
        id: id,
        status: ConvertStatus.NONE,
        proccess: 0.0,
        convertedBlob: null
    });

    //ジョブ
    const convertJob: ConvertJobData = useContext(convertJobContext);
    const setConvertJob = useContext(setConvertJobContext);
    // 圧縮
    const compress: CompressData = useContext<CompressData>(compressContext);
    const { convertHeic2Png, compressBlob } = ConvertUtil();

    const progressType: "indeterminate" | undefined = data?.status === ConvertStatus.PROCESSING ? "indeterminate" : undefined;


    // 変換開始の監視
    useEffect(() => {
        const allowedConvert: boolean = (data.id - convertJob.FinishedJobCount) < 10;

        //変換開始ボタンが押下されているかつ、変換処理は10件ずつ行う
        if (data.status === ConvertStatus.NONE && convertJob.WholeStatus === ConvertStatus.PROCESSING && allowedConvert) {
            convert();
        }
    }, [convertJob]);

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
        } catch (e) {
            throw e;
        }

        //変換データ更新
        setData((prevState) => ({ ...prevState, status: ConvertStatus.DONE, proccess: 1.0 }));
        //ジョブ完了数更新
        setConvertJob((prevState) => {
            const finishedCount: number = prevState.FinishedJobCount + 1;
            //全件終了した場合、ステータスを完了に切り替える
            if (finishedCount === prevState.TotalJobCount) {
                setConvertJob((prevState => ({ ...prevState, WholeStatus: ConvertStatus.DONE })));
            }
            return { ...prevState, FinishedJobCount: finishedCount }
        });
        console.log(data.id + "done");
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
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>No.{data.id + 1} - {data?.file.name}</IonCardTitle>
                <IonCardSubtitle>
                    <FileSizeLabel data={data} />
                </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="3">
                            <FileImage imgBlob={data?.convertedBlob} />
                        </IonCol>

                        <IonCol size="6" className="progress-center">
                            <IonProgressBar type={progressType} value={data?.proccess}></IonProgressBar>
                        </IonCol>

                        <IonCol size="3" className="btn-center">
                            <FileCardDownloadButton onClickDownload={onClickDownloadBtn} status={data?.status} />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
});