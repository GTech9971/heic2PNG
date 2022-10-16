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
import { useState } from "react";
import { ConvertData } from "../../model/ConvertData";
import { ConvertStatus } from "../../model/ConvertStatus";
import { HeicConvert } from "../../services/heicConvert.service";
import { ConvertButton } from "../ConvertButton/ConvertButton";
import './FileCard.css';

export interface FileCardProps {
    heic: File;
}

export const FileCard = (props: FileCardProps) => {
    const { heic } = props;
    const [data, setData] = useState<ConvertData>({ file: heic, status: ConvertStatus.NONE, proccess: 0.0, convertedBlob: null });
    const { convertHeic2Png } = HeicConvert();

    const progressType: "indeterminate" | undefined = data?.status === ConvertStatus.PROCESSING ? "indeterminate" : undefined;

    //変換処理
    const onClickConvertBtn = async () => {
        //一部分だけ更新
        setData((prevState) => ({ ...prevState, status: ConvertStatus.PROCESSING }));
        try {
            const dest: Blob = await convertHeic2Png(data);
            setData((prevState) => ({ ...prevState, convertedBlob: dest }));
        } catch (e) {
            throw e;
        }

        setData((prevState) => ({ ...prevState, status: ConvertStatus.DONE }));
        setData((prevState) => ({ ...prevState, proccess: 1.0 }));
        console.log(data);
    };

    //ダウンロード処理
    const onClickDownloadBtn = () => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(data?.convertedBlob as Blob);
        link.download = "";
        link.click();
        console.log("dlc process");
    };

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{data?.file.name}</IonCardTitle>
                <IonCardSubtitle>{data?.file.size}byte</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="progress-center">
                            <IonProgressBar type={progressType} value={data?.proccess}></IonProgressBar>
                        </IonCol>

                        <IonCol className="btn-center">
                            <ConvertButton onClickConvert={onClickConvertBtn} onClickDownload={onClickDownloadBtn} status={data?.status}></ConvertButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};