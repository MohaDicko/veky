const fs = require('fs');
const path = require('path');

async function testUpload() {
  const filePath = path.join(process.cwd(), 'public', 'placeholder.jpg');
  const fileStats = fs.statSync(filePath);
  const fileContent = fs.readFileSync(filePath);
  
  // Basic simulation of FormData since 'form-data' might not be installed
  // We'll use a simple fetch-like request or just check if the route exists and is reachable
  console.log("Testing upload for file:", filePath);
  console.log("File size:", fileStats.size, "bytes");

  try {
    const formData = new FormData();
    formData.append("files", new Blob([fileContent]), "placeholder.jpg");

    const res = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      headers: {
        "Authorization": "Bearer admin" // or whatever is actually working locally
      },
      body: formData 
    });
    // This will likely fail with 'No files provided' but validates the route and auth
    const data = await res.json();
    console.log("API Response:", data);
  } catch (err) {
    console.error("Fetch failed (server might not be ready):", err.message);
  }
}

// Minimal FormData polyfill if needed, but modern Node has it
testUpload();
