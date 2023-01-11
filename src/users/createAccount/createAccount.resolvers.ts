import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import client from "../../client";

export default {
	Mutation: {
		createAccount: async (
			_,
			{ username, email, name, location, password, githubUsername }
		) => {
			const existingUserCount = await client.user.count({
				where: { OR: [{ username }, { email }] },
			});
			if (existingUserCount > 0) {
				throw new GraphQLError("User already exists");
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const data = {
				username,
				email,
				password: hashedPassword,
				...(name && { name }),
				...(location && { location }),
				...(githubUsername && { githubUsername }),
			};
			client.user.create({ data });
			return {
				ok: true,
			};
		},
	},
};
