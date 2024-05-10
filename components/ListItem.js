import { StyleSheet, View } from "react-native";
import { Avatar, Card, Icon, Text, useTheme } from "react-native-paper";
import useDataManager from "../services/DataManager";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

const ListItem = ({ item, setPhoto }) => {
  const theme = useTheme();
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
    console.log(item.item.id);
    dataManager
      .changeItemCheckedLocal(item.item.id, !checked)
      .then(() => setChecked(!checked));
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
