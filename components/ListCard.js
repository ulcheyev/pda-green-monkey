import { Card, Icon, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const ListCard = (props) => {
  const theme = useTheme();
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
    progressValueStyle: { fontWeight: "400", color: "#000000" },
    circularTitle: { fontWeight: "bold", color: "black", fontSize: 18 },
  });

  return (
    <View style={styles.listCardContainer}>
      <Card style={styles.listCard}>
        <Card.Content style={styles.listCardContent}>
          <View style={styles.listCardLeftItems}>
            <CircularProgress
              value={props.progress.value}
              radius={42}
              activeStrokeColor={"#8590C8"}
              inActiveStrokeColor={"#C2CAF2"}
              progressValueStyle={styles.progressValueStyle}
              maxValue={props.progress.overall}
              valueSuffix={`/${props.progress.overall}`}
            />
            <Text variant="titleLarge">{props.title}</Text>
          </View>
          <View style={styles.listCardRightItems}>
            <Icon size={25} source={"dots-vertical"} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ListCard;
