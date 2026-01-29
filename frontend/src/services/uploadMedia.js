import S3 from "react-aws-s3";
import { v4 as uuidv4 } from 'uuid';

const S3_ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY
const S3_SECRET_KEY = process.env.REACT_APP_S3_SECRET_KEY
const S3_REGION = process.env.REACT_APP_S3_REGION
const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME
const S3_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/`
const BASE_IMG_URL = `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/`

const config = {
    bucketName: S3_BUCKET_NAME,
    dirName: "CHAT",
    region: S3_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    s3Url: S3_URL
}

const ReactS3Client = new S3(config);

export async function uploadMedia(file) {
    const id = uuidv4();
    const name = `${id}_${file.name}`
    const picUrl = BASE_IMG_URL + "CHAT/" + name
    const response = await ReactS3Client.uploadFile(file, name)
    return picUrl
}

export async function deleteMedia(filename) {
    const response = await ReactS3Client.deleteFile(filename)
}