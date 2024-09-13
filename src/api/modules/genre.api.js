import publicClient from "../client/public.client";

// Endpoint
const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`
};

// API endpoint to interact with genre endpoint
const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(genreEndpoints.list({ mediaType }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default genreApi;