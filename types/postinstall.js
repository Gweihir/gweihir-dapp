const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")

// Define paths
const typesFolderPath = path.join(__dirname, "types")
const generatedFolderPath = path.join(typesFolderPath, "_generated_")

// Create _generated_ folder if it doesn't exist
if (!fs.existsSync(generatedFolderPath)) {
  fs.mkdirSync(generatedFolderPath)
}

// Execute TypeScript compiler to generate types in _generated_ folder
execSync(`tsc --outDir ${generatedFolderPath} --declaration ${typesFolderPath}`)
