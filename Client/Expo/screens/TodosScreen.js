import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import TodoItem from '../components/TodoItem';
import { getItems, addItem, updateItem } from '../actions/todoActions';

class TodosScreen extends React.Component {

    static navigationOptions = {
        title: 'Todos',
    };

    constructor(props){
        super(props)

        this.state = {
            input: ''
        }
    }

    componentDidMount() {
        this.props.getItems(this.props.token)
    }

    _keyExtractor(item, index) {
        return item._id;
    }

    onAdd = () => {
        if (this.state.input) {
            this.props.addItem(this.props.token, {title: this.state.input});
            this.setState({input: ''});
        }
    }

    renderItem = ({item}) => {
        return <TodoItem item={item} navigation={this.props.navigation}/>
    }

    render() {
        return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={64}>

            <FlatList
            style={styles.root}
            data={this.props.items}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}/>

            <View style={styles.footer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Type something here...'}
                    value={this.state.input}
                    onChangeText={(input) => this.setState({input})} />
                <TouchableOpacity onPress={this.onAdd} >
                    <Ionicons name="ios-add-circle-outline" size={30} color="white" style={{marginLeft: 10}}/>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
        )
    }
}

let styles = StyleSheet.create({
    root: {
        backgroundColor: 'white'
    },
    footer: {
        flexDirection: 'row',
        minHeight: 60,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        flex:1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    }
});

const mapStateToProps = (state) => {

    return {
        token: state.authReducer.sessionItems.accessToken,
        items: state.todoReducer.items
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        getItems,
        addItem,
        updateItem
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(TodosScreen);