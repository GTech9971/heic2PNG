import { IonBadge, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import FileInput, { FileInputProps } from '../components/FileInput/FileInput';
import './Home.css';
import FileCard, { ConvertStatus } from '../components/FileCard/FileCard';


const Home: React.FC = () => {

  const [imgs, setImgs] = useState<File[]>([]);

  const props: FileInputProps = {
    text: 'HEICファイルをドラッグ',
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
              <IonButton color={'danger'}>Convert</IonButton>
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

              {imgs.map((img, index) => {
                return (
                  <FileCard key={index}
                    fileName={img.name}
                    fileSize={img.size}
                    status={ConvertStatus.NONE}
                    proccess={0.0}
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
