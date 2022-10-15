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
import { ConvertData } from "../../model/ConvertData";
import { ConvertStatus } from "../../model/ConvertStatus";
import './FileCard.css';

const FileCard = (props: ConvertData) => {

    const { file, status, proccess } = props;

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{file.name}</IonCardTitle>
                <IonCardSubtitle>{file.size}byte</IonCardSubtitle>
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