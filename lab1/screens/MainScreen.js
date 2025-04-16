import {Text, View, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

const newsData = [
    { id: '1', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '2', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '3', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '4', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '5', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '6', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '7', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '8', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '9', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
    { id: '10', title: 'Заголовок новини', date: 'Дата новини', shortText: 'Короткий текст новини' },
];

const NewsItem = ({ title, date, shortText }) => (
    <View style={styles.newsItem}>
        <Image source={require("../assets/image-holder.png")} style={styles.newsImage} />
        <View style={styles.newsTextContainer}>
            <Text style={styles.newsTitle}>{title}</Text>
            <Text style={styles.newsDate}>{date}</Text>
            <Text style={styles.newsShortText}>{shortText}</Text>
        </View>
    </View>
);

const NewsList = () => {
    return (
        <View>
            <FlatList
                data={newsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NewsItem {...item} />}
            />
        </View>
    );
};

const MainScreen = () => (
        <View style={styles.content}>
            <Text style={styles.title}>Новини</Text>
            <NewsList />
        </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        paddingBottom: 45,
    },
    title: {
        fontSize: 24,
        color: "black",
        textAlign: 'center',
        marginVertical: 8,
    },
    newsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    newsImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    newsTextContainer: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: 500,
    },
    newsDate: {
        fontSize: 12,
        color: 'gray',
    },
    newsShortText: {
        fontSize: 14,
        color: '#333',
    },
});


export default MainScreen;