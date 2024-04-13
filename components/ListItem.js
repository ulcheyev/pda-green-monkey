import { StyleSheet } from "react-native";
import { Card, useTheme, Text, Avatar, Icon } from "react-native-paper";
import { View } from "react-native";
import DataManager from "../services/DataManager";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

const ListItem = ({ item }) => {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(item.item.checked);
  const dataManager = new DataManager();
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
    dataManager.changeTestNotificationCheckedById(item.item.id);

    setChecked(!checked);
    if (!checked) {
      console.log(`DIsabling ${item.item.id}`);
    } else {
      console.log(`Enabling ${item.item.id}`);
    }
  };

  var photo;
  if (item.item.photo != undefined) {
    photo = (
      <Avatar.Image
        source={{ uri: item.item.photo }}
        size={45}
        style={styles.photoIcon}
      />
    );
  } else {
    photo = <></>;
  }

  console.log(item.item);

  return (
    <TouchableOpacity
      onPress={(e) => {
        itemOnPress();
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
                  <Text>{`${item.item.quantity} ${item.item.measure}`}</Text>
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
