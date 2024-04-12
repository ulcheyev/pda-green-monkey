import { Card, Text, useTheme, Icon } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const NotificationCard = ({ notification, navigation }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    notificationCardContainer: {
      flex: 1,
      flexDirection: "row",
      margin: 8,
    },
    notificationCard: {
      width: "100%",
      backgroundColor: theme.colors.secondary,
    },
    notificationContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "stretch",
      paddingRight: 15,
      justifyContent: "center",
      verticalAlign: "center",
    },
    newIcon: {
      alignContent: "center",
      verticalAlign: "auto",
      marginTop: 8,
    },
  });

  const navToNofitication = () => {
    console.log(notification);
    navigation.navigate("NotificationDetailed", { notification: notification });
  };

  return (
    <View style={styles.notificationCardContainer}>
      <Card
        style={styles.notificationCard}
        elevation={0}
        onPress={navToNofitication}
      >
        <Card.Content>
          <View style={styles.notificationContainer}>
            <Text variant="titleLarge" width="100%">
              {notification.name}
            </Text>
            {notification.isNew ? (
              <View style={styles.newIcon}>
                <Icon source="alert-circle"></Icon>
              </View>
            ) : null}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default NotificationCard;
