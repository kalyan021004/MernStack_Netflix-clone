import mongoose from 'mongoose';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// For ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI ;
const DEFAULT_POSTER_URL = 'https://via.placeholder.com/200x300/333333/ffffff?text=Movie+Poster';

// Validate poster URL
async function validateImageUrl(url) {
  try {
    if (!url || typeof url !== 'string') return false;
    const response = await axios.head(url, {
      timeout: 5000,
      validateStatus: status => status === 200
    });
    return response.status === 200;
  } catch {
    return false;
  }
}

// Clean new data's poster URLs
async function cleanDataPosterUrls(dataArray) {
  console.log('🔍 Validating poster URLs...');
  let validCount = 0, invalidCount = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i];

    const isValid = await validateImageUrl(item.posterUrl);
    if (!isValid) {
      item.posterUrl = DEFAULT_POSTER_URL;
      invalidCount++;
    } else {
      validCount++;
    }

    if ((i + 1) % 50 === 0) {
      console.log(`Progress: ${i + 1}/${dataArray.length}`);
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log(`✅ Poster validation complete`);
  console.log(`   Valid: ${validCount}, Invalid: ${invalidCount}`);
  return dataArray;
}

// Fix posters for existing DB entries
async function cleanExistingPosters(NetflixTitle) {
  try {
    const titles = await NetflixTitle.find({});
    let updatedCount = 0;

    for (const title of titles) {
      const isValid = await validateImageUrl(title.posterUrl);
      if (!isValid) {
        title.posterUrl = DEFAULT_POSTER_URL;
        await title.save();
        updatedCount++;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`✅ Updated ${updatedCount} records`);
  } catch (err) {
    console.error('❌ Error cleaning DB posters:', err.message);
  }
}

// Main function
async function run() {
  try {
    console.log('📦 Loading model and data...');

    const NetflixTitleModule = await import('./models/NetflixTitle.js');
    const NetflixTitle = NetflixTitleModule.default;

    const dataPath = path.join(__dirname, 'data/netflix_data.json');
    if (!fs.existsSync(dataPath)) {
      throw new Error('netflix_data.json file not found');
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(rawData);

    console.log(`✅ Loaded ${data.length} records`);

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    const cleanedData = await cleanDataPosterUrls([...data]);

    await NetflixTitle.deleteMany({});
    console.log("🗑️  Existing data cleared");

    await NetflixTitle.insertMany(cleanedData);
    console.log("✅ New data inserted");

    const total = await NetflixTitle.countDocuments();
    console.log(`📊 Total records: ${total}`);

  } catch (err) {
    console.error("❌ Error:", err.message);
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log('💡 Ensure NetflixTitle.js and netflix_data.json exist at correct paths.');
    }
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

run();
