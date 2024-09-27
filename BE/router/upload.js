const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express.Router();
const upload = multer();
var fs = require('fs');
var dir = './images';

const s3 = new AWS.S3({
  endpoint: 'http://localstack:4566',  // LocalStack endpoint
  s3ForcePathStyle: true,             // Use path-style URLs for S3
  accessKeyId: 'socialmedia',        
  secretAccessKey: 'socialmedia',
});

const bucketName = 'localstack-bucket';

// Create bucket if it doesn't exist
s3.createBucket({ Bucket: bucketName }, (err, data) => {
  if (err && err.code !== 'BucketAlreadyOwnedByYou') {
    console.log('Error creating bucket:', err);
  } else {
    console.log('Bucket ready:', bucketName);
    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",  // Allow everyone
          Action: "s3:GetObject",  // Only allow reading objects
          Resource: `arn:aws:s3:::${bucketName}/*`  // Apply policy to all objects in the bucket
        }
      ]
    };
    const putPolicyParams = {
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy),
    };
    s3.putBucketPolicy(putPolicyParams, (err, data) => {
      if (err) {
        console.error('Error setting bucket policy:', err);
      } else {
        console.log('Bucket policy set to public successfully');
      }
    });
  }
});

// Upload route
// Upload the file to S3
router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).send('No file uploaded');
  }

  const file = req.file;
  const params = {
    Bucket: bucketName,
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read',
  };
  console.log(params , "this is my params:::::::::::::")
  try {
    console.log('Uploading file to S3...');
    await s3.putObject(params).promise();
    console.log('File uploaded successfully');
    res.status(200).send('File uploaded successfully');
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Failed to upload file');
  }
});

router.get('/list-buckets', (req, res) => {
  s3.listBuckets((err, data) => {
    if (err) {
      console.log('Error listing buckets:', err);
      return res.status(500).json({ message: 'Failed to list buckets.' });
    }
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
      express.static(path.join(__dirname, './images'))
      }
    res.status(200).json(data.Buckets);
  });
});

// List uploaded images
router.get('/list-images', async (req, res) => {
  const params = {
    Bucket: bucketName,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const images = data.Contents.map((item) => ({
      key: item.Key,  // Key (filename) of the image
      url: `http://localhost:4566/${bucketName}/${encodeURIComponent(item.Key)}`, // Construct public URL for image
    }));

    res.status(200).json(images);
  } catch (err) {
    console.error('Error listing images:', err);
    res.status(500).send('Error listing images');
  }
});



// Image fetch route
router.get('/image/:key', (req, res) => {
  const params = {
    Bucket: bucketName,
    Key: req.params.key,  
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error('Error fetching image:', err);
      return res.status(500).send('Error fetching image');
    }

    // Set the correct content type (e.g., image/png, image/jpeg)
    if (data.ContentType) {
      res.set('Content-Type', data.ContentType);
    } else {
      res.set('Content-Type', 'image/png');  // Default to PNG if content type is not available
    }
    console.log(data.Body,"this is my data.body")
    res.send(data.Body);  // Send the image data as the response
  });
});

module.exports = router;
// docker run --name some-postgres --network social-media-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=sharingDB -p 5432:5432 -d postgres
// docker run -d --rm -it --network social-media-network -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack
// docker run --network social-media-network -p 127.0.0.1:3000:3000 back-f

// social-media-network
// docker network inspect social-media-network
// docker stop 90d570a61704
