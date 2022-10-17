import {
  IonBadge,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import FileInput, { FileInputProps } from '../components/FileInput/FileInput';
import './Home.css';
import { FileCard } from '../components/FileCard/FileCard';
import { ConvertButton } from '../components/ConvertButton/ConvertButton';

export const Home: React.FC = () => {
  const [imgs, setImgs] = useState<File[]>([]);
  const [compress, setCompress] = useState<boolean>(false);
  const [compressLevel, setCompressLevel] = useState<number>(0);

  const props: FileInputProps = {
    text: 'HEICファイルをドラッグ',
    /** ファイル入力時のイベントハンドラ */
    handler: (files: FileList) => {
      const newList: File[] = [];
      for (let i = 0; i < files.length; i++) {
        newList.push(files.item(i) as File);
      }
      setImgs(newList);
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

          {/* 圧縮 */}
          <IonRow style={{ width: '100%' }}>
            <IonCol size='3' className='col-center'>
              <IonLabel style={{ marginRight: '15px' }}>圧縮させる</IonLabel>
              <IonCheckbox checked={compress} onIonChange={e => setCompress(e.detail.checked)}></IonCheckbox>
            </IonCol>

            <IonCol className='col-center'>
              <IonInput disabled={compress === false} type='number' max={10} min={1} value={compressLevel}
                onIonChange={e => setCompressLevel(parseInt(e.detail.value!, 0))} placeholder="圧縮するサイズ(1~10MB)"></IonInput>
            </IonCol>
          </IonRow>

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
                <IonLabel style={{ display: 'flex', alignItems: 'center' }}>
                  Convert HEIC image list
                  <IonBadge style={{ marginLeft: '5px' }} color={'danger'}>{imgs.length}</IonBadge>
                </IonLabel>
              </IonListHeader>

              {imgs.map((data, index) => {
                return (
                  <FileCard key={index} heic={data} compress={compress} compressLevel={compressLevel} />
                )
              })}
            </IonList>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage >
  );
};