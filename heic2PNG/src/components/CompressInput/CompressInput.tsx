import { IonCheckbox, IonCol, IonInput, IonLabel, IonRow } from "@ionic/react";
import { useContext } from "react";
import { CompressData } from "../../model/CompressData";
import { compressContext, setCompressContext } from "../providers/CompressProvider";
import "./CompressInput.scss";

export const CompressInput = () => {
    const compress: CompressData = useContext<CompressData>(compressContext);
    const setCompress = useContext(setCompressContext);

    return (
        <IonRow style={{ width: '100%' }}>
            <IonCol size='3' className='col-center'>
                <IonLabel style={{ marginRight: '15px' }}>圧縮させる</IonLabel>
                <IonCheckbox checked={compress.isCompress} onIonChange={e => setCompress((prevState) => ({ ...prevState, isCompress: e.detail.checked }))} />
            </IonCol>

            <IonCol className='col-center'>
                <IonInput disabled={compress.isCompress === false} type='number' max={10} min={1} value={compress.CompressLevel}
                    onIonChange={e => setCompress((prevState) => ({ ...prevState, CompressLevel: parseInt(e.detail.value!, 0) }))} placeholder="圧縮するサイズ(1~10MB)" />
            </IonCol>
        </IonRow >
    )
};