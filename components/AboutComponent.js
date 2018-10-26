import React, {Component} from 'react';
import  {Text, View, FlatList, ScrollView} from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import {LEADERS} from '../shared/leaders';
import {HISTORY} from '../shared/history';

function History(props) {

    const history = props.history;
    
        if (history != null) {
            return(
                <Card title = "Our History">
                    <Text style={{margin : 10}}>{history.info}</Text>
                    <Text style={{margin : 10}}>{history.moreInfo}</Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class AboutUs extends Component {

    constructor(props){
        super(props);
        this.state = {
            history : HISTORY,
            leader : LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render () {
        const historyId =  this.props.navigation.getParam('historyId', '');
        const renderMenuItem = ({item,index}) => {
            return (
                <View>
                    <ListItem 
                        style={{borderBottomWidth: 0}}
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{source : require('./images/alberto.png')}}
                    />
                </View>
            )
        };

        const {navigate} = this.props.navigation;

        return (

                <ScrollView>
                    <History history={this.state.history[+historyId]}/>
                    <Card style={{borderColor: 'white'}}
                        title = "Our Leadership">
                        <FlatList data = {this.state.leader}
                        renderItem = {renderMenuItem}
                        keyExtractor={item => item.id.toString()} />
                    </Card>
                </ScrollView>
           
        );
    }
}

const styles = {
    container : {
        borderBottomWidth:0
    }
}

export default AboutUs;