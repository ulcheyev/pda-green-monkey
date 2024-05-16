import DataManager from "../../services/DataManager";
import NotificationCard from "../../components/NotificationCard";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationDetailed from "./NotificationDetailed";
import Header from "../../components/Header";
import useDataManager from "../../services/DataManager";

const Notifications = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"All notifications"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen
        name={"All notifications"}
        component={NotificationCardsContent}
      />
      <Stack.Screen
        name={"NotificationDetailed"}
        component={NotificationDetailed}
      />
    </Stack.Navigator>
  );
};

const NotificationCardsContent = (props) => {
  const dataManager = useDataManager();
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    dataManager.getNotificaitonsLocal().then((res) => {
      setNotificationsData(res);
    });
  }, []);

  const theme = useTheme();

  const styles = StyleSheet.create({
    notificationContainer: {
      paddingTop: 20,
      flex: 1,
      alignItems: "flex-start",
      backgroundColor: theme.colors.tertiary,
    },
  });

  return (
    <View style={styles.notificationContainer}>
      <FlatList
        alwaysBounceVertical={false}
        data={notificationsData}
        renderItem={(notification) => {
          return (
            <NotificationCard
              notification={notification.item}
              navigation={props.navigation}
            />
          );
        }}
      ></FlatList>
    </View>
  );
};
export default Notifications;
