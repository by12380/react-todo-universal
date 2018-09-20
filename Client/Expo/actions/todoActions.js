import { APP_SERVER_URL } from '../config';

export const getItemsPending = () => {
    return {
        type: 'GET_ITEMS_PENDING'
    }
}

export const getItemsSuccess = (items) => {
    return {
        type: 'GET_ITEMS_SUCCESS',
        items
    }
}

export const getItemsError = () => {
    return {
        type: 'GET_ITEMS_ERROR'
    }
}

export const addItemPending = () => {
    return {
        type: 'ADD_ITEM_PENDING'
    }
}

export const addItemSuccess = (item) => {
    return {
        type: 'ADD_ITEM_SUCCESS',
        item
    }
}

export const addItemError = () => {
    return {
        type: 'ADD_ITEM_ERROR'
    }
}

export const updateItemPending = () => {
    return {
        type: 'UPDATE_ITEM_PENDING'
    }
}

export const updateItemSuccess = (item) => {
    return {
        type: 'UPDATE_ITEM_SUCCESS',
        item
    }
}

export const updateItemError = () => {
    return {
        type: 'UPDATE_ITEM_ERROR'
    }
}

export const deleteItemPending = () => {
    return {
        type: 'DELETE_ITEM_PENDING'
    }
}

export const deleteItemSuccess = (item) => {
    return {
        type: 'DELETE_ITEM_SUCCESS',
        item
    }
}

export const deleteItemError = () => {
    return {
        type: 'DELETE_ITEM_ERROR'
    }
}

export const addItem = (accessToken, item) => (dispatch) => {

    dispatch(addItemPending());

    fetch(`${APP_SERVER_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            title: item.title
        }),
    })
    .then(res => {
        if (res.status !== 201)
            throw `failed to add todo item with status ${res.status}`;
        return res.json();
    })
    .then(result => {
        dispatch(addItemSuccess(result));
    })
    .catch(error => {
        console.error(error);
        dispatch(addItemError());
    })

}

export const getItems = (accessToken) => (dispatch) => {

    dispatch(getItemsPending());

    fetch(`${APP_SERVER_URL}/todos`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to get todo items with status ${res.status}`;
        return res.json();
    })
    .then(result => {
        dispatch(getItemsSuccess(result));
    })
    .catch(error => {
        console.error(error);
        dispatch(getItemsError());
    })

}

export const updateItem = (accessToken, item) => (dispatch) => {

    dispatch(updateItemPending());

    fetch(`${APP_SERVER_URL}/todos/${item._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to update todo item with status ${res.status}`;
        return res.json();
    })
    .then(result => {
        dispatch(updateItemSuccess(result));
    })
    .catch(error => {
        console.error(error);
        dispatch(updateItemError());
    })

}

export const deleteItem = (accessToken, item) => (dispatch) => {

    dispatch(deleteItemPending());

    fetch(`${APP_SERVER_URL}/todos/${item._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to delete todo item with status ${res.status}`;
        dispatch(deleteItemSuccess(item));
    })
    .catch(error => {
        console.error(error);
        dispatch(deleteItemError());
    })

}