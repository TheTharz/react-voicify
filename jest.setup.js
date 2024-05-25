import '@testing-library/jest-dom';
global.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn().mockReturnValue([
    { name: 'Voice 1', lang: 'en-US' },
    { name: 'Voice 2', lang: 'en-GB' },
  ]),
};

global.SpeechSynthesisUtterance = function (text) {
  this.text = text;
  this.voice = null;
  this.rate = 1;
  this.pitch = 1;
  this.volume = 1;
  this.onend = null;
  this.onerror = null;
};
