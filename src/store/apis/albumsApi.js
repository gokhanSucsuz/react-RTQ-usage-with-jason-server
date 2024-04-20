import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

export const albumsApi = createApi({
	reducerPath: "albums",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints(builder) {
		return {
			fetchAlbums: builder.query({
				query: (user) => {
					return {
						url: "/albums",
						method: "GET",
						params: {
							userId: user.id,
						},
					};
				},
			}),
			addAlbum: builder.mutation({
				query: (user) => {
					return {
						url: "/albums",
						method: "POST",
						body: {
							userId: user.id,
							title: faker.commerce.productName(),
						},
					};
				},
			}),
			removeAlbum: builder.mutation({
				query: (album) => {
					return {
						url: `/albums/${album.id}`,
						method: "DELETE",
					};
				},
			}),
		};
	},
});

export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} = albumsApi;
