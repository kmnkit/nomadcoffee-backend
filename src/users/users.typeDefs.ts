export const typeDefs = `#graphql
    type User {
        id: Int!
        username: String!
        email: String!
        name: String!
        location: String!
        password: String!
        avatarURL: String
        githubUsername: String
    }
    type Query {
        seeProfile(username: String): User
    }
    type Mutation {
        createUser(
            username: String,
            email: String,
            name: String,
            location: String,
            password: String,
            avatarURL: String?,
            githubUsername: String?
        ): User
        
    }
`;
