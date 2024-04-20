import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

export const usersApi = createApi({
	reducerPath: "users",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://react-rtq-usage-with-jason-server.netlify.app/",
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints(builder) {
		return {
			fetchUsers: builder.query({
				providesTags: ["User"],
				query: () => {
					return {
						url: "/users",
						method: "GET",
					};
				},
			}),
			addUser: builder.mutation({
				invalidatesTags: () => {
					return [{ type: "User" }];
				},
				query: () => {
					return {
						url: "/users",
						method: "POST",
						body: {
							name: faker.person.fullName(),
						},
					};
				},
			}),
			removeUser: builder.mutation({
				invalidatesTags: () => {
					return [{ type: "User" }];
				},
				query: (user) => {
					return {
						url: `/users/${user.id}`,
						method: "DELETE",
					};
				},
			}),
		};
	},
});

export const { useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation } =
	usersApi;
