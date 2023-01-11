import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import client from "../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ username, email, name, location, password, avatarURL, githubUsername }
		) => {
			const existingUserCount = await client.user.count({
				where: { OR: [{ username }, { email }] },
			});
			if (existingUserCount > 0) {
				return {
					ok: false,
					error: "the user by username or email already exists",
				};
			}
			const uglyPassword = await bcrypt.hash(password, 10);

			client.user.create({
				data: {
					username,
					email,
					name,
					location,
					password: uglyPassword,
					avatarURL,
					githubUsername,
				},
			});
			return {
				ok: true,
			};
		},
	},
};
