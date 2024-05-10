import {
  Button,
  Card,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Share, StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useState } from "react";
import MonkeyModal from "./MonkeyModal";
import * as React from "react";
import { TouchableRipple } from "react-native-paper";
import useDataManager from "../services/DataManager";

const ModalEditItem = ({ styles, onPress, icon, size, title, color }) => {
  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.editModalItemContainer}>
        <Icon size={size} color={color} source={icon} />
        <Text style={{ ...styles.editModalItemText, color }}>{title}</Text>
      </View>
    </TouchableRipple>
  );
};
const ListCard = (props) => {
  const theme = useTheme();
  const dataManager = useDataManager();
  const [editListModalVisible, setEditListModalVisible] = useState(false);
  const [renameListModalVisible, setRenameListModalVisible] = useState(false);
  const [renamed, setRenamed] = useState("");
  const styles = StyleSheet.create({
    listCardContainer: {
      flex: 1,
      flexDirection: "row",
      margin: 7,
    },
    listCard: {
      width: "100%",
    },

    listCardContent: {
      flex: 1,
      flexDirection: "row",
      paddingRight: 7,
    },

    listCardBackdrop: {
      flex: 1,
      flexDirection: "row",
      paddingRight: 7,
      backgroundColor: "grey",
    },

    listCardLeftItems: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      gap: 13,
    },
    listCardRightItems: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    modalContainer: {
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    modalContentStyle: {
      padding: 15,
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.colors.primary,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    progressValueStyle: { fontWeight: "400", color: "#000000" },
    circularTitle: { fontWeight: "bold", color: "black", fontSize: 18 },
    editModalItemContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginLeft: 5,
      marginBottom: 14,
    },
    editModalItemText: {
      color: theme.colors.tertiary,
      fontSize: 19,
    },
    templateButton: {
      marginBottom: 15,
      backgroundColor: "#85AF9D",
    },
    renameField: {
      marginBottom: 15,
    },
  });
  const hideEditItemModal = () => {
    setEditListModalVisible(false);
  };

  const hideRenameItemModal = () => {
    setRenameListModalVisible(false);
  };

  const editItem = () => {
    setEditListModalVisible(true);
  };

  const handleRenamePress = () => {
    setEditListModalVisible(false);
    setRenameListModalVisible(true);
  };

  const handleRename = () => {
    dataManager.updateListName(props.list, renamed).then((r) => {
      setEditListModalVisible(false);
      setRenameListModalVisible(false);
      props.handleRefresh();
    });
  };

  const handleDelete = () => {
    dataManager.deleteList(props.list).then((r) => {
      setEditListModalVisible(false);
      setRenameListModalVisible(false);
      props.handleRefresh();
    });
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Green Monkey | An app for shopping lists",
        title: "Wow, did you see this?",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("Shared with activity type:", result.activityType);
        } else {
          // shared
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error while sharing:", error.message);
    }
  };

  const onCardPress = () => {
    props.navigation.navigate("ShoppingList", {
      title: props.list.name,
      list: props.list,
      navigation: props.navigation,
    });
  };

  return (
    <View style={styles.listCardContainer}>
      <Card style={styles.listCard} onPress={onCardPress}>
        <Card.Content
          style={
            props.list?.archived
              ? styles.listCardBackdrop
              : styles.listCardContent
          }
        >
          <View style={styles.listCardLeftItems}>
            <CircularProgress
              value={props.progress.value}
              radius={42}
              activeStrokeColor={
                props.progress.value === props.progress.overall
                  ? "green"
                  : "#8590C8"
              }
              inActiveStrokeColor={"#C2CAF2"}
              progressValueStyle={styles.progressValueStyle}
              maxValue={props.progress.overall}
              valueSuffix={`/${props.progress.overall}`}
            />
            <Text variant="titleLarge">{props.list.name}</Text>
          </View>
          <View style={styles.listCardRightItems}>
            <IconButton
              style={{ margin: 0 }}
              icon="dots-vertical"
              size={25}
              onPress={editItem}
            />
          </View>
        </Card.Content>
      </Card>
      <MonkeyModal
        visible={editListModalVisible}
        hideModal={hideEditItemModal}
        modalContentStyle={styles.modalContentStyle}
        modalContainerStyle={styles.modalContainer}
        title={"Edit a list"}
      >
        <ModalEditItem
          color={theme.colors.tertiary}
          styles={{
            editModalItemContainer: styles.editModalItemContainer,
            editModalItemText: styles.editModalItemText,
          }}
          onPress={handleRenamePress}
          icon={"pencil-box-outline"}
          title={"Rename"}
          size={27}
        />
        <ModalEditItem
          color={theme.colors.tertiary}
          styles={{
            editModalItemContainer: styles.editModalItemContainer,
            editModalItemText: styles.editModalItemText,
          }}
          icon={"export-variant"}
          onPress={handleShare}
          title={"Share"}
          size={27}
        />
        <ModalEditItem
          color={theme.colors.tertiary}
          styles={{
            editModalItemContainer: styles.editModalItemContainer,
            editModalItemText: styles.editModalItemText,
          }}
          icon={"folder"}
          title={"Save as template"}
          size={27}
        />
        <ModalEditItem
          color={theme.colors.tertiary}
          styles={{
            editModalItemContainer: styles.editModalItemContainer,
            editModalItemText: styles.editModalItemText,
          }}
          icon={"checkbox-outline"}
          title={"Uncheck all items"}
          size={27}
        />
        <ModalEditItem
          color={"red"}
          styles={{
            editModalItemContainer: styles.editModalItemContainer,
            editModalItemText: styles.editModalItemText,
          }}
          icon={"delete"}
          title={"Delete"}
          onPress={handleDelete}
          size={27}
        />
      </MonkeyModal>
      <MonkeyModal
        visible={renameListModalVisible}
        hideModal={hideRenameItemModal}
        modalContentStyle={styles.modalContentStyle}
        modalContainerStyle={styles.modalContainer}
        title={"Rename a list"}
      >
        <View>
          <TextInput
            label="List name"
            style={styles.renameField}
            onChangeText={(text) => setRenamed(text)}
          />
        </View>
        <Button
          onPress={handleRename}
          mode="contained"
          style={styles.templateButton}
          labelStyle={{ color: theme.colors.tertiary }}
        >
          Save
        </Button>
      </MonkeyModal>
    </View>
  );
};

export default ListCard;
