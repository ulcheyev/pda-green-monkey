import * as React from "react";
import { useState } from "react";
import { IconButton, Text, useTheme } from "react-native-paper";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const MonkeyModal = (props) => {
  const [text, setText] = useState("");
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      ...(props.modalContainerStyle ?? {}),
    },

    modalContent: {
      backgroundColor: "#fff",
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },

    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    header: {
      alignItems: "center",
      marginBottom: 10,

      flexDirection: "row",
      justifyContent: "space-between",
    },

    title: {
      ...(props.titleStyle ?? {
        fontSize: 20,
        textAlign: "center",
        color: theme.colors.tertiary,
        flex: 2,
      }),
    },
    closeIconStyle: {
      tintColor: theme.colors.tertiary,
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    leftSideHeaderItems: {
      flex: 1,
    },
  });

  const closeModal = () => {
    props.hideModal();
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType={"fade"}
        visible={props.visible}
        onRequestClose={closeModal}
        statusBarTranslucent={true}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.modalContainer}
          >
            <View style={props.modalContentStyle ?? styles.modalContent}>
              <View style={props.headerStyle ?? styles.header}>
                <View style={styles.leftSideHeaderItems}>
                  {props.leftSideHeaderItems}
                </View>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.closeIconStyle}>
                  <IconButton
                    iconColor={theme.colors.tertiary}
                    size={25}
                    icon={"close"}
                    onPress={closeModal}
                  />
                </View>
              </View>
              {props.children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default MonkeyModal;
