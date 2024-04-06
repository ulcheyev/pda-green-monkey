import { Avatar, Button, Card, PaperProvider, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const ListCard = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">ALBERTOSLAV</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListCard;
