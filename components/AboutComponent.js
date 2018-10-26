import React, {Component} from 'react';
import  {Text, View} from 'react-native';
import {Card} from 'react-native-elements';
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
            history : HISTORY
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render () {
        const historyId =  this.props.navigation.getParam('historyId', '');
        return(<History history={this.state.history[+historyId]}/>);
    }
}

export default AboutUs;