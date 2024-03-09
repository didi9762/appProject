import { View } from "react-native";
import { useEffect, useState } from "react";
import { alertType } from "../types/types";
import RejectAlert from "./RejectAlert";
import ConfiremAlert from "./ConfiremAlert";
import NoteAlert from "./NoteAlert";

interface props {
  isVisible: alertType | null;
  close: () => void;
}
interface taskAlertInfo {
  taskId: string;
  senderId: string;
  address: string | undefined;
}
interface noteAlertInfo {
type:string;
massage:string;
}

const AlertMain = ({ isVisible, close }: props) => {
  const [closeAlertVisible, setCloseAlertVisible] = useState(false);
  const [closeInfo, setCloseInfo] = useState<taskAlertInfo | null>(null);
  const [rejectAlertVisible, setRejectAlertVisible] = useState(false);
  const [rejectInfo, setRejectInfo] = useState<taskAlertInfo | null>(null);
  const [noteAlertVisible,setNoteAlertVisible] = useState(false)
  const [noteInfo,setNoteInfo]= useState<noteAlertInfo|null>(null)

  useEffect(() => {
    if(isVisible?.type==='note'){
      setNoteInfo({
        type:isVisible.info1,
        massage:isVisible.info2
      })
      setNoteAlertVisible(true)
    }
    if (isVisible?.type === "close") {
      setCloseAlertVisible(true);
      setCloseInfo({
        taskId:'',
        senderId: isVisible.info1,
        address: isVisible.info2,
      });
    } else if (isVisible?.type === "reject") {
      setRejectAlertVisible(true);
      setRejectInfo({
        taskId: '',
        senderId: isVisible.info1,
        address: isVisible.info2,
      });
    }
  }, [isVisible]);



  return (
    <View>
      <NoteAlert
      visible={noteAlertVisible}
      handlePress={()=>{setNoteAlertVisible(false);close()}}
      noteInfo={noteInfo}
      />
      <RejectAlert
        rejectInfo={rejectInfo}
        visible={rejectAlertVisible}
        handlePress={()=>{setRejectAlertVisible(false);close()}}
      />
      <ConfiremAlert
        saveInfo={closeInfo}
        visible={closeAlertVisible}
        handlePress={()=>{setCloseAlertVisible(false);close()}}
      />
    </View>
  );
};

export default AlertMain;
