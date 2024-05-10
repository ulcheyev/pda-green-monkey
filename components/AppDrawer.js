import * as React from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ShoppingLists from "../screens/shopping-lists/ShoppingLists";
import Notifications from "../screens/notifications/Notifications";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import HelpPage from "../screens/help/HelpPage";
import useUtils from "../utils/Utils";
import useDataManager from "../services/DataManager";
import StatisticsPage from "../screens/statistics/Statistics";

const screens = [
  {
    name: "ShoppingLists",
    label: "Lists",
    icon: "basket",
    component: ShoppingLists,
    show: true,
  },
  {
    name: "Notifications",
    label: "Notifications",
    icon: "tooltip",
    component: Notifications,
    show: true,
  },
  {
    name: "Settings",
    label: "Settings",
    icon: "cog",
    component: ShoppingLists,
    show: true,
  },
  {
    name: "Help",
    label: "Help",
    icon: "help-circle",
    component: HelpPage,
    show: true,
  },
  {
    name: "Statistics",
    label: "Statistics",
    icon: "poll",
    component: StatisticsPage,
    show: true,
  },
];

const CustomDrawerContent = (props) => {
  const dataManager = useDataManager();
  const theme = useTheme();
  const styles = StyleSheet.create({
    allItemsContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginTop: 50,
    },
    titleContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 20,
      marginLeft: 16,
    },
    drawerItem: {},
    activeBackgroundColor: theme.colors.secondary,
    labelStyle: {
      color: "black",
    },
    itemsContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginTop: 20,
    },
  });
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.allItemsContainer}>
        <View style={styles.titleContainer}>
          <Icon size={45} source="baby-face" />
          <Text variant="headlineMedium">Green Monkey</Text>
        </View>
        <Text style={{ textAlign: "center" }} variant="bodyMedium">
          Hello {dataManager.getCurrentUser()?.displayName}!
        </Text>
        <View style={styles.itemsContainer}>
          {screens.map(
            (screen, index) =>
              screen.show && (
                <DrawerItem
                  key={index}
                  label={screen.label}
                  focused={props.state.index === index}
                  icon={({ focused, color, size }) => (
                    <Icon size={size} source={screen.icon} />
                  )}
                  onPress={() => {
                    props.navigation.navigate(screen.name);
                  }}
                  labelStyle={styles.labelStyle}
                  activeBackgroundColor={styles.activeBackgroundColor}
                  style={styles.drawerItem}
                />
              ),
          )}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();
  const theme = useTheme();
  const styles = StyleSheet.create({
    drawer: {
      backgroundColor: theme.colors.tertiary,
      flex: 1,
      flexDirection: "column",
    },
  });
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="ShoppingLists"
    >
      {screens.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
