import {Image, View, FlatList, StyleSheet } from "react-native";


const images = {
    image1: require('../assets/photo1.png'),
    image2: require('../assets/photo2.png'),
    image3: require('../assets/photo3.png'),
};

const data = [
    { id: '1', imageKey: 'image1' },
    { id: '2', imageKey: 'image2' },
    { id: '3', imageKey: 'image3' },
    { id: '4', imageKey: 'image1' },
    { id: '5', imageKey: 'image1' },
    { id: '6', imageKey: 'image3' },
    { id: '7', imageKey: 'image1' },
    { id: '8', imageKey: 'image2' },
    { id: '9', imageKey: 'image3' },
    { id: '10', imageKey: 'image1' },
];

const ImageGrid = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Image source={images[item.imageKey]} style={styles.image} />
                </View>
            )}
        />
    );
};

const PhotoGalleryScreen = () => (
    <View style={styles.content}>
        <View><ImageGrid /></View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 5,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 7,
    },
});

export default PhotoGalleryScreen;