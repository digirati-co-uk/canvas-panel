class TapDetector {
  constructor($el, options) {
    this.$el = $el;
    this.$el.addEventListener('touchstart', this.handleTouchStart);
    this.$el.addEventListener('touchend', this.handleTouchEnd);
    this.$el.addEventListener('touchmove', this.handleTouchMove);
    this.options = {
      doubleTapTimeout: 150,
      tapTimeout: 500,
      tapRadius: 50,
      ...options,
    };
  }

  unbind() {
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchend', this.handleTouchEnd);
    this.$el.removeEventListener('touchmove', this.handleTouchMove);
  }

  onTaps = [];
  onTap = func => {
    this.onTaps.push(func);
  };

  handleTap = () => {
    this.onTaps.forEach(fn => fn());
  };

  touchData = {
    clientX: 0,
    clientY: 0,
    tap: true,
    stopped: false,
    noDoubleTap: null,
    timeout: null,
    doubleTapTimeout: null,
  };
  handleTouchStart = e => {
    const { clientX, clientY } = e.touches[0];
    this.touchData.clientX = clientX;
    this.touchData.clientY = clientY;
    this.touchData.timeout = setTimeout(() => {
      this.touchData.stopped = true;
    }, this.options.tapTimeout);
    if (this.touchData.noDoubleTap) {
      this.touchData.noDoubleTap = false;
    }
  };
  handleTouchMove = e => {
    if (this.touchData.tap) {
      const { clientX, clientY } = e.touches[0];
      const distX = Math.abs(clientX - this.touchData.clientX);
      const distY = Math.abs(clientY - this.touchData.clientY);
      if (distY >= this.options.tapRadius || distX >= this.options.tapRadius) {
        this.touchData.tap = false;
      }
    }
  };
  handleTouchEnd = () => {
    clearTimeout(this.touchData.timeout);
    clearTimeout(this.touchData.doubleTapTimeout);

    if (
      this.touchData.tap &&
      this.touchData.stopped === false &&
      this.touchData.noDoubleTap === null
    ) {
      this.touchData.noDoubleTap = true;
      this.touchData.doubleTapTimeout = setTimeout(() => {
        if (this.touchData.noDoubleTap) {
          this.handleTap();
        } else {
          // this.onDoubleTap();
        }
        this.touchData.noDoubleTap = null;
      }, this.options.doubleTapTimeout);
    } else {
      this.touchData.noDoubleTap = null;
    }
    this.touchData = {
      ...this.touchData,
      clientX: 0,
      clientY: 0,
      tap: true,
      stopped: false,
      timeout: null,
    };
  };
}

export default TapDetector;
