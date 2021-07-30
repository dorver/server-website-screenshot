#Server-website-screenshot

This server receives a website url, takes a screenshot of the website and creates a 10 seconds mp4 video.

##Installation
npm install

##Run
npm run server

##API
###Request
POST/http://localhost:5000/api/videos

url: "website url"

###Response

file: "path/to/file/video.mp4"
