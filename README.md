# React Text to Speech

This project is a React component that converts text to speech using the Web Speech API. The component allows users to select different voices, adjust the speech rate, pitch, and volume, and control playback with play, pause, and stop buttons. The component is styled using inline CSS.

## Features

- Convert text to speech using the Web Speech API.
- Select from various voices available in the browser.
- Adjust speech rate, pitch, and volume.
- Control playback with play, pause, and stop buttons.
- Inline CSS styling for easy customization.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-speakify
```

or

```bash
yarn add react-speakify
```

## Usage

```jsx
import React from 'react';
import TextToSpeech from 'react-speakify';

const App = () => {
  return (
    <div>
      <TextToSpeech text="Hello, world!" />
    </div>
  );
};

export default App;
```

## Props

| Prop          | Type     | Description                               |
|---------------|----------|-------------------------------------------|
| text          | string   | The text to be converted to speech.       |

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project utilizes the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for text-to-speech conversion.
