import VisuComponentStereo from '../utils/VisuComponentStereo.js';
import CanvasUtils from '../utils/CanvasUtils.js';
import ColorUtils from '../utils/ColorUtils.js';


class Oscilloscope extends VisuComponentStereo {


  constructor(options) {
    super(options);
    // Save color
    this._colors = {
      signal: options.colors ? options.colors.signal || ColorUtils.defaultPrimaryColor : ColorUtils.defaultPrimaryColor
    };
    // Update canvas CSS background color
    const bgColor = (options.colors ? options.colors.background || ColorUtils.defaultBackgroundColor : ColorUtils.defaultBackgroundColor);
    if (this._merged === true) {
      this._canvas.style.backgroundColor = bgColor;
    } else {
      this._canvasL.style.backgroundColor = bgColor;
      this._canvasR.style.backgroundColor = bgColor;
    }
    // Init oscilloscope dimensions
    this._updateDimensions();
  }


  /*  ----------  VisuComponentStereo overrides  ----------  */



  _fillAttributes(options) {
    super._fillAttributes(options)

    // Dimensions will be computed when canvas have been created
    this._dimension = {
      height: null,
      canvasHeight: null,
      width: null
    };
  }


  _buildUI() {
    super._buildUI();

    if (this._merged === true) {
      this._dom.container.removeChild(this._canvasR);
    }
  }


  _onResize() {
    super._onResize();
    this._updateDimensions();
  }


  /*  ----------  Oscilloscope internal methods  ----------  */


  _processAudioBin() {
    if (this._isPlaying === true) {
      this._clearCanvas();

      if (this._merged === true) {
        this._mergedStereoAnalysis();
      } else {
        this._stereoAnalysis();
      }
      // Draw next frame
      requestAnimationFrame(this._processAudioBin);
    }
  }


  _mergedStereoAnalysis() {
    // Create TimeDomain array with freqency bin length
    let timeDomain = new Uint8Array(this._nodes.analyser.frequencyBinCount);
    // Left channel
    this._nodes.analyser.getByteTimeDomainData(timeDomain);
    CanvasUtils.drawOscilloscope(this._canvasL, {
      samples: this._nodes.analyser.frequencyBinCount,
      timeDomain: timeDomain,
      color: this._colors.signal
    });
  }


  _stereoAnalysis() {
    // Create TimeDomain array with freqency bin length
    let timeDomain = new Uint8Array(this._nodes.analyserL.frequencyBinCount);
    // Left channel
    this._nodes.analyserL.getByteTimeDomainData(timeDomain);
    CanvasUtils.drawOscilloscope(this._canvasL, {
      samples: this._nodes.analyserL.frequencyBinCount,
      timeDomain: timeDomain,
      color: this._colors.signal
    });
    // Right channel
    this._nodes.analyserR.getByteTimeDomainData(timeDomain);
    CanvasUtils.drawOscilloscope(this._canvasR, {
      samples: this._nodes.analyserR.frequencyBinCount,
      timeDomain: timeDomain,
      color: this._colors.signal
    });
  }


  _updateDimensions() {
    this._dimension.height = this._renderTo.offsetHeight - 4; // 2px borders times two channels
    this._dimension.width = this._renderTo.offsetWidth - 2; // 2px borders
    this._dimension.canvasHeight = this._dimension.height / 2;

    if (this._merged === true) {
      this._canvasL.width = this._dimension.width;
      this._canvasL.height = this._dimension.canvasHeight * 2;
    } else {
      this._canvasL.width = this._dimension.width;
      this._canvasL.height = this._dimension.canvasHeight;
      this._canvasR.width = this._dimension.width;
      this._canvasR.height = this._dimension.canvasHeight;
    }
  }


}


export default Oscilloscope;
