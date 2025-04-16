import {Text, View, StyleSheet} from "react-native";

const userInfo = "Прізвище ім'я по-батькові, група";

const Footer = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>{userInfo}</Text>
    </View>
);

const styles = StyleSheet.create({
  footer: {
    height: 20,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default Footer;