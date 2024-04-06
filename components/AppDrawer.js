import * as React from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ShoppingLists from "../screens/ShoppingLists";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Header from "./Header";

const screens = [
  { name: "Lists", label: "Lists", icon: "basket", component: ShoppingLists },
  {
    name: "Notifications",
    label: "Notifications",
    icon: "tooltip",
    component: ShoppingLists,
  },
  {
    name: "Settings",
    label: "Settings",
    icon: "cog",
    component: ShoppingLists,
  },
  {
    name: "Help",
    label: "Help",
    icon: "help-circle",
    component: ShoppingLists,
  },
  {
    name: "Statistics",
    label: "Statistics",
    icon: "poll",
    component: ShoppingLists,
  },
];

const CustomDrawerContent = (props) => {
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
        <View style={styles.itemsContainer}>
          {screens.map((screen, index) => (
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
          ))}
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
        header: (props) => <Header {...props} />,
        drawerStyle: styles.drawer,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
