import { SET_NOTIFY_LIST } from '../../actions/notifyActions/notifyActions';

interface NotifyState {
  key: string;
  message: string;
}
interface State {
  notifyList: NotifyState[];
}
const initialState: State = {
  notifyList: []
}; // Initial state
const notifyListReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SET_NOTIFY_LIST:
      return {
        ...state,
        notifyList: [
          ...state.notifyList,
          {
            key: action.payload.key,
            message: action.payload.message
          }
        ]
      };
    default:
      return state;
  }
};
export default notifyListReducer;
