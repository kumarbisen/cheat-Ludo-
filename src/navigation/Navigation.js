import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LudoboardScreen from '../screens/LudoboardScreen';
import SplashScreen from "../screens/SplashScreen"
import { navigationRef } from '../helpers/NavigationUtil'

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef}  >
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" options={{ animation: 'fade_from_bottom' }} component={HomeScreen} />
                <Stack.Screen name="LudoboardScreen" options={{ animation: 'fade_from_bottom' }} component={LudoboardScreen} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;