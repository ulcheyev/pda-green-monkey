import { Switch, Text } from "react-native-paper";
import { View } from "react-native";

const SettingsItem = ({ title }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "red",
        justifyContent: "center",
        margin: 8,
      }}
    >
      <Text>{title}</Text>
      <Switch />
    </View>
  );
};

export default SettingsItem;
