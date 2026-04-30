import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(
  filePath: string,
  folder: string,
  publicId?: string
): Promise<string> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `ksd/${folder}`,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return result.secure_url;
}

export function getCloudinaryUrl(
  publicId: string,
  options?: { width?: number; height?: number; quality?: number; format?: string }
): string {
  return cloudinary.url(publicId, {
    width: options?.width,
    height: options?.height,
    quality: options?.quality ? `q_${options.quality}` : undefined,
    fetch_format: options?.format,
    crop: options?.width || options?.height ? "fill" : undefined,
  });
}

export default cloudinary;
