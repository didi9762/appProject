import * as react from "react";
import {
  Alert,
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
import { userDetails, baseurlAtom } from "../profile/logOperation";
import { useNavigation } from "@react-navigation/native";
import GroupDetails from "./groupDetails";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import GroupOptions from "./groupsOptions";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserInfo } from "../profile/updateUserInfo";

export default function GroupsPage() {
  const [userD, setUserD] = useAtom(userDetails);
  const [groups, setGroups] = react.useState([]);
  const [isOpen, setIsOpen] = react.useState("");
  const [menuOpen, setMenuOpen] = react.useState(false);
  const [update, setUpdate] = react.useState(null);
  const [reload, setReload] = react.useState(false);
  const [refreshing, setRefreshing] = react.useState(false);
  const [baseurl] = useAtom(baseurlAtom);
  const navigation = useNavigation();

  react.useEffect(() => {
    async function getUpdates() {
      const prevGroups = await AsyncStorage.getItem("group");
      if (prevGroups && userD.group.length !== prevGroups.split(",").length) {
        setUpdate(
          userD.group?.filter((g) => {
            return !prevGroups.split(",").includes(g);
          })
        );
        await AsyncStorage.setItem("group", userD.group?.toString());
      } else if (!prevGroups) {
        await AsyncStorage.setItem("group", userD.group?.toString());
      }
    }
    if (!userD) {
      navigation.navigate("LogIn" as never);
      return;
    } else {
      getUpdates();
      navigation.setOptions({
        headerRight: () => <GroupMenuButton />,
      });
      setGroups(userD.group);
    }
  
  }, []);


  

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
  async function handleRefresh() {
    setRefreshing(true);
    const userInfo = await updateUserInfo(baseurl)
    setUserD({...userD,group:userInfo.group});
    setRefreshing(false);
  }

  return (
    <View>
      <RefreshControl
        style={{ height: "100%" }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      >
        {menuOpen && <GroupOptions isOpen={menuOpen} onClose={toggleMenu} />}
        {groups?.length === 0 ? (
          <Text style={{ textAlign: "center" }}>
            {userD ? "you arent in any group currently" : "Please log in first"}
          </Text>
        ) : (
          <SectionList
            style={{ height: "100%" }}
            sections={[
              {
                title: "internal",
                data: groups.filter((group) => group),
              },
            ]}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  isOpen === item ? setIsOpen("") : setIsOpen(item);
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
                {update && update.includes(item) ? (
                  <View style={styles.newIcon}>
                    <Text style={styles.iconText}>New</Text>
                  </View>
                ) : null}
                {isOpen === item ? (
                  <GroupDetails
                    groupId={item}
                    flag={false}
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
        )}
      </RefreshControl>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
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
  itemText: {
    padding: 10,
    fontSize: 18,
    height: 44,
    display: "flex",
  },
  newIcon: {
    height: "40%",
    width: "12%",
    backgroundColor: "green",
    position: "absolute",
    right: "7%",
    top: "50%",
    borderRadius: 15,
  },
  iconText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
  },
});
