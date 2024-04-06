import { Card, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const ListCard = ({ title }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    listCardContainer: {
      flex: 1,
      flexDirection: "row",
      margin: 8,
    },
    listCard: {
      width: "100%",
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
  });

  return (
    <View style={styles.listCardContainer}>
      <Card style={styles.listCard}>
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ListCard;
