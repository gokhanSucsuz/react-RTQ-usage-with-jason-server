import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

export const photosApi = createApi({
	reducerPath: "photos",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://react-rtq-usage-with-jason-server.netlify.app/",
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints(builder) {
		return {
			fetchPhotos: builder.query({
				providesTags: (result, error, album) => {
					const tags = result.map((photo) => {
						return { type: "Photo", id: photo.id };
					});
					tags.push({ type: "PhotoAlbums", id: album.id });
					return tags;
				},
				query: (album) => {
					return {
						url: "/photos",
						method: "GET",
						params: {
							albumId: album.id,
						},
					};
				},
			}),
			addPhoto: builder.mutation({
				invalidatesTags: (result, error, album) => {
					return [
						{
							type: "PhotoAlbums",
							id: album.id,
						},
					];
				},
				query: (album) => {
					return {
						url: "/photos",
						method: "POST",
						body: {
							albumId: album.id,
							url: faker.image.urlPicsumPhotos({ width: 150, height: 150 }),
						},
					};
				},
			}),
			removePhoto: builder.mutation({
				invalidatesTags: (result, error, photo) => {
					return [
						{
							type: "Photo",
							id: photo.id,
						},
					];
				},
				query: (photo) => {
					return {
						url: `/photos/${photo.id}`,
						method: "DELETE",
					};
				},
			}),
		};
	},
});

export const {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation,
} = photosApi;
