export const typeDefs = `#graphql
    type User {
        username: String!
        email: String!
        password: String!
        name: String
        location: String
        avatarURL: String
        githubUsername: String
    }
    type Query {
        seeProfile(username: String): User
    }
    type Mutation {
        createUser(
            username: String!
            email: String!
            password: String!
            name: String
            location: String
            avatarURL: String
            githubUsername: String
        ): User
        
    }
`;
