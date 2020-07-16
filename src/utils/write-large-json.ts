import StreamArray from 'stream-json/streamers/StreamArray';
import { createReadStream } from "fs";
import { Writable } from "stream";

const defaultTransform = `{
  ...rest,
  region: region?.id
}`

const writeLargeJson = (path, saveFunc, transform = defaultTransform, timeout = 1) => {
  const stream = createReadStream(path, {
    flags: 'r',
    encoding: 'utf-8',
  })
  const jsonStream = StreamArray.withParser();

  const processingStream = new Writable({
    write({key, value}, encoding, callback) {
      //Save to mongo or do any other async actions
      const { region, ...rest } = value;
      const formattedData = defaultTransform

      /**
       * Call function on each row
       */
      saveFunc(formattedData)

      setTimeout(() => {
        console.log(value);
        callback();
      }, timeout);
    },
    /**
     * We need to operate with objects, not buffers
     */
    objectMode: true
  });

  stream.pipe(jsonStream.input);
  jsonStream.pipe(processingStream);

  processingStream.on('finish', () => console.log('All done'));
}

export default writeLargeJson