import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

export const usersApi = createApi({
	reducerPath: "users",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints(builder) {
		return {
			fetchUsers: builder.query({
				query: () => {
					return {
						url: "/users",
						method: "GET",
					};
				},
			}),
			addUser: builder.mutation({
				query: () => {
					return {
						url: "/users",
						method: "POST",
						body: {
							name: "Gökhan",
						},
					};
				},
			}),
			removeUser: builder.mutation({
				query: (user) => {
					return {
						url: `/user/${user.id}`,
						method: "DELETE",
					};
				},
			}),
		};
	},
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
	usersApi;
