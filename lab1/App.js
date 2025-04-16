import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1}}>
                <Header/>
                <AppNavigator />
                <Footer/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
