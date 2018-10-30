import React, {Component} from 'react';
import  {Text, View, FlatList, ScrollView} from 'react-native';
import { Card, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {HISTORY} from '../shared/history';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

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
            history : HISTORY
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
                        leftAvatar={{source : {uri: baseUrl + item.image}}}
                    />
                </View>
            )
        };

        const {navigate} = this.props.navigation;

        if(this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History/>
                    <Card title = 'Corporate LEadership'>
                        <Loading/>
                    </Card>
                </ScrollView>
            );
        } else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                        <History/>
                        <Card title = 'Corporate Leadership'>
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card>
                    </ScrollView>
            );
        } else {
            return (
                <ScrollView>
                    <History history={this.state.history[+historyId]}/>
                    <Card style={{borderColor: 'white'}}
                        title = "Our Leadership">
                        <FlatList data = {this.props.leaders.leaders}
                        renderItem = {renderMenuItem}
                        keyExtractor={item => item.id.toString()} />
                    </Card>
                </ScrollView>
            );
        }
    }
}

const styles = {
    container : {
        borderBottomWidth:0
    }
}

export default connect(mapStateToProps)(AboutUs);