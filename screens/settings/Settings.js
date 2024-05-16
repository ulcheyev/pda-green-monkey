import { ScrollView, StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import SettingsItem from "../../components/SettingsItem";
import { useSharedValue } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import { useSettings } from "../../services/SettingsContext";

const settingsGroup = [
  {
    title: "General",
    settings: [
      { title: "Notification", name: "notification" },
      { title: "Keep the screen turned on", name: "keepScreenOn" },
    ],
  },
  {
    title: "Lists",
    settings: [
      { title: "Automatically multiply price x quantity", name: "autoPrice" },
      { title: "Swipe left to delete list", name: "swipeToDelete" },
    ],
  },
];

const SettingsPage = () => {
  const settings = useSettings();
  const theme = useTheme();
  const styles = StyleSheet.create({
    settingsContainer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.tertiary,
    },
    settingGroupContainer: {
      marginTop: 30,
      flex: 1,
      flexDirection: "column",
    },
    settingsCategoryTitle: {
      marginLeft: 5,
      fontSize: 18,
      fontWeight: "bold",
    },
    settingContainerStyles: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      maxHeight: 55,
      marginTop: 7,
      marginLeft: 15,
      borderRadius: 5,
      backgroundColor: theme.colors.secondary,
      marginRight: 7,
      marginBottom: 7,
    },
  });

  const [settingsConfig, setSettingsConfig] = useState();
  const handleSwitchPress = (name, enabled) => {
    const newValues = {
      ...settingsConfig,
      [name]: enabled,
    };
    settings.saveSettings(newValues).then(() => {
      setSettingsConfig(newValues);
    });
  };

  useEffect(() => {
    settings.loadSettings().then((res) => {
      setSettingsConfig(res);
    });
  }, []);

  return (
    <ScrollView style={styles.settingsContainer}>
      {settingsGroup.map((group) => {
        const mappedSettings = group.settings.map((setting, index) => {
          return (
            <SettingsItem
              containerStyles={styles.settingContainerStyles}
              name={setting.name}
              enabled={settingsConfig?.[setting?.name]}
              onPress={handleSwitchPress}
              key={index}
              title={setting.title}
            />
          );
        });
        return (
          <View key={group.title} style={styles.settingGroupContainer}>
            <Text style={styles.settingsCategoryTitle}>{group.title}</Text>
            {mappedSettings}
          </View>
        );
      })}
    </ScrollView>
  );
};

const Settings = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Settings"}
      screenOptions={{
        header: (headerProps) => <Header {...headerProps} />,
      }}
    >
      <Stack.Screen name={"Settings content"} component={SettingsPage} />
    </Stack.Navigator>
  );
};

export default Settings;
