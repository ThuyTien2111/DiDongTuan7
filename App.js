import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/Home';
import Add from './Screen/Add';
import Update from './Screen/Update';
const Stack = createStackNavigator();
export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={
                    { headerShown: false }}
            /> 
            <Stack.Screen name='Add' component={Add} options={
                    {title:"Thêm note"}}
            />
            <Stack.Screen name='Update' component={Update} options={
                    {title:"Sửa note"}}
            />
             
        </Stack.Navigator>
    </NavigationContainer>
    );
}