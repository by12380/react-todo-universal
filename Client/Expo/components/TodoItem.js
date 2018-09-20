import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { updateItem } from '../actions/todoActions';


class TodoItem extends React.Component {

    onCheckmarkClick = () => {
        this.props.item.completed = !this.props.item.completed;
        this.props.updateItem(this.props.token, this.props.item);
    }

    renderCheckmark = (item) => {
        let name;
    
        if (Platform.OS === 'ios' && item.completed)
        {
            name = 'ios-checkmark-circle'
        }
        else if (Platform.OS === 'ios' && !item.completed)
        {
            name = 'ios-checkmark-circle-outline';
        }
        else if (Platform.OS !== 'ios' && item.completed)
        {
            name = 'md-checkmark-circle';
        }
        else if (Platform.OS !== 'ios' && !item.completed)
        {
            name = 'md-checkmark-circle-outline';
        }
    
        return (
            <Ionicons
                name={name}
                size={30}
                color="#1b75d6" />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onCheckmarkClick} style={styles.checkmarkContainer}>
                    {this.renderCheckmark(this.props.item)}
                </TouchableOpacity>
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>{this.props.item.title}</Text>
                </View>
                <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={() => this.props.navigation.navigate('Edit', {item: this.props.item})}>
                    <Ionicons name="ios-arrow-dropright" size={28} />
                </TouchableOpacity>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    checkmarkContainer: {
        flex:1/6
    },
    titleContainer: {
        flexDirection: 'row', flex: 5/6
    },
    title: {
        fontSize: 16
    },
    arrowContainer: {
        flexDirection: 'row',
        flex: 1/6,
        justifyContent: 'flex-end'
    }
});

const mapStateToProps = (state) => {

    return {
        token: state.authReducer.sessionItems.accessToken,
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        updateItem
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);