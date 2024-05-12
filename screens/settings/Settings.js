import { StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import SettingsItem from "../../components/SettingsItem";

const settings = [{ title: "Notification" }, { title: "Notification2" }];

const Settings = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    settingsContainer: {
      flex: 1,
      flexDirection: "column",
    },
  });

  return (
    <View style={styles.settingsContainer}>
      {settings.map((screen) => {
        return <SettingsItem title={screen.title} />;
      })}
    </View>
  );
};

export default Settings;
