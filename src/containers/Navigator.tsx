import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import { TabBarComponent } from '../components/TabBarComponent';
import { useScrollContext } from '../context/ScrollContext';
import { ChatScreen } from '../screens/Chat';
import { FavouritesScreen } from '../screens/Favourites';
import { HelpScreen } from '../screens/Help';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings';

const Tab = createBottomTabNavigator();

export const Navigator: React.FC = () => {
  const scrollValue = useScrollContext();

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBarComponent {...props} scrollValue={scrollValue} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialIcon name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialIcon name="chat" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialIcon name="star" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Help"
          component={HelpScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MaterialIcon name="help" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcon name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
