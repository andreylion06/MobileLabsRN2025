import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <Header/>
                <Footer/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
