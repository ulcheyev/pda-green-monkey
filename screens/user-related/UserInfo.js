import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import useDataManager from "../../services/DataManager";
import { useRef } from "react";
import { useChanges } from "../../services/ChangesProvider";

const UserInfo = (props) => {
  const theme = useTheme();
  const dataManager = useDataManager();
  const userRef = useRef(dataManager.getCurrentUser());
  const changesProvider = useChanges();
  const styles = StyleSheet.create({
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      margin: 20,
      gap: 30,
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "center",
    },
  });
  const handleLogOut = () => {
    dataManager.logout(props.navigation);
    changesProvider.setLists([]);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text variant="bodyMedium">
          Username: {userRef.current.displayName}
        </Text>
        <Text variant="bodyMedium">Email: {userRef.current.email}</Text>
      </View>
      <Button mode="contained" onPress={handleLogOut}>
        Log out
      </Button>
    </View>
  );
};

export default UserInfo;
