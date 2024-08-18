import AWS from 'aws-sdk';

const S3_BUCKET = "livecare-image";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: 'ap-southeast-2',
});

export function saveImgAws(file, name) {
  // const bufferedImage = await file.arrayBuffer();
  const fileName = file.name || `${name}/${file.split('/').pop()}`;
  const uploadImg = s3.putObject({
    Bucket: S3_BUCKET + `/${name}`,
    Key: fileName,
    Body: file,
    // ContentType: file.type,
  }).send((err) => {
    if (err) console.log(err)
  });
  if (uploadImg && !uploadImg.error) {
    return { message: 'ok' }
  };
}

export const urlAws = {
  clinics: 'https://livecare-image.s3.ap-southeast-2.amazonaws.com/Clinics/',
  specialties: 'https://livecare-image.s3.ap-southeast-2.amazonaws.com/Specialties/',
  doctors: 'https://livecare-image.s3.ap-southeast-2.amazonaws.com/Doctors/'
}