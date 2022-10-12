import { IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import FileInput, { FileInputProps } from '../components/FileInput/FileInput';
import './Home.css';



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
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid class='center'>
          <IonRow>
            <FileInput text={props.text} handler={props.handler} />
          </IonRow>
        </IonGrid>

        <IonGrid class='center'>
          <IonRow style={{ width: '100%' }}>
            <IonList style={{ width: '100%' }}>
              {imgs.map((img, index) => {
                return (
                  <IonItem key={index}>
                    <IonLabel slot='start'>{img.name}</IonLabel>
                    <IonProgressBar value={0.24}></IonProgressBar>
                  </IonItem>
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
