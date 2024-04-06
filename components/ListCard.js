import { Avatar, Button, Card, PaperProvider, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

const ListCard = ({ title }) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{title}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ListCard;
