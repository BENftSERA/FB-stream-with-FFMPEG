const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the RTMP link and Stream KEY: ', (rtmpLink) => {
  rl.question('Enter Video Name: ', (inputVideo) => {
      ffmpeg()
        .input(inputVideo)
        .inputOptions(['-stream_loop 0'])
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
            '-preset', 'veryfast',
            '-crf', '23',
            '-pix_fmt', 'yuv420p',
            '-profile:v', 'baseline',
            '-level', '4.1',
            '-b:v', '6000k',
            '-r', '30',
            '-g', '30',
            '-b:a', '128k',
            '-ac', '2',
            '-ar', '44100',
          ])
        .withOutputFormat('flv')
        .output(`${rtmpLink}`)
        .on('end', () => {
          console.log('Stream ended');
          rl.close();
        })
        .on('error', (err) => {
          console.error('Error:', err);
          rl.close();
        })
        .on('progress', (progress) => {
          console.log('Frames: ' + progress.frames);
        })
        .run();
      });
});
