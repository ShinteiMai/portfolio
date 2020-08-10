import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { Image } from "../../entity/Image";
import { createWriteStream, unlink, stat } from "fs";
import * as path from "path";
import shortid from "shortid";
import { getConnection } from "typeorm";
import { Stream } from "stream";

const baseImageURL = path.join(__dirname, "/../../../images");

export const createImage = async (
  fileType: string,
  createReadStream: () => Stream
): Promise<{
  staticImageUrl: string;
  generatedFilename: string;
} | null> => {
  const thumbnailId = shortid.generate();
  const generatedFilename = `${thumbnailId}.${fileType}`;
  const thumbnailUrl = `${baseImageURL}/${generatedFilename}`;

  return await new Promise(async (resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(thumbnailUrl))
      .on("finish", async () => {
        const staticImageUrl = `${process.env.BASE_URL}/images/${generatedFilename}`;
        resolve({
          staticImageUrl,
          generatedFilename,
        });
      })
      .on("error", () => {
        reject(null);
      })
  );
};

export const deleteImage = async (
  imagePath: string
): Promise<Boolean | null> => {
  await stat(imagePath, async (err) => {
    if (err) {
      console.error(err);
      return null;
    }

    return await unlink(imagePath, async (err) => {
      if (err) {
        console.error(err);
        return null;
      }
      return true;
    });
  });
  return true;
};

@Resolver()
export class ImageResolver {
  @Mutation(() => Image, { nullable: true })
  async createImage(
    @Arg("image", () => GraphQLUpload)
    { createReadStream, mimetype }: Upload
  ): Promise<Image | null> {
    const fileType = mimetype.split("/");
    if (fileType[0] !== "image") return null;

    const image = await createImage(fileType[1], createReadStream);
    if (!image) return null;

    const newImage = await Image.create({
      url: image.staticImageUrl,
      filename: image.generatedFilename,
    });
    await newImage.save();

    return newImage;
  }

  @Mutation(() => Image, { nullable: true })
  async deleteImage(@Arg("id") id: string): Promise<Image | null> {
    const image = await Image.findOne(id);
    if (image) {
      const response = await deleteImage(`${baseImageURL}/${image.filename}`);
      if (!response) {
        return null;
      }
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Image)
        .where("id = :id", { id })
        .execute();
      return image;
    }
    return null;
  }

  @Mutation(() => Image, { nullable: true })
  async updateImage(
    @Arg("id") id: string,
    @Arg("image", () => GraphQLUpload)
    { createReadStream, mimetype }: Upload
  ): Promise<Image | null> {
    const image = await Image.findOne(id);
    if (image) {
      const fileType = mimetype.split("/");
      if (fileType[0] !== "image") return null;

      const response = await deleteImage(`${baseImageURL}/${image.filename}`);
      if (!response) return null;

      const newImage = await createImage(fileType[1], createReadStream);
      if (!newImage) return null;

      image.url = newImage.staticImageUrl;
      image.filename = newImage.generatedFilename;

      await image.save();
      return image;
    }
    return null;
  }

  @Query(() => Image, { nullable: true })
  async fetchImage(@Arg("id") id: string): Promise<Image | null> {
    const image = await Image.findOne(id);
    if (image) {
      return image;
    }
    return null;
  }

  @Query(() => [Image], { nullable: true })
  async fetchImages(): Promise<Image[] | null> {
    const images = await Image.find();
    if (images) return images;
    return null;
  }
}
