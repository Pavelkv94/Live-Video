
const initialState = {};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case "SET-APP-STATUS":
            return { ...state, status: action.status };

        default:
            return state;
    }
}
