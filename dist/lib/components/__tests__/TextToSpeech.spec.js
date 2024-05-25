"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _TextToSpeech = _interopRequireDefault(require("../TextToSpeech"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Mocking the SpeechSynthesis API
const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn().mockReturnValue([{
    name: 'Voice 1',
    lang: 'en-US'
  }, {
    name: 'Voice 2',
    lang: 'en-GB'
  }])
};
Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis
});
describe('TextToSpeech Component', () => {
  beforeEach(() => {
    mockSpeechSynthesis.speak.mockClear();
    mockSpeechSynthesis.cancel.mockClear();
    mockSpeechSynthesis.pause.mockClear();
    mockSpeechSynthesis.resume.mockClear();
  });
  test('renders correctly', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));

    // Check if voice dropdown is rendered
    expect(_react2.screen.getByLabelText('Voice:')).toBeInTheDocument();

    // Check if rate slider is rendered
    expect(_react2.screen.getByLabelText('Rate: 1')).toBeInTheDocument();

    // Check if pitch slider is rendered
    expect(_react2.screen.getByLabelText('Pitch: 1')).toBeInTheDocument();

    // Check if volume slider is rendered
    expect(_react2.screen.getByLabelText('Volume: 1')).toBeInTheDocument();

    // Check if play, pause, and stop buttons are rendered
    expect(_react2.screen.getByText('Play')).toBeInTheDocument();
    expect(_react2.screen.getByText('Pause')).toBeInTheDocument();
    expect(_react2.screen.getByText('Stop')).toBeInTheDocument();
  });
  test('changes selected voice', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));
    const voiceSelect = _react2.screen.getByLabelText('Voice:');
    _react2.fireEvent.change(voiceSelect, {
      target: {
        value: 'Voice 2'
      }
    });
    expect(voiceSelect.value).toBe('Voice 2');
  });
  test('changes rate, pitch, and volume', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));
    const rateSlider = _react2.screen.getByLabelText('Rate: 1');
    const pitchSlider = _react2.screen.getByLabelText('Pitch: 1');
    const volumeSlider = _react2.screen.getByLabelText('Volume: 1');
    _react2.fireEvent.change(rateSlider, {
      target: {
        value: 1.5
      }
    });
    _react2.fireEvent.change(pitchSlider, {
      target: {
        value: 1.2
      }
    });
    _react2.fireEvent.change(volumeSlider, {
      target: {
        value: 0.8
      }
    });
    expect(rateSlider.value).toBe('1.5');
    expect(pitchSlider.value).toBe('1.2');
    expect(volumeSlider.value).toBe('0.8');
  });
  test('play button works', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));
    const playButton = _react2.screen.getByText('Play');
    _react2.fireEvent.click(playButton);
    expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
  });
  test('pause button works', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));
    const pauseButton = _react2.screen.getByText('Pause');
    _react2.fireEvent.click(pauseButton);
    expect(mockSpeechSynthesis.pause).toHaveBeenCalled();
  });
  test('stop button works', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));
    const stopButton = _react2.screen.getByText('Stop');
    _react2.fireEvent.click(stopButton);
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });
  test('resume button works', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_TextToSpeech.default, {
      text: "Hello, world!"
    }));
    const playButton = _react2.screen.getByText('Play');
    _react2.fireEvent.click(playButton);
    const pauseButton = _react2.screen.getByText('Pause');
    _react2.fireEvent.click(pauseButton);
    const resumeButton = _react2.screen.getByText('Resume');
    _react2.fireEvent.click(resumeButton);
    expect(mockSpeechSynthesis.resume).toHaveBeenCalled();
  });
});