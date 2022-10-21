import { IonBadge, IonLabel } from "@ionic/react";
import { useContext } from "react"
import { ConvertJobData } from "../../model/ConvertJobData"
import { convertJobContext } from "../providers/ConvertJobStatusProvider"

/**
 * ジョブ数と完了数を表示するラベル
 * @returns 
 */
export const JobCountLabel = () => {
    const convertJob: ConvertJobData = useContext<ConvertJobData>(convertJobContext);

    return (
        <>
            {
                convertJob.TotalJobCount !== -1 &&
                <IonLabel>
                    <IonBadge color={'danger'}>
                        {convertJob.FinishedJobCount}/{convertJob.TotalJobCount}
                    </IonBadge>
                </IonLabel>
            }
        </>
    )
}