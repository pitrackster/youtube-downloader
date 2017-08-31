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

> Set proper rights to downloaded and zipped folders

`sudo setfacl -R -m u:www-data:rwX downloaded/ zipped/`

`sudo setfacl -dR -m u:www-data:rwX downloaded/ zipped/`

### Scripts

- `npm run webpack` - build javascript
- `npm run watch` - build javascript and watch for changes

### Warnings

The process might take a long time depending on :

- your connection speed
- the length of the video you want to download
- your server configuration

### TODO

- Create components instead of a "All in One" main component

- Handle errors, check inputs and give feedback to users

- Also find a way to revoke objectUrl created (can not do that before download ends) ...

> See that : https://github.com/whatwg/html/issues/954

### Uses

- reactJS
- youtube-dl
- avconv (because it works out of the box with my raspberry pi while ffmpeg don't)

### Maintenance

Since youtube is changing the way videos are available an update of youtube-dl might be usefull

> As I installed youtube-dl with pip for me it's just `sudo pip install --upgrade youtube-dl`