# react-voicify

A React component for text-to-speech functionality with customizable voice, rate, pitch, and volume.

## Installation

You can install the package via npm or yarn:

```bash
npm install react-voicify
```

or

```bash
yarn add your-npm-package-name
```

## Usage

Import and use the `TextToSpeech` component in your React application:

```tsx
import React from 'react';
import TextToSpeech from 'react-voicify';

const App = () => {
  return (
    <div>
      <h1>Text to Speech Example</h1>
      <TextToSpeech text="Hello, world!" />
    </div>
  );
};

export default App;
```

## Props

### `TextToSpeechProps`

| Prop  | Type   | Default | Description                    |
|-------|--------|---------|--------------------------------|
| `text`| `string` | `''`   | The text to be spoken by the speech synthesis engine. |

## API

### TextToSpeech

#### Props

- **text**: `string`  
  The text to be spoken by the speech synthesis engine.

#### Example

```tsx
import React from 'react';
import TextToSpeech from 'yreact-voicify';

const App = () => {
  return (
    <div>
      <h1>Text to Speech Example</h1>
      <TextToSpeech text="Hello, world!" />
    </div>
  );
};

export default App;
```

### Customization

The `TextToSpeech` component provides several controls for customizing the speech synthesis:

- **Voice**: Select from the available voices on your system.
- **Rate**: Adjust the speaking rate (0.5 to 2).
- **Pitch**: Adjust the pitch (0 to 2).
- **Volume**: Adjust the volume (0 to 1).

### Methods

The component provides three buttons to control the speech synthesis:

- **Play**: Starts or resumes the speech.
- **Pause**: Pauses the speech.
- **Stop**: Stops the speech.

## Example

```tsx
import React from 'react';
import TextToSpeech from 'your-npm-package-name';

const App = () => {
  return (
    <div>
      <h1>Text to Speech Example</h1>
      <TextToSpeech text="Hello, world!" />
    </div>
  );
};

export default App;
```

## License

MIT
