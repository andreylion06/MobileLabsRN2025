import {View, Text, StyleSheet, Image} from "react-native";

const Header = () => (
    <View style={styles.header}>
        <Image source={require('../assets/university-logo.png')} style={styles.image}/>

        <View style={styles.spacer} />

        <Text style={styles.title}>FirstMobileApp</Text>
    </View>
);

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 130,
        resizeMode: 'contain'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    spacer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Header;