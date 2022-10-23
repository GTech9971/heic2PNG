import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useCallback, useContext, useState } from 'react';
import FileInput from '../components/FileInput/FileInput';
import './Home.css';
import { FileCard } from '../components/FileCard/FileCard';
import { ConvertButton } from '../components/ConvertButton/ConvertButton';
import { CompressInput } from '../components/CompressInput/CompressInput';
import { setConvertJobContext } from '../components/providers/ConvertJobStatusProvider';
import { JobCountLabel } from '../components/JobCountLabel/JobCountLabel';
import { ConvertStatus } from '../model/ConvertStatus';

export const Home: React.FC = () => {
  const setConvertJob = useContext(setConvertJobContext);
  const [imgs, setImgs] = useState<File[]>([]);

  /** 画像ファイル入力時のイベント */
  const fileInputHandler = useCallback((files: FileList) => {
    const newList: File[] = [];
    for (let i = 0; i < files.length; i++) {
      newList.push(files.item(i) as File);
    }
    setImgs(newList);

    // ジョブ数設定
    setConvertJob({ FinishedJobCount: 0, TotalJobCount: newList.length, WholeStatus: ConvertStatus.NONE });
  }, [imgs]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>heic2PNG</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid>
          <IonRow className='row-center'>
            <h1>HEIC convert to PNG</h1>
          </IonRow>

          {/* 圧縮入力 */}
          <CompressInput />

          {/* ファイル入力 */}
          <IonRow className='row-center'>
            <FileInput handler={fileInputHandler} />
          </IonRow>

          <IonRow className='row-center'>
            <ConvertButton />
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow style={{ width: '100%' }}>
            <IonList style={{ width: '100%' }}>

              <IonListHeader lines='inset'>
                <IonGrid>
                  <IonRow>
                    <IonCol size='11'>
                      <IonLabel>
                        Convert HEIC image list
                      </IonLabel>
                    </IonCol>

                    <IonCol size='1'>
                      <JobCountLabel />
                    </IonCol>
                  </IonRow>
                </IonGrid>

              </IonListHeader>

              {imgs.map((data, index) => {
                return (
                  <FileCard key={index} heic={data} id={index} />
                )
              })}
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};