import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import useTheme from "./styles/AppTheme";
import AppDrawer from "./components/AppDrawer";
import ChangesProvider from "./services/ChangesProvider";

function App() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <ChangesProvider>
          <AppDrawer />
        </ChangesProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
