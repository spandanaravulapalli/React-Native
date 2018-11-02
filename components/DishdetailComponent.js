import React , {Component} from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, TextInput, TouchableHighlight, Dimensions } from 'react-native';
import { Card, Rating, Button, Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
        
    }
}

const mapDisptachToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))   
});

const toggleModal = (props) => {
    console.log("Modal Bool : " + props.showModal);
    this.setState({showModal: !props.showModal})
}

const handleComment = (props) => {
    console.log(JSON.stringify(props.state));
    toggleModal(props);
}

function resetForm(props){
    this.setState({
        rating:'0/5',
        author: '',
        comment: ''
    })
}


function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri : baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon 
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#F50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress= {() => handleComment(props)}
                    />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props){

    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating} Stars</Text>
                <Text style={{fontSize:12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return (
        <Card title = "Comments">
            <FlatList data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}/>
        </Card>
    );
}

function RenderModalComment(props){

    return (
        <Modal animationType = {'slide'}
                transparent={false}
                visible={props.showModal}
                onRequestClose={() => {toggleModal(props); resetForm(props)}}>
            <View style = {styles.modal}>
            <Rating showRating
                    type="star"
                    startingValue={5}
                    fractions={1}
                    imageSize={40}
                    onFinishRating={this.ratingCompleted}
                    onStartRating={this.ratingStarted}
                    style={{ paddingVertical: 10 , alignItems: 'center'}}
                    />

                <View style = {styles.modalInput}>
                    <Icon reverse name="user" type = 'font-awesome' size={10} color="#000"/>
                    <TextInput name = 'user'
                            type='font-awesome'
                            placeholder='Author'
                            style = {styles.formComment}></TextInput>
                </View>
                <View style = {styles.modalInput}>
                    <Icon reverse name="comment" type = 'font-awesome' size={10} color="#000"/>
                    <TextInput name = 'comment'
                        type='font-awesome'
                        placeholder='Comment'
                        style = {styles.formComment}></TextInput>
                </View>
          </View>
            <View>
                <TouchableHighlight onPress = {() => {props.toggleModal(); props.resetForm()}}
                        color = 'white'
                        style= {styles.modalSubmit}>
                        <Text style = {{color :'white'}}>Submit</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress = {() => {props.toggleModal(); props.resetForm()}}
                        color = 'white'
                        style = {styles.modalCancel}>
                        <Text style = {{color :'white'}}>Cancel</Text>
                </TouchableHighlight>
            </View>
        </Modal>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render () {
        console.log('inside dish detail');
        const dishId =  this.props.navigation.getParam("dishId", '');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                <RenderModalComment/>
            </ScrollView>
        );
    } 
}


const styles = StyleSheet.create({

    modalInput: {
        flexDirection: 'row',
    },

    modal : {
  
        margin: 20,
        flexDirection: 'column'
    },
    modalSubmit  :{
        padding : 10,
        fontSize : 24,
        fontWeight: 'bold',
        textAlign:'center',
        color: 'white',
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
        backgroundColor: '#512DA8',
        marginTop:15
    },

    modalCancel  :{
        padding : 10,
        fontSize : 24,
        fontWeight: 'bold',
        textAlign:'center',
        color: 'white',
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        alignItems: 'center',
        backgroundColor: 'grey'
    },

    modalText : {
        fontSize: 18,
        margin: 20,
    },

    formComment : {
        alignSelf: 'stretch',
        paddingTop : 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
    }
})

export default connect(mapStateToProps, mapDisptachToProps)(DishDetail);