# ASCII Generator

A free, browser-based ASCII art studio for photos, animated GIFs, and videos. Built with plain HTML, CSS, and JavaScript. No dependencies, accounts, or API keys are required to run the app.

## Features

- Live ASCII preview with five character sets
- Adjustable detail, brightness, contrast, and character inversion
- Original colors, single-color ink, two-color gradients, and background selection
- PNG image, plain text, animated GIF, and silent WebM video exports
- Adjustable export width, animation frame rate, and clip length
- Built-in animated sample to explore without uploading a file

## Run locally

Open `dist/index.html` in a recent Chrome or Edge browser. For the most consistent browser API support, serve it on localhost:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Then open http://localhost:8080. On Windows, use `py` in place of `python3` if needed.

## Self-host

Copy the three files in `dist/` to any static web host. Serve `index.html` at the root of the chosen folder. The app works at a domain root or a subdirectory and needs no build step or backend. Use HTTPS for browser API compatibility.

The development server above is intended for local use. For an Internet-facing installation, serve the files with your existing static web server or hosting provider. Access restrictions are configured by the host, not by the app.

## Privacy

The app processes selected media in your browser. Its code does not upload media, call external APIs, load remote fonts or scripts, or include analytics. Your hosting provider may still record ordinary page requests. Exports use your browser's download location.

Only static source files, documentation, a license, and a small test are included in this repository. No hosting credentials, private server configuration, user media, or deployment history are needed.

## Compatibility and limits

- Recent Chrome or Edge is recommended. Animated GIF input requires `ImageDecoder`; available video codecs depend on the browser.
- GIF input is limited to 300 frames. Very tall images use at most 300 character rows.
- GIF export uses a 256-color palette and is capped at 640 pixels wide. Its simple encoder favors compatibility over small files; detailed or long clips can be large.
- Animation exports start at the beginning and use the selected 3, 5, or 10 seconds, bounded by video duration.
- WebM exports contain no audio. PNG and WebM use the selected output width.
- Processing large media can use substantial browser memory. Keep the tab active during video recording.

## Development and checks

Edit `dist/index.html`, `dist/style.css`, and `dist/app.js` directly. There is no package installation or build step.

With Node.js installed:

```sh
node --check dist/app.js
node check.cjs
```

The check covers character brightness mapping, inversion, GIF headers, timing, data blocks, and encoded pixel values. Full browser/media compatibility tests are not automated.

Contributions and bug reports are welcome. Include your browser/version and steps to reproduce; avoid attaching private media or credentials.

## License

MIT. See [LICENSE](LICENSE).
