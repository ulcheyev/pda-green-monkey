import { Appbar, useTheme } from "react-native-paper";
import * as React from "react";
import { StyleSheet } from "react-native";
import useUtils from "../utils/Utils";

const Header = ({ navigation, back }) => {
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
    account: {},
  });

  const menuPress = () => {
    navigation.toggleDrawer();
  };

  const accountPress = () => {};

  return (
    <Appbar.Header style={styles.header}>
      {back ? (
        <Appbar.BackAction
          color={theme.colors.tertiary}
          size={21}
          onPress={navigation.goBack}
        />
      ) : (
        <Appbar.Action
          icon="menu"
          color={theme.colors.tertiary}
          onPress={menuPress}
        />
      )}

      <Appbar.Content
        title={utils.getCurrentScreenName(navigation)}
        titleStyle={styles.titleStyle}
      />
      <Appbar.Action
        icon="account"
        style={styles.account}
        size={28}
        color={theme.colors.tertiary}
        onPress={accountPress}
      />
    </Appbar.Header>
  );
};

export default Header;
