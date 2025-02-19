const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express.Router();
const pool = require("../config/db");

const addPost = async (postData) => {
    let { user_id, post_content, media_type, created_at, likes_count , images} = postData;
    let values = [user_id, post_content, media_type, created_at, likes_count , images];
    console.log(postData , "::::: THIS IS ADD_POST_DATA FROM SERVICES  ::")
    try {
        const result = await pool.query("INSERT INTO user_posts (user_id, post_content, media_type, created_at, likes_count,images) VALUES ($1, $2, $3, $4, $5,$6)", values);
        console.log(result , "this is from add post service")
        return "Data inserted successfully"
    } catch (err) {
        console.error("Error inserting data", err);
        return "Error inserting data"
    }
}
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


router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const postContent = req.body.post_content; 
  const mediaType = req.body.media_type; 
  const userId = req.body.user_id; 
  const createdAt = req.body.created_at; 
  const likesCount = req.body.likes_count; 

  let imageUrl = '';  // Default empty image URL

  try {
    if (file) {
      const params = {
        Bucket: bucketName,
        Key: file.originalname,  // File name to save in S3
        Body: file.buffer,       // File content
        ACL: 'public-read',      // Make the file publicly accessible
      };
      
      // Upload the file to S3
      console.log('Uploading file to S3...');
      await s3.putObject(params).promise();
      console.log('File uploaded successfully');
      
      // Construct image URL after upload
      imageUrl = `http://localhost:4566/${bucketName}/${encodeURIComponent(file.originalname)}`;
    }

    // Prepare post data
    let postData = {
      user_id: userId,
      post_content: postContent,
      media_type: mediaType,
      created_at: createdAt,
      likes_count: likesCount,
      images: imageUrl, // Save the image URL (or empty string if no file)
    };

    console.log(postData, "this is postData object");

    // Insert into the database
    const dbResponse = await addPost(postData);

    // Send response
    res.status(200).json({
      message: 'Post created successfully',
      imageUrl: imageUrl,  // Send back the image URL (if exists)
      postDetails: postData,  // Send back the post data
      dbResponse: dbResponse, // Database response (success or error)
    });

  } catch (err) {
    console.error('Error uploading file or saving post:', err);
    res.status(500).send('Failed to upload file or save post');
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
