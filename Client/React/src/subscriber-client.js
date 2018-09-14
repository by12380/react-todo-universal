import { store } from './index';
import { connectSuccess } from './actions/socketActions';
import { getItems } from './actions/todoActions';


export const initSubscriber = (socket) => {
    socket.on('connect', () => {
        store.dispatch(connectSuccess());
    });

    socket.on('subscribe', function(subscription){
        switch (subscription.type) {
            //Dispatch actions based on subscription type

            case 'UPDATE_TODOS':
                const token = store.getState().authReducer.sessionItems.accessToken;
                store.dispatch(getItems(token));
                break;
        }
    })
}