import * as react from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Linking,
  Share,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useAtom } from "jotai";
import { userDetails ,baseurlAtom} from "../profile/logOperation";
import { useNavigation } from "@react-navigation/native";
import GroupDetails from "./groupDetails";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import GroupOptions from "./groupsOptions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserInfo } from "../profile/updateUserInfo";

export default function GroupsRequests() {
  const [userD,setUserD] = useAtom(userDetails);
  const [groups, setGroups] = react.useState([]);
  const [isOpen, setIsOpen] = react.useState("");
  const [menuOpen, setMenuOpen] = react.useState(false);
  const [reload, setReload] = react.useState(false);
  const [refresh,setRefresh] = react.useState(false)
  const [baseurl] = useAtom(baseurlAtom)
  const navigation = useNavigation();
  react.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <GroupMenuButton />,
    });
    if (!userD) {
      navigation.navigate("LogIn" as never);
    }
    if (userD.requests) {
      setGroups(userD.requests);
    }
  }, [reload,userD]);

  

  const GroupMenuButton = () => {
    return (
      <TouchableOpacity
        onPress={toggleMenu}
        style={{ marginRight: 10, marginTop: 10 }}
      >
        <SimpleLineIcons
          name="options-vertical"
          size={23}
          color={"black"}
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
    );
  };
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function dateDifference(date: Date) {
    const currentDate = new Date();
    const storedDate = new Date(date);

    if (
      storedDate.getDate() === currentDate.getDate() &&
      storedDate.getDay() === currentDate.getDay() &&
      storedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return `Request sent today`;
    } else {
      const differenceInTime = currentDate.getTime() - storedDate.getTime();
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 3600 * 24)
      );
      return `Request sent ${differenceInDays + 1} days ego`;
    }
  }
  async function handleRefresh(){
setRefresh(true)
const userInfo = await updateUserInfo(baseurl)
setUserD({...userD,requests:userInfo.requests})
setRefresh(false)
  }

  return (
    <View style={styles.container} >
      
      <RefreshControl style={{height:'100%'}} refreshing={refresh} onRefresh={handleRefresh}>
      {menuOpen && <GroupOptions  isOpen={menuOpen} onClose={toggleMenu} />}
      {groups.length === 0 ? (
       
        <Text>no requests are waiting right now</Text>
      ) : (
        <SectionList
        style={{height:'100%'}}
          sections={[
            {
              title: "requests sent to:",
              data: groups,
            },
          ]}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                isOpen === item.userId ? setIsOpen("") : setIsOpen(item.userId);
              }}
              style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
            >
              <Text style={styles.item}>{item.userId}</Text>
              <Text style={styles.item}>{dateDifference(item.time)}</Text>

              {isOpen === item.userId ? (
                <GroupDetails
                  groupId={item.userId}
                  flag={true}
                  reload={() => setReload(!reload)}
                />
              ) : null}
            </Pressable>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item) => `basicListEntry-${item}`}
        />
      )}</RefreshControl>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: "100%",
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
