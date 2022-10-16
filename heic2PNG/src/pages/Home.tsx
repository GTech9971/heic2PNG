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
import React, { useState } from 'react';
import FileInput, { FileInputProps } from '../components/FileInput/FileInput';
import './Home.css';
import { FileCard } from '../components/FileCard/FileCard';

const Home: React.FC = () => {
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
          <IonRow className='row-center'>
            <FileInput text={props.text} handler={props.handler} />
          </IonRow>

          <IonRow>
            <IonCol>
              {/* 変換ボタン */}
              {/* <IonButton color={'danger'} onClick={onClickConvertBtn}>Convert</IonButton> */}
            </IonCol>
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

export default Home;
