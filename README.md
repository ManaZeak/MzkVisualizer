# MzkVisualizer

![](https://badgen.net/badge/version/0.8.8/blue)
![License](https://img.shields.io/github/license/ManaZeak/MzkVisualizer.svg)

This library free module provides several standard audio visualizations in the browser using WebAudioAPI. It is best to be used with an HTML audio element (to benefit its streaming mechanism), but can also work with an `AudioContext`.

To get started, simply include the bundled files in the `dist` folder and reference them in your project HTML. If you want to bundle it yourself, just reference `MzkVisualizer.js` and `mzkvisualizer.scss` as entry points. You can now access this module using the `window.MzkVisualizer` object to build the following visualizations.

*NB: You must provide a HTML audio element and a DOM element with the dimension you need to render visualization in.*

## Oscilloscope

<p>
  <img src="/assets/screenshots/Oscilloscope.png" width="960" />
</p>

```javascript
const component = new MzkVisualizer({
  type: 'oscilloscope',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */
  fftSize: 1024,
  audioContext: null,
  inputNode: null,
  merged: false,
  colors: {
    background: '#1D1E25', // Mzk background
    signal: '#56D45B' // Mzk green
  }
});
```

## Peak meter

<p>
  <img src="/assets/screenshots/Peakmeter.png" width="960" />
</p>

```javaScript
const component = new MzkVisualizer({
  type: 'peakmeter',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */  
  fftSize: 1024,
  audioContext: null,
  inputNode: null,  
  merged: false,
  orientation: 'horizontal',
  legend: {
    dbScaleMin: 60,
    dbScaleTicks: 15
  },
  colors: {
    background: '#1D1E25', // Mzk background
    min: '#56D45B', // Mzk green, gradient index 0
    step0: '#AFF2B3', // Light green, gradient index 0.7
    step1: '#FFAD67', // Orange, gradient index 0.833
    step2: '#FF6B67', // Red, gradient index 0.9
    max: '#FFBAB8' // Light red, gradient index 1
  }
});
```

## Bars

<p>
  <img src="/assets/screenshots/Bars.png" width="960" />
</p>

```javascript
const component = new MzkVisualizer({
  type: 'frequencybars',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */  
  fftSize: 1024,
  audioContext: null,
  inputNode: null,  
  colors: {
    background: '#1D1E25', // Mzk background
    min: '#56D45B', // Mzk green, gradient index 0
    step0: '#AFF2B3', // Light green, gradient index 0.7
    step1: '#FFAD67', // Orange, gradient index 0.833
    step2: '#FF6B67', // Red, gradient index 0.9
    max: '#FFBAB8' // Light red, gradient index 1
  }
});
```

## Spectrum

<p>
  <img src="/assets/screenshots/Spectrum.png" width="960" />
</p>

```javascript
const component = new MzkVisualizer({
  type: 'spectrum',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */  
  fftSize: 1024,
  audioContext: null,
  inputNode: null,  
  merged: false,
  colorSmoothing: true,
  scale: 'logarithmic' // linear/logarithmic
});
```

## Waveform

<p>
  <img src="/assets/screenshots/Waveform.png" width="960" />
</p>


```javascript
const component = new MzkVisualizer({
  type: 'waveformprogress',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */  
  fftSize: 1024,
  audioContext: null,
  inputNode: null,  
  animation: 'gradient', // fade or gradient
  wave: {
    align: 'center', // top/center/bottom
    barWidth: 1, // Parent percentage [1, 100]
    barMarginScale: 0.25 // Bar margin percentage from width [0, 1]
    merged: true // For center align only
  },
  colors: {
    background: '#1D1E25', // Mzk background
    track: '#E7E9E7', // Light grey
    progress: '#56D45B' // Mzk green
  }
});
```

## Timeline

<p>
  <img src="/assets/screenshots/Timeline.png" width="960" />
</p>

```javascript
const component = new MzkVisualizer({
  type: 'timeline',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */  
  fftSize: 1024,
  audioContext: null,
  inputNode: null,  
  speed: 5,
  beat: {
    offset: null, // Time in s
    bpm: null,
    timeSignature: null
  },
  colors: {
    background: '#1D1E25', // Mzk background
    track: '#12B31D', // Dark green
    mainBeat: '#FF6B67', // Mzk red
    subBeat: '#56D45B' // Light grey
  }
});
```

## Circle

<p>
  <img src="/assets/screenshots/Circle.png" width="960" />
</p>

```javascript
const component = new MzkVisualizer({
  type: 'frequencycircle',
  player: document.querySelector('audio'),
  renderTo: document.body,
  /* Optional arguments presented with default values */  
  fftSize: 1024,
  audioContext: null,
  inputNode: null,  
  image: 'assets/img/manazeak-logo-small.svg'
});
```
