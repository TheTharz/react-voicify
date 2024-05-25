import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextToSpeech from '../TextToSpeech';

// Mocking the SpeechSynthesis API
const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn().mockReturnValue([
    { name: 'Voice 1', lang: 'en-US' },
    { name: 'Voice 2', lang: 'en-GB' },
  ]),
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
});

describe('TextToSpeech Component', () => {
  beforeEach(() => {
    mockSpeechSynthesis.speak.mockClear();
    mockSpeechSynthesis.cancel.mockClear();
    mockSpeechSynthesis.pause.mockClear();
    mockSpeechSynthesis.resume.mockClear();
  });

  test('renders correctly', () => {
    render(<TextToSpeech text='Hello, world!' />);

    // Check if voice dropdown is rendered
    expect(screen.getByLabelText('Voice:')).toBeInTheDocument();

    // Check if rate slider is rendered
    expect(screen.getByLabelText('Rate: 1')).toBeInTheDocument();

    // Check if pitch slider is rendered
    expect(screen.getByLabelText('Pitch: 1')).toBeInTheDocument();

    // Check if volume slider is rendered
    expect(screen.getByLabelText('Volume: 1')).toBeInTheDocument();

    // Check if play, pause, and stop buttons are rendered
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  test('changes selected voice', () => {
    render(<TextToSpeech text='Hello, world!' />);

    const voiceSelect = screen.getByLabelText('Voice:');
    fireEvent.change(voiceSelect, { target: { value: 'Voice 2' } });

    expect(voiceSelect.value).toBe('Voice 2');
  });

  test('changes rate, pitch, and volume', () => {
    render(<TextToSpeech text='Hello, world!' />);

    const rateSlider = screen.getByLabelText('Rate: 1');
    const pitchSlider = screen.getByLabelText('Pitch: 1');
    const volumeSlider = screen.getByLabelText('Volume: 1');

    fireEvent.change(rateSlider, { target: { value: 1.5 } });
    fireEvent.change(pitchSlider, { target: { value: 1.2 } });
    fireEvent.change(volumeSlider, { target: { value: 0.8 } });

    expect(rateSlider.value).toBe('1.5');
    expect(pitchSlider.value).toBe('1.2');
    expect(volumeSlider.value).toBe('0.8');
  });

  test('play button works', () => {
    render(<TextToSpeech text='Hello, world!' />);

    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    expect(mockSpeechSynthesis.speak).toHaveBeenCalled();
  });

  test('pause button works', () => {
    render(<TextToSpeech text='Hello, world!' />);

    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);

    expect(mockSpeechSynthesis.pause).toHaveBeenCalled();
  });

  test('stop button works', () => {
    render(<TextToSpeech text='Hello, world!' />);

    const stopButton = screen.getByText('Stop');
    fireEvent.click(stopButton);

    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled();
  });

  test('resume button works', () => {
    render(<TextToSpeech text='Hello, world!' />);

    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);

    const resumeButton = screen.getByText('Resume');
    fireEvent.click(resumeButton);

    expect(mockSpeechSynthesis.resume).toHaveBeenCalled();
  });
});
