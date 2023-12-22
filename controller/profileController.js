const conn = require('../config/connection');
const {Storage} = require('@google-cloud/storage');

const path = require('path');

const pathKey = path.resolve('service.json');

const getProfile = (req, res) => {
  try {
    const sql = 'SELECT * FROM detail_users WHERE id_users = ?;';
    conn.query(sql, [sessionID], (err, result) => {
      if (err) {
        return res.status(500).json({
          code: 500,
          status: 'INTERNAL SERVER ERROR',
          message: 'Unable to retrieve data from the database',
          data: null,
        });
      } else {
        return res.status(201).json({
          code: 201,
          status: 'OK',
          message: 'User Profile data obtained successfully',
          data: result,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error while fetching recipes',
      data: null,
    });
  };
};

const gcs = new Storage({
  projectId: 'saji-capstone-project',
  keyFilename: pathKey,
});

const bucketName = 'asset_saji';
const folder = 'profile';
const bucket = gcs.bucket(bucketName);

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${bucketName}/${folder}/${filename}`;
};

const updateProfile = async (req, res) => {
  // eslint-disable-next-line camelcase
  const {nama, tanggal_lahir, alamat, email, hp} = req.body;
  const file = req.file;
  let publicUrl = '';

  try {
    if (file) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().replace(/[-T:]/g, '');
      const fileName = `${folder}/${formattedDate}`;

      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (err) => {
        console.error('Error uploading to GCS:', err);
        res.status(500).json({
          code: 500,
          status: 'INTERNAL SERVER ERROR',
          message: 'Error uploading file to Cloud Storage',
          data: null,
        });
      });

      stream.on('finish', () => {
        file.cloudStoragePublicUrl = getPublicUrl(fileName);

        if (req.file && file.cloudStoragePublicUrl) {
          publicUrl = file.cloudStoragePublicUrl;
        }

        // Update user profile data in the database
        const sql = 'UPDATE detail_users SET nama = ?, tanggal_lahir = ?, alamat = ?, email = ?, no_hp = ?, foto = ? WHERE id_users = ?';

        // eslint-disable-next-line camelcase
        conn.query(sql, [nama, tanggal_lahir, alamat, email, hp, publicUrl, sessionID], (err, result) => {
          if (err) {
            console.error('Error updating profile in the database:', dbError);
            res.status(500).json({
              code: 500,
              status: 'INTERNAL SERVER ERROR',
              message: 'Error updating profile in the database',
              data: null,
            });
          }
          res.status(201).json({
            code: 201,
            status: 'OK',
            message: 'User Profile data successfully updated',
          });
        });
      });

      stream.end(file.buffer);
    } else {
      const sqlSelect = 'SELECT * FROM detail_users WHERE id_users = ?;';
      conn.query(sqlSelect, [sessionID], (err, result) => {
        oldImage = result[0]['foto'];
        const sqlUpdate = 'UPDATE detail_users SET nama = ?, tanggal_lahir = ?, alamat = ?, email = ?, no_hp = ?, foto = ? WHERE id_users = ?';
        // eslint-disable-next-line camelcase
        conn.query(sqlUpdate, [nama, tanggal_lahir, alamat, email, hp, null, sessionID], (err, result) => {
          if (oldImage != null) {
            console.log('lewar');
            parts = oldImage.split('/');
            oldfileName = parts.slice(-2).join('/');
            console.log(oldfileName);
            gcs.bucket(bucketName).file(oldfileName).delete();
          }

          res.status(201).json({
            code: 201,
            status: 'OK',
            message: 'User Profile data successfully updated',
          });
        });
      });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: 'Internal server error',
      data: null,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
