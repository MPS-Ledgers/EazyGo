import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Profile from '../pages/Profile';
import {NavigationContainer} from '@react-navigation/native';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import colors from '../assets/theme.colors';

const {Navigator: TabNavigator, Screen: TabScreen} =
  createMaterialBottomTabNavigator();
const PagesNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <TabNavigator barStyle={{backgroundColor: colors.PRIMARY}}>
          <TabScreen name="Home" component={Home}/>
          <TabScreen name="Rental" component={About}/>
          <TabScreen name="More" component={Profile}/>
        </TabNavigator>
      </NavigationContainer>
    </>
  );
};
export default PagesNavigator;