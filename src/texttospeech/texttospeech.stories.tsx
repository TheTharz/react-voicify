import React from 'react';
import { TextToSpeech } from '.';

export default {
  title: 'TextToSpeech',
  component: TextToSpeech,
};

export const Default = () => <TextToSpeech text='Hello, world!' />;
