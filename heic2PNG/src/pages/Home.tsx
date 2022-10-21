import {
  IonBadge,
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
import React, { useContext, useState } from 'react';
import FileInput, { FileInputProps } from '../components/FileInput/FileInput';
import './Home.css';
import { FileCard } from '../components/FileCard/FileCard';
import { ConvertButton } from '../components/ConvertButton/ConvertButton';
import { CompressInput } from '../components/CompressInput/CompressInput';
import { setConvertJobContext } from '../components/providers/ConvertJobStatusProvider';
import { JobCountLabel } from '../components/JobCountLabel/JobCountLabel';

export const Home: React.FC = () => {
  const setConvertJob = useContext(setConvertJobContext);
  const [imgs, setImgs] = useState<File[]>([]);

  const props: FileInputProps = {
    text: 'HEICファイルをドラッグ',
    /** ファイル入力時のイベントハンドラ */
    handler: (files: FileList) => {
      const newList: File[] = [];
      for (let i = 0; i < files.length; i++) {
        newList.push(files.item(i) as File);
      }
      setImgs(newList);

      // ジョブ数設定
      setConvertJob({ FinishedJobCount: 0, TotalJobCount: newList.length });
    }
  }

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
            <FileInput text={props.text} handler={props.handler} />
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
                  <FileCard key={index} heic={data} />
                )
              })}
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};