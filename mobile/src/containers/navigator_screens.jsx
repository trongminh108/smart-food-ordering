import { createStackNavigator } from '@react-navigation/stack';
import AgentScreen from '../screens/agent_screen';
import HomeScreen from '../screens/home_screen';
import { AgentName, HomeName } from '../constants/screen_names';

const AgentStack = createStackNavigator();
const HomeStack = createStackNavigator();

export const AgentNavigator = () => {
    return (
        <AgentStack.Navigator>
            <AgentStack.Screen name={AgentName} component={AgentScreen} />
        </AgentStack.Navigator>
    );
};

export const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name={HomeName} component={HomeScreen} />
        </HomeStack.Navigator>
    );
};
