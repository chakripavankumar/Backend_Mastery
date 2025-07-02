// 📘 High-Level Overview of Streams in Node.js

/**
 * Streams in Node.js handle data efficiently in chunks instead of loading entire data into memory.
 * They are useful for large files, video/audio, network data, and more.
 * Node.js stream types:
 * 1. Readable: To read data (e.g., fs.createReadStream)
 * 2. Writable: To write data (e.g., fs.createWriteStream)
 * 3. Duplex: Both readable and writable (e.g., sockets)
 * 4. Transform: Modify data while reading/writing (e.g., compression, encoding)
 */

/// ✅  Streams are NOT only for video/audio
// Streams handle any large data source: text files, APIs, logs, etc.

const fs = require("fs");
const http = require("http");
const { Readable, Writable, Transform, pipeline } = require("stream");
//Transform streams are Duplex streams where the output is in some way related to the input. Like all Duplex streams, Transform streams implement both the Readable and Writable interfaces.
//A module method to pipe between streams and generators forwarding errors and properly cleaning up and provide a callback when the pipeline is complete.
// ✅  Understanding Streams and Buffers
// Data flows in small chunks through streams (Buffer objects)

// ✅  Create HTTP Server
const server = http.createServer((req, res) => {
  if (req.url !== "/") return res.end();

  //  Downloading Big Files - Bad Way
  const badWayData = fs.readFileSync("./sample2.txt", "utf-8");
  res.write("\n--- Bad Way Output ---\n");
  res.write(badWayData);

  // ✅  Downloading Big Files - Good Way
  res.write("\n--- Good Way Output ---\n");
  const readableStream = fs.createReadStream("./sample2.txt");
  readableStream.pipe(res, { end: false }); // Pipe to response without closing it

  readableStream.on("end", () => {
    // ✅  Copy Big Files - Good Way
    const readStream = fs.createReadStream("./sample2.txt");
    const writeStream = fs.createWriteStream("./output.txt");
    readStream.pipe(writeStream);

    // ✅  String Processing - Transform Stream
    const input = fs.createReadStream("./easy.txt");
    const output = fs.createWriteStream("./output_easy.txt");

    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        const processed = chunk
          .toString()
          .toUpperCase()
          .replaceAll(/pavan/gi, "SIGMA");
        callback(null, processed);
      },
    });

    pipeline(input, transformStream, output, (err) => {
      if (err) console.error("Pipeline error:", err);
      else console.log("Transform complete");
    });

    res.write("\n--- Transform Stream Completed ---\n");

    // ✅ Custom Readable & Writable Streams
    const customReadable = new Readable({
      read() {
        this.push("First chunk\n");
        this.push("Second chunk\n");
        this.push(null);
      },
    });

    const customWritable = new Writable({
      write(chunk, encoding, callback) {
        console.log("[Custom Writable]", chunk.toString());
        callback();
      },
    });

    customReadable.pipe(customWritable);

    res.end("\n✅ All stream operations completed.\n");
  });
});

server.listen(8080, () => {
  console.log("✅ Server is running on http://localhost:8080");
});
