import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { Button, StyleSheet, Text, View } from "react-native";
import ShoppingLists from "../screens/ShoppingLists";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Header from "./Header";
import useUtils from "../utils/Utils";

const CustomDrawerContent = (props) => {
  const utils = useUtils();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
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
    },
    drawerLabelStyle: {
      color: "black",
    },
  });
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
        drawerStyle: styles.drawer,
        drawerActiveBackgroundColor: theme.colors.secondary,
        drawerLabelStyle: styles.drawerLabelStyle,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Lists" component={ShoppingLists} />
      <Drawer.Screen name="Next" component={ShoppingLists} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
