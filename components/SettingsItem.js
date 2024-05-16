import { Switch, Text } from "react-native-paper";
import { View } from "react-native";

const SettingsItem = ({ containerStyles, title, name, onPress, enabled }) => {
  return (
    <View style={containerStyles}>
      <Text style={{ fontSize: 16, flexGrow: 1, marginLeft: 5 }}>{title}</Text>
      <Switch value={enabled} onValueChange={() => onPress(name, !enabled)} />
    </View>
  );
};

export default SettingsItem;
