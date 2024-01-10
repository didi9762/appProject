import * as react from "react";
import { View, Text, SectionList, StyleSheet, Pressable } from "react-native";
import { useAtom } from "jotai";
import { userDetails } from "../profile/logOperation";
import { useNavigation } from "@react-navigation/native";
import GroupDetails from "./groupDetails";
import { User } from "../types/types";

export default function GroupsPage() {
  const [userD]= useAtom(userDetails);
  const [groups, setGroups] = react.useState([]);
  const [isOpen,setIsOpen] = react.useState('')
  const navigation:any = useNavigation();
  react.useEffect(() => {
    console.log('D:',userD);
    
    if (!userD.name) {
      navigation.navigate("LogIn");
    }
    if (userD.listGroups) {
      setGroups(userD.listGroups);    
    }
  }, []);



  return (
    <View>
      {groups.length === 0 ? (
        <Text>you arent in any group currently</Text>
      ) : (
        <SectionList
          sections={[
            {
              title: "long distance",
              data: groups.filter((group) => group.type === "long distance"),
            },
            {
              title: "internal",
              data: groups.filter((group) => group.type === "internal"),
            },
          ]}
          renderItem={({ item }) => (
            <Pressable onPress={()=>{isOpen===item.groupId?setIsOpen(''):setIsOpen(item.groupId)}}>
            <Text style={styles.item}>{item.name}</Text>
            {isOpen===item.groupId?<GroupDetails groupId={item.groupId}/>:null}
            </Pressable> 
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item) => `basicListEntry-${item.groupId}`}
        />
      )}
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
