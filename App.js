import { StatusBar } from "expo-status-bar";
import {
  Avatar,
  Button,
  Card,
  MD3LightTheme,
  PaperProvider,
  Text,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import ListCard from "./components/ListCard";
import ShoppingList from "./screens/ShoppingList";

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#663399",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

const styles = StyleSheet.create({});

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <ShoppingList></ShoppingList>
    </PaperProvider>
  );
};

export default App;
