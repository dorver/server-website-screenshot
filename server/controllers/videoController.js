import asyncHandler from 'express-async-handler';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobePath.path);
import puppeteer from 'puppeteer';
import videoshow from 'videoshow';
import path from 'path';

var image = { path: './screenshot.png' };

const createVideo = asyncHandler(async (req, res) => {
  const { url } = req.body;

  const capture = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
      await page.goto(url);
    } catch (err) {
      return await res.status(400).json({
        error: 'go to url failed',
      });
    }

    try {
      await page.screenshot(image);
    } catch (err) {
      return await res.status(400).json({
        error: 'screenshot image failed',
      });
    }
    await browser.close();

    await videoshow([image], videoOptions)
      .save('video.mp4')
      .on('start', function (command) {
        console.log('ffmpeg process started:', command);
      })
      .on('error', function (err, stdout, stderr) {
        console.error('Error:', err);
        return res.status(400).json({
          error: 'generate video failed  ' + err,
        });
      })
      .on('end', async function (output) {
        let absolutePath = path.resolve(output).replace(/\\/g, '/');
        console.log('Video created in:', absolutePath);
        return res.status(201).json({
          file: absolutePath,
        });
      });
  };
  capture();

  var videoOptions = {
    fps: 25,
    loop: 10,
    transition: true,
    transitionDuration: 1,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p',
  };
});

export { createVideo };
