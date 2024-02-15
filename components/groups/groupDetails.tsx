import axios from "axios";
import React from "react";
import { baseurl, updateUserInfo, userDetails } from "../profile/logOperation";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { User } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GroupDetails = ({ groupId, flag, reload }) => {
  const [userD, setUserD] = useAtom(userDetails);
  const [details, setDetails] = React.useState(null);

  async function fetchDetailsFromServer(groupId: string) {
    const response = await axios.get(`${baseurl}groupdetails`, {
      headers: {
        data: groupId,
      },
    });
    const data = await response.data;

    return data;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedDetails = await fetchDetailsFromServer(groupId);
      setDetails(fetchedDetails);
    };

    fetchData();
  }, [userD]);

  async function handlePress() {
    const url = !flag ? `${baseurl}leavegroup` : `${baseurl}cancelrequest`;
    try {
      const response = await axios.delete(url, {
        params: { userId: userD.userName, groupId: groupId },
      });
      console.log(response.status);

      if (flag) {
        const updateRequests = userD.requests.filter(
          (r) => r.userId !== groupId
        );
        setUserD({ ...userD, requests: updateRequests });
      } else {
        const updateGroups =  userD.group.filter((g) => g !== groupId) 
        setUserD({ ...userD, group:updateGroups});
       await AsyncStorage.setItem('groups',updateGroups.toString())
       
      }
      reload();
    } catch (e) {
      console.log("error try leaving group:", e);
    }
  }

  return (
    <View style={styles.detailsContainer}>
      {details ? (
        <>
          <Text style={styles.detailsText}>address: {details.address}</Text>
          <Text style={styles.detailsText}>Name: {details.name}</Text>
          <Text style={styles.detailsText}>Phone: {details.phone}</Text>
          <Text style={styles.detailsText}>Partners:{details.partners}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={{ textAlign: "center", color: "white" }}>
              {!flag ? "Leave Group" : "Cancel request"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: "30%",
    backgroundColor: "#2b292954",
    elevation: 10,
    borderRadius: 5,
  },
});

export default GroupDetails;
