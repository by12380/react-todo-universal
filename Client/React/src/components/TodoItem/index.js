import TodoItem from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateItem, deleteItem } from '../../actions/todoActions';

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.sessionItems.accessToken,
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        updateItem,
        deleteItem
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);