# React Text to Speech

Welcome to the React Text to Speech package documentation. This package provides a React component for converting text to speech, offering a range of customizable options for voice, rate, pitch, and volume.

## Installation

To install the package, use npm or yarn:

```bash
npm install react-text-to-speech
```

or

```bash
yarn add react-text-to-speech
```

## Usage

Using the `TextToSpeech` component is straightforward. Import it into your React application and pass the desired text as a prop. Here's a basic example:

```jsx
import React from 'react';
import TextToSpeech from 'react-text-to-speech';

const App = () => {
  return (
    <div>
      <h1>Text to Speech Demo</h1>
      <TextToSpeech text="Hello, world!" />
    </div>
  );
};

export default App;
```

## Props

The `TextToSpeech` component accepts the following props:

| Prop | Type   | Description                                      | Default  |
|------|--------|--------------------------------------------------|----------|
| text | string | The text to be converted to speech.              | `''`     |

## GitHub Repository

The source code for this package is available on GitHub:

[GitHub Repository](https://github.com/TheTharz/react-text-to-speech)

## License

This project is licensed under the MIT License. For details, see the [LICENSE](LICENSE) file.

---

Feel free to refer to this documentation for usage instructions, and more. If you have any questions or feedback, don't hesitate to reach out.
