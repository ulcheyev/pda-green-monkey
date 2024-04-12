import DataManager from "../../services/DataManager";
import NotificationCard from "../../components/NotificationCard";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationDetailed from "./NotificationDetailed";
import Header from "../../components/Header";

const Notifications = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={"NotificationCard"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen
        name={"Notifications"}
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
  const dataManager = new DataManager();
  const [notifications, setNotifications] = useState(
    dataManager.getTestNotifications(),
  );

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
        data={notifications}
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
