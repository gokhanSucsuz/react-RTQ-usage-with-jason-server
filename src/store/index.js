import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apis/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(usersApi.middleware);
	},
});

setupListeners(store.dispatch);

export {
	useAddUserMutation,
	useFetchUsersQuery,
	useRemoveUserMutation,
} from "./apis/usersApi";

// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { usersApi } from "./apis/usersApi";

// export const store = configureStore({
// 	reducer: {
// 		[usersApi.reducerPath]: usersApi.reducer,
// 	},
// 	middleware: (getDefaultMiddleware) => {
// 		return getDefaultMiddleware().concat(usersApi.middleware);
// 	},
// });

// setupListeners(store.dispatch);

// export {
// 	useAddUserMutation,
// 	useFetchUsersQuery,
// 	useRemoveUserMutation,
// } from "./apis/usersApi";
