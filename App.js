import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShoppingLists from "./screens/ShoppingLists";
import { PaperProvider } from "react-native-paper";
import useTheme from "./styles/AppTheme";
import AppDrawer from "./components/AppDrawer";

function App() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <AppDrawer />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
