import { StyleSheet, View } from "react-native";
import { Avatar, Card, Icon, Text, useTheme } from "react-native-paper";
import useDataManager from "../services/DataManager";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { useSettings } from "../services/SettingsContext";
import useUtils from "../utils/Utils";

const ListItem = ({ item, setPhoto, shopName, itemDelete, updateProgress }) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const utils = useUtils();
  const [checked, setChecked] = React.useState(item.item.checked);
  const dataManager = useDataManager();
  const styles = StyleSheet.create({
    itemCard: {
      borderRadius: 5,
      borderColor: "#446E5C",
      borderWidth: 1,
      backgroundColor: theme.colors.tertiary,
      height: 50,
      marginVertical: 6,
      elevation: 0,
    },
    horizontalContainer: {
      //marginTop: -5,

      flex: 1,
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
    },
    verticalContainer: {
      height: 50,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
    verticalContainerLeft: {
      height: 50,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: -8,
    },
    cardContent: {
      marginTop: -18,
    },
    photoIcon: {
      marginTop: 3,
      marginRight: 7,
    },
  });

  const itemOnPress = () => {
    utils.checkAuth().then((user) => {
      let isChecked = !checked;
      if (user) {
        const currItem = item.item;
        currItem.checked = isChecked;
        dataManager.updateItem(currItem).then((r) => {
          setChecked(isChecked);
          updateProgress();
        });
      } else {
        dataManager.changeItemCheckedLocal(item.item.id, isChecked).then(() => {
          setChecked(isChecked);
          updateProgress();
        });
        if (isChecked) {
          dataManager.incrementPurchasePrice(shopName, item.item.price);
        }
      }
    });
  };

  var photo;
  if (item.item.photo != undefined && item.item.photo != "") {
    photo = (
      <TouchableOpacity onPress={() => setPhoto(item.item.photo)}>
        <Avatar.Image
          source={{ uri: item.item.photo }}
          size={45}
          style={styles.photoIcon}
        />
      </TouchableOpacity>
    );
  } else {
    photo = <></>;
  }

  const getItemRightSideText = () => {
    return `${item.item.quantity} ${item.item.measure} ${
      settings.autoPrice ? `- ${item.item.quantity * item.item.price}$` : ""
    }`;
  };

  return (
    <TouchableOpacity
      onPress={(e) => {
        itemOnPress();
      }}
      onLongPress={(e) => {
        itemDelete(item.item.id, item.item.name, item.item.checked);
      }}
    >
      <Card style={styles.itemCard}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.horizontalContainer}>
            <View style={styles.verticalContainer}>
              <View style={styles.horizontalContainer}>
                <View style={styles.verticalContainerLeft} marginRight={5}>
                  <Icon
                    source={
                      checked
                        ? "checkbox-marked-circle"
                        : "checkbox-blank-circle"
                    }
                    size={30}
                    style={styles.checkIcon}
                  ></Icon>
                </View>
                <View style={styles.verticalContainer}>
                  <Text variant="bodyLarge">{item.item.name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.verticalContainer}>
              <View style={styles.horizontalContainer}>
                {photo}
                <View style={styles.verticalContainer}>
                  <Text>{getItemRightSideText()}</Text>
                </View>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default ListItem;
