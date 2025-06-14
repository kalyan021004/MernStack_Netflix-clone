async function run() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    await NetflixTitle.deleteMany({});
    await NetflixTitle.insertMany(data);

    console.log("✅ Data inserted successfully");
  } catch (err) {
    console.error("❌ Error inserting:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();