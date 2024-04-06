import { Appbar, useTheme } from "react-native-paper";
import * as React from "react";
import { StyleSheet } from "react-native";
import useUtils from "../utils/Utils";

const Header = ({ navigation }) => {
  const utils = useUtils();
  const theme = useTheme();
  const styles = StyleSheet.create({
    header: {
      color: theme.colors.tertiary,
      backgroundColor: theme.colors.primary,
    },
    titleStyle: {
      color: theme.colors.tertiary,
      fontSize: 20,
    },
  });

  const menuPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action
        icon="menu"
        color={theme.colors.tertiary}
        onPress={menuPress}
      />
      <Appbar.Content
        title={utils.getCurrentScreenName(navigation)}
        titleStyle={styles.titleStyle}
      />
    </Appbar.Header>
  );
};

export default Header;
