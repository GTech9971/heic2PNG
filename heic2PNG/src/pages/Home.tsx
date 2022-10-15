import {
  IonBadge,
  IonButton,
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
  useIonAlert
} from '@ionic/react';
import React, { useState } from 'react';
import FileInput, { FileInputProps } from '../components/FileInput/FileInput';
import './Home.css';
import FileCard from '../components/FileCard/FileCard';
import { useHeicConvert } from '../services/heicConvert.service';
import { ConvertData } from '../model/ConvertData';
import { ConvertStatus } from '../model/ConvertStatus';

const Home: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [imgs, setImgs] = useState<File[]>([]);
  const [convertList, setConvertList] = useState<ConvertData[]>([]);

  const updateConvertData = (data: ConvertData) => {
    setConvertList(prevState => {
      prevState.forEach(d => {
        if (d.file.name === data.file.name) {
          d = data;
        }
      });

      const newList: ConvertData[] = [];
      prevState.forEach(d => { newList.push(d) });

      return newList;
    });
  };

  const { convertHeic2Png } = useHeicConvert();

  const props: FileInputProps = {
    text: 'HEICファイルをドラッグ',
    /** ファイル入力時のイベントハンドラ */
    handler: (files: FileList) => {
      const newList: File[] = [];
      for (let i = 0; i < files.length; i++) {
        newList.push(files.item(i) as File);
      }
      setImgs(newList);

      //ファイル変換モデルに変換
      const newConvertList: ConvertData[] = [];
      newList.forEach(f => {
        newConvertList.push({
          file: f,
          proccess: 0.0,
          status: ConvertStatus.NONE
        });
      });

      setConvertList(newConvertList);
    }
  }

  const onClickConvertBtn = async () => {
    // からの場合
    if (convertList.length === 0) {
      await presentAlert({ header: 'エラー', message: 'データがありません' });
      return;
    }

    for (let data of convertList) {
      data.status = ConvertStatus.PROCESSING;
      updateConvertData(data);
      try {
        const pngData: Blob = await convertHeic2Png(data);
      } catch (e) {
        throw e;
      }

      data.status = ConvertStatus.DONE;
      updateConvertData(data);
    }
  };



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
              <IonButton color={'danger'} onClick={onClickConvertBtn}>Convert</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow style={{ width: '100%' }}>
            <IonList style={{ width: '100%' }}>

              <IonListHeader lines='inset'>
                <IonLabel>
                  Convert HEIC image list
                  <IonBadge color={'danger'}>{imgs.length}</IonBadge>
                </IonLabel>
              </IonListHeader>

              {convertList.map((data, index) => {
                return (
                  <FileCard key={index}
                    file={data.file}
                    proccess={data.proccess}
                    status={data.status}
                  ></FileCard>
                )
              })}
            </IonList>
          </IonRow>
        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Home;
