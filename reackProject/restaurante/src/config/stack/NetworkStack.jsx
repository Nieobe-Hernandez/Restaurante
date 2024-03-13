import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Networks from '../../modules/network/adapters/screens/Networks';

const Stack = createStackNavigator();

export default function NetworkStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Networks"
            component={Networks}
            options={{ title: 'Network' }}
        />
    </Stack.Navigator>
  )
}