import React, {Component} from 'react';
import {View, Platform, Image, StyleSheet, ScrollView, Text} from 'react-native';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements'; 
import DishDetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import Contact from './ContactComponent';
import AboutUs from './AboutComponent';
import {createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import {fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
    Menu : {screen: Menu,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon name = 'menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}/>
            })},
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
      headerTintColor: "#fff",
      headerLeft: <Icon name = 'menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}/>
    })
});

const ContactNavigator = createStackNavigator({
    Contact : {screen : Contact},
    },
    {
        initialRouteName:'Contact',
        navigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerMode: 'none',
            headerTintColor:'#fff',
            headerTitleStyle:{
                color: '#fff'
            },
            headerLeft: <Icon name = 'menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}/>
        })
    }
);

const AboutUsNavigator = createStackNavigator({
    AboutUs : {screen : AboutUs},
    },
    {
        initialRouteName:'AboutUs',
        navigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerMode: 'none',
            headerTintColor:'#fff',
            headerTitleStyle:{
                color: '#fff'
            },
            headerLeft: <Icon name = 'menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}/>
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation : {screen : Reservation},
    },
    {
        initialRouteName:'Reservation',
        navigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerMode: 'none',
            headerTintColor:'#fff',
            headerTitleStyle:{
                color: '#fff'
            },
            headerLeft: <Icon name = 'menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}/>
        })
    }
);


const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style = {styles.container}
                    forceInset={{top: 'always', horizontal: 'never'}}>
            <View style = {styles.drawerHeader}>
                <View style={{flex :1 }}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage}/>
                </View>
                <View style={{flex : 2}}>
                    <Text style = {styles.drawerHeaderText}>Ristorante Confusion</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
);


const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({tintColor}) => (
              <Icon name='home'
                    type= 'font-awesome'
                    size={24}
                    color={tintColor}/>
          )
        }
      },

    AboutUs: 
      { screen: AboutUsNavigator,
        navigationOptions: {
          title: 'About Us',
          drawerLabel: 'About Us',
          drawerIcon: ({tintColor}) => (
            <Icon name='info-circle'
                  type= 'font-awesome'
                  size={24}
                  color={tintColor}/>
        )
        }
      },
      
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({tintColor}) => (
            <Icon name='list'
                  type= 'font-awesome'
                  size={24}
                  color={tintColor}/>
        )
        }
      },

    ContactUs: 
      { screen: ContactNavigator,
        navigationOptions: {
          title: '',
          drawerLabel: 'Contact Us',
          drawerIcon: ({tintColor}) => (
            <Icon name='address-card'
                  type= 'font-awesome'
                  size={22}
                  color={tintColor}/>
        )
        }, 
      },

      Reservation: 
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({tintColor}) => (
            <Icon name='cutlery'
                  type= 'font-awesome'
                  size={24}
                  color={tintColor}/>
        )
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
  
    render() {
        return (
            <View style = {{flex : 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator /> 
            </View>
        );
    }
 }


const styles = StyleSheet.create({

    container : {
        flex : 1
    },
    drawerHeader:{
        backgroundColor:'#512DA8',
        height : 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex : 1,
        flexDirection: 'row'
    },

    drawerHeaderText : {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },

    drawerImage : {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);