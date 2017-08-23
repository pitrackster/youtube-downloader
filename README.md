# youtube-downloader

Download youtube video by providing an url. 

You can choose to download audio / video + audio / video.

This app basically provide a (very) simple web interface to youtub-dl CLI

The video or audio will be downloaded with the best format available (which means large data to download)

The zip created is sent as blob to the client... nothing live on the server after the end of the process.

This app is intended for my personal use:
- no error handled
- no control of any input
- not many options
- no internationalisation (language used in UI is french)

### Install

`npm install && npm run webpack`

`sudo setfacl -R -m u:www-data:rwX -m u:`whoami`:rwX downloaded/  zipped/`
`sudo setfacl -dR -m u:www-data:rwX -m u:`whoami`:rwX downloaded/  zipped/`


### Scripts

- `npm run webpack` - build javascript
- `npm run watch` - build javascript and watch for changes

### Warnings

The process might take a long time depending on :

- your connection speed
- the length of the video you want to download
- your server configuration

### TODO

Handle errors, check inputs and give feedback to users ;-)

### uses :

- react
- youtube-dl
- ffmpeg