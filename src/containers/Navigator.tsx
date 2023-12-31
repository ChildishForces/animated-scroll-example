import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { HeaderComponent } from '../components/HeaderComponent';
import { TabBarComponent } from '../components/TabBarComponent';
import { HeaderLayoutProvider } from '../context/HeaderLayoutContext';
import { ChatScreen } from '../screens/Chat';
import { FavouritesScreen } from '../screens/Favourites';
import { HelpScreen } from '../screens/Help';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/Settings';

const Tab = createBottomTabNavigator();

interface TabBarIcon {
  name: string;
  component: React.FC;
  icon: React.ComponentProps<typeof MaterialIcon>['name'];
}

const TABS: TabBarIcon[] = [
  { name: 'Home', component: HomeScreen, icon: 'home' },
  { name: 'Chat', component: ChatScreen, icon: 'chat' },
  { name: 'Favourites', component: FavouritesScreen, icon: 'star' },
  { name: 'Help', component: HelpScreen, icon: 'help' },
  { name: 'Settings', component: SettingsScreen, icon: 'settings' },
];

export const Navigator: React.FC = () => {
  // State
  const [headerHeight, setHeaderHeight] = useState(95);

  // Methods
  const handleLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  return (
    <HeaderLayoutProvider value={headerHeight}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBarComponent {...props} />}>
          {TABS.map(({ icon, ...rest }) => (
            <Tab.Screen
              key={rest.name}
              {...rest}
              options={{
                header: (props) => <HeaderComponent {...props} onLayout={handleLayout} />,
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcon name={icon} color={color} size={size} />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </HeaderLayoutProvider>
  );
};
