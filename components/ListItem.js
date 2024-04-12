import { StyleSheet } from "react-native";
import { Card, useTheme, Text, Avatar } from "react-native-paper";
import { View } from "react-native";

const ListItem = ({ item }) => {
  const theme = useTheme();
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
    cardContent: {
      marginTop: -18,
    },
    photoIcon: {
      marginTop: 2,
      marginRight: 7,
    },
  });
  var photo;
  if (item.item.photo != undefined) {
    console.log("found photo");
    console.log(item.item.photo);
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

  return (
    <Card style={styles.itemCard}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.horizontalContainer}>
          <View style={styles.verticalContainer}>
            <Text variant="bodyLarge">{item.item.name}</Text>
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
  );
};

export default ListItem;
