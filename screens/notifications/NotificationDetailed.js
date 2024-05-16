import { Card, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const NotificationDetailed = (props) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    notificationContainer: {
      padding: 20,
      flex: 1,
      alignItems: "flex-start",
      backgroundColor: theme.colors.tertiary,
    },
    detailedText: {
      marginTop: 20,
      backgroundColor: theme.colors.secondary,
      minHeight: 300,
      width: "100%",
    },
  });

  notification = props.route.params.notification;
  //console.log(notification.route.params.notification)
  return (
    <View style={styles.notificationContainer}>
      <Text variant="headlineLarge">{notification.header}</Text>
      <Card style={styles.detailedText}>
        <Card.Content>
          <Text variant="bodyLarge">{notification.text}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};
export default NotificationDetailed;
