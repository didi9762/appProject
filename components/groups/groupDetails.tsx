import axios from "axios";
import React from "react";
import { baseurl } from "../profile/logOperation";
import { View, Text, StyleSheet } from "react-native";

const GroupDetails = ({ groupId }) => {
  async function fetchDetailsFromServer(groupId){
    const response = await axios.get(`${baseurl}groupdetails`,{headers:{
        data:groupId}
    });
    const data = await response.data
    return data;
  };

  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedDetails = await fetchDetailsFromServer(groupId);
      setDetails(fetchedDetails[0]);
      console.log("d:",fetchedDetails);
      
    };

    fetchData();
  }, [groupId]);

  return (
    <View style={styles.detailsContainer}>
      {details ? (
        <>
          <Text style={styles.detailsText}>address: {details.address}</Text>
          <Text style={styles.detailsText}>Name: {details.name}</Text>
          <Text style={styles.detailsText}>Phone: {details.phone}</Text>
          <Text style={styles.detailsText}>Partners:{details.partners}</Text>
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
});

export default GroupDetails;
