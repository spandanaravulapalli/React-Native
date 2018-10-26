import React, {Component} from 'react';
import  {Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import { CONTACTS } from '../shared/contact';


class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            contact : CONTACTS
        }
    }

    render () {
        const renderMenuItem = ({item,index}) => {
            return (
                <Card title = "Contact Information"
                    key = {index}
                    featuredTitle = {item.name}
                    featuredSubtitle = {item.designation}>
                    <Text style={{margin : 10}}>{item.address}</Text>
                    <Text style={{margin : 10}}>{item.street}</Text>
                    <Text style={{margin : 10}}>{item.city}</Text>
                    <Text style={{margin : 10}}>{item.telephone}</Text>
                    <Text style={{margin : 10}}>{item.fax}</Text>
                    <Text style={{margin : 10}}>{item.email}</Text>
                </Card>
            )
        };

        const {navigate} = this.props.navigation;

        return (
            <FlatList data = {this.state.contact}
            renderItem = {renderMenuItem} />
        );
    }
}

export default Contact;