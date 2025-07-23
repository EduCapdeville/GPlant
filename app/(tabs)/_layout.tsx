import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { icons } from '@constants/icons';

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 70,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarActiveTintColor: '#16a34a', // verde
        tabBarInactiveTintColor: '#9ca3af', // cinza claro
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={icons.home}
              style={{
                tintColor: color,
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={icons.search}
              style={{
                tintColor: color,
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
