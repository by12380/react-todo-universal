const initialState = {
    items: []
}

const todoReducer = (state = initialState, action) => {
    
    switch (action.type) {
    
    case 'ADD_ITEM_PENDING':
        return {
            ...state,
            addPending: true,
            addSuccess: false,
            addError: false
        }

    case 'ADD_ITEM_SUCCESS':
        return {
            ...state,
            addPending: false,
            addSuccess: true,
            addError: false,
            items: [...state.items, action.item]
        }

    case 'ADD_ITEM_PENDING':
        return {
            ...state,
            addPending: false,
            addSuccess: false,
            addError: true,
        }

    case 'GET_ITEMS_PENDING':
        return {
            ...state,
            getPending: true,
            getSuccess: false,
            getError: false
        }

    case 'GET_ITEMS_SUCCESS':
        return {
            ...state,
            getPending: false,
            getSuccess: true,
            getError: false,
            items: action.items
        }

    case 'GET_ITEMS_PENDING':
        return {
            ...state,
            getPending: false,
            getSuccess: false,
            getError: true,
        }

    case 'UPDATE_ITEM_PENDING':
        return {
            ...state,
            updatePending: true,
            updateSuccess: false,
            updateError: false
        }

    case 'UPDATE_ITEM_SUCCESS':
        return {
            ...state,
            updatePending: false,
            updateSuccess: true,
            updateError: false,
            items: state.items.map(item => {
                return item._id === action.item._id ? action.item : item;
            })
        }

    case 'UPDATE_ITEM_PENDING':
        return {
            ...state,
            updatePending: false,
            updateSuccess: false,
            updateError: true,
        }

    case 'DELETE_ITEM_PENDING':
        return {
            ...state,
            deletePending: true,
            deleteSuccess: false,
            deleteError: false
        }

    case 'DELETE_ITEM_SUCCESS':
        return {
            ...state,
            deletePending: false,
            deleteSuccess: true,
            deleteError: false,
            items: state.items.filter(item => item._id !== action.item._id)
        }

    case 'DELETE_ITEM_PENDING':
        return {
            ...state,
            deletePending: false,
            deleteSuccess: false,
            deleteError: true,
        }
    
    default:
        return state;

    }
}

export default todoReducer;