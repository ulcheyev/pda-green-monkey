import DataManager from "../services/DataManager";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import useDataManager from "../services/DataManager";

const AddItemButton = (props) => {
  const dataManager = useDataManager();
  const theme = useTheme();
  const styles = StyleSheet.create({
    itemCard: {
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.tertiary,
      height: 50,
      marginVertical: 6,
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
      opacity: 1,
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
      elevation: 0,
    },
  });

  const callModal = () => {
    console.log("called modal");
    //console.log(props.shop);
    props.addItem(props.shop);
  };

  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        callModal();
      }}
      style={{ opacity: 1 }}
    >
      <Card style={styles.itemCard} elevation={0}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.horizontalContainer}>
            <View style={styles.verticalContainer}>
              <View style={styles.horizontalContainer}>
                <View style={styles.verticalContainer}>
                  <Text variant="bodyLarge">Add item</Text>
                </View>
              </View>
            </View>
            <View style={styles.verticalContainer}>
              <Text variant="bodyLarge">+</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};
export default AddItemButton;
