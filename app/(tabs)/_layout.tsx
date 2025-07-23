import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { icons } from '@constants/icons';

export default function _Layout() {
  const insets = useSafeAreaInsets();

  const tabBarIcon = (icon: any) => ({ color }: { color: string }) => (
    <Image source={icon} style={{ tintColor: color, width: 24, height: 24 }} />
  );

  const tabBarStyle = {
    backgroundColor: '#ffffff',
    paddingBottom: insets.bottom + 12,
    paddingTop: 8,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 60 + insets.bottom,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle,
        headerShown: false,
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: tabBarIcon(icons.home),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: tabBarIcon(icons.search),
        }}
      />
    </Tabs>
  );
}
