import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LudoBoardScreen from '../screens/LudoBoardScreen';
import SplashScreen from "../screens/SplashScreen"
import { navigationRef } from '../helpers/NavigationUtil'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef}  >
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" options={{ animation: 'fade_from_bottom' }} component={HomeScreen} />
                <Stack.Screen name="LudoBoardScreen" options={{ animation: 'fade_from_bottom' }} component={LudoBoardScreen} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;