const csv = require("csvtojson");
const fs = require("fs");

csv()
  .fromFile("./data/netflix_titles.csv")  // ✅ Path must point to real file
  .then(json => {
    fs.writeFileSync("netflix_data.json", JSON.stringify(json, null, 2));
    console.log("✅ CSV converted to JSON!");
  })
  .catch(err => {
    console.error("❌ Error parsing CSV:", err.message);
  });
