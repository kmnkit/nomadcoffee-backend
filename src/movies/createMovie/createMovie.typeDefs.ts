import { gql } from "apollo-server-core";

export default gql`
    type CreateMovieResult {
        ok: Boolean!
        error: String
    }
    type Mutation{
        createMovie{
            title: String!
            year: Number!
            genre: String
        }: CreateMovieResult!
    }
`;
