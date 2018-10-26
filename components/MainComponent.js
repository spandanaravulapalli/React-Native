import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements'; 
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

const MenuNavigator = createStackNavigator({
    Menu : {screen: Menu},
    Dish : {screen : DishDetail},
    },
    {
        initialRouteName:'Menu',
        navigationOptions:{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, 
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

const ContactNavigator = createStackNavigator({
    Contact : {screen : Contact},
    },
    {
        initialRouteName:'Contact',
        navigationOptions:{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerMode: 'none',
            headerTintColor:'#fff',
            headerTitleStyle:{
                color: '#fff'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },

    AboutUs: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us'
        }
      },
      
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }
      },

    ContactUs: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: '',
          drawerLabel: 'Contact Us'
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

class Main extends Component {
  
    render() {
        return (
            <View style = {{flex : 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator /> 
            </View>
        );
    }
 }

export default Main;