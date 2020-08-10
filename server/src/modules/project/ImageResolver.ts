import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../../types/Upload";
import { Image } from "../../entity/Image";
import { createWriteStream } from "fs";
import shortid from "shortid";

const baseImageURL = `${__dirname}/../../../images`;

@Resolver()
export class ImageResolver {
  @Mutation(() => Image, { nullable: true })
  async createImage(
    @Arg("image", () => GraphQLUpload)
    { createReadStream, mimetype }: Upload
  ): Promise<Image | null> {
    const thumbnailId = shortid.generate();
    console.log(mimetype);
    const fileType = mimetype.split("/");
    if (fileType[0] !== "image") return null;
    const generatedFilename = `${thumbnailId}.${fileType[1]}`;
    const thumbnailUrl = `${baseImageURL}/${generatedFilename}`;

    return await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(thumbnailUrl))
        .on("finish", async () => {
          const staticImageUrl = `${process.env.BASE_URL}/images/${generatedFilename}`;
          const newImage = await Image.create({
            url: staticImageUrl,
            filename: generatedFilename,
          });
          await newImage.save();
          resolve(newImage);
        })
        .on("error", () => {
          reject(null);
        })
    );
  }

  @Query(() => Image, { nullable: true })
  async fetchImage(@Arg("id") id: string): Promise<Image | null> {
    const image = await Image.findOne(id);
    if (image) {
      return image;
    }
    return null;
  }
}
