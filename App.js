import { StatusBar } from 'expo-status-bar';
import {Avatar, Button, Card, MD3LightTheme, PaperProvider, Text} from 'react-native-paper';
import {View, StyleSheet} from "react-native";
import ListCard from "./components/ListCard";
const theme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#663399',
        secondary: '#f1c40f',
        tertiary: '#a1b2c3',
    },
};
export default function App() {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
      return (
          <PaperProvider theme={theme}>
             <ListCard></ListCard>
          </PaperProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
