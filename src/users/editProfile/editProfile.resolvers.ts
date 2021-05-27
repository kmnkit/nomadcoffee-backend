import * as fs from "fs";
import * as bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (
  _,
  {
    username,
    email,
    name,
    location,
    password: newPassword,
    avatarUrl: avatarFile,
    githubUsername,
  },
  { loggedInUser, client }
) => {
  let newAvatarUrl = null;
  if (avatarFile) {
    const { filename, createReadStream } = await avatarFile;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    newAvatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      username,
      email,
      name,
      location,
      githubUsername,
      ...(uglyPassword && { password: uglyPassword }),
      ...(newAvatarUrl && { avatarUrl: newAvatarUrl }),
    },
  });
  if (updatedUser.id) {
    return { ok: true };
  } else {
    return { ok: false, error: "could not profile update" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

export default resolvers;
