# AWS-Quiz

My first Typescript + NodeGui project. This little application picks a random question from the AWS Knowledge Center.

![demo](./assets/demo.gif)

## Usage

Download the [MacOS executable file](https://github.com/jc1518/AWS-Quiz/releases/tag/1.0.0), then double click to run.

- Single click the interface - skip anwer and go to next question
- Double click the interface - show answer and go to next question

*NOTE*

You may see a warning ["macOS cannot verify that this app is free from malware"](https://gadgetstouse.com/blog/2021/04/08/fix-macos-cannot-verify-app-is-free-from-malware/). Here is a quick way to override it.

1) In the Finder on your Mac, locate the app you just downloaded.
2) Press Control and click the app icon, then choose Open from the shortcut menu.
3) Click Open.

## Development

### Install Requirements (MacOS)
```
brew install cmake
brew install make
npm install
```

### Run application
```
npm start
```

### Build application for distribution
```
npx nodegui-packer --init AWS-Quiz (#Only for the first time)
npm run build
npx nodegui-packer --pack ./dist
```