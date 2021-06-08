# AWS-Quiz

My first Typescript + NodeGui project. This little application picks a random question from the AWS Knowledge Center.

![demo](./assets/demo.gif)

## Usage

Download the [MacOS executable file](https://github.com/jc1518/AWS-Quiz/releases/tag/1.0.0), then double click to run.

- Single click the interface - skip anwer and go to next question
- Double click the interface - show answer and go to next question


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