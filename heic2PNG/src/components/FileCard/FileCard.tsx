import {
    IonButton,
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
import './FileCard.css';

/**
 * 変換ステータス
 */
export enum ConvertStatus {
    NONE,
    PROCESSING,
    DONE,
    ERROR,
}

export interface FileCardProps {
    /** ファイル名 */
    fileName: string;
    /** ファイルサイズ */
    fileSize: number;
    /** 変換ステータス */
    status: ConvertStatus;
    /** 変換率 */
    proccess: number;
}

const FileCard = (props: FileCardProps) => {

    const { fileName, fileSize, status, proccess } = props;

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{fileName}</IonCardTitle>
                <IonCardSubtitle>{fileSize}byte</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol className="progress-center">
                            <IonProgressBar value={proccess}></IonProgressBar>
                        </IonCol>

                        <IonCol className="btn-center">
                            <IonButton disabled={status !== ConvertStatus.DONE} color={'primary'}>download</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    );
};

export default FileCard;