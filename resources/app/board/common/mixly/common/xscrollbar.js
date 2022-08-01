/*!
 * x-scrollbar 自定义滚动条插件
 * 版本: v3.1.0
 * 作者: 清晨的阳光(QQ:765550360)
 * 许可: MIT
 * https://gitee.com/xujz520/x-scrollbar
 */

class XScrollbar {
  constructor(dom, options) {
    this.$dom = dom;
    if (this.$dom.classList.contains('x-scrollbar')) return;
    this.$dom.classList.add('x-scrollbar');

    // 移动端检测
    this.isMobile = window.navigator.userAgent.toLowerCase().indexOf('mobile') != -1;

    // 合并配置
    let defaultOptions = {
      // 响应容器和内容大小改变(自动更新滚动条)
      autoUpdate: true,
      // 阻止向上传递滚动事件
      preventDefault: true,
      // 仅水平滚动(拨动鼠标滚轮时将作用于X轴)
      onlyHorizontal: false,
      // 自动隐藏
      autoHide: true,
    };
    let defaultStyle = {
      // 滑块大小
      thumbSize: '5px',
      // 轨道颜色
      trackBackground: '#ddd',
      // 滑块颜色
      thumbBackground: '#5f5f5f',
      // 滑块圆角大小
      thumbRadius: '5px',
    };
    Object.assign(this, defaultOptions, defaultStyle, options);

    // 构造dom
    let scrollLeft = this.$dom.scrollLeft;
    let scrollTop = this.$dom.scrollTop;
    this.$container = this.html2dom('<div class="x-scrollbar__container"></div>');
    this.$content = this.html2dom('<div class="x-scrollbar__content"></div>');
    this.$trackX = this.html2dom('<div class="x-scrollbar__track-x"></div>');
    this.$trackY = this.html2dom('<div class="x-scrollbar__track-y"></div>');
    this.$thumbX = this.html2dom('<div class="x-scrollbar__thumb-x"></div>');
    this.$thumbY = this.html2dom('<div class="x-scrollbar__thumb-y"></div>');
    this.$trackX.appendChild(this.$thumbX);
    this.$trackY.appendChild(this.$thumbY);
    let childNodes = [];
    Array.prototype.forEach.call(this.$dom.childNodes, function (node) { childNodes.push(node) });
    childNodes.forEach((function (node) { this.$content.appendChild(node); }).bind(this));
    this.$container.appendChild(this.$content);
    this.$dom.appendChild(this.$container);

    // 处理内边距
    let styleObj = getComputedStyle(this.$dom);
    let padding = `${styleObj.paddingTop} ${styleObj.paddingRight} ${styleObj.paddingBottom} ${styleObj.paddingLeft}`;
    if(padding != '0px 0px 0px 0px') {
      this.$dom.style.padding = '0px 0px 0px 0px';
      this.$container.style.padding = padding;
    }

    // 设置初始值
    this.$container.scrollLeft = scrollLeft;
    this.$container.scrollTop = scrollTop;

    if (this.preventDefault) {
      this.$container.classList.add('x-scrollbar__container--preventDefault');
    }

    if (this.isMobile) return;

    this.$dom.appendChild(this.$trackX);
    this.$dom.appendChild(this.$trackY);
    this.$container.classList.add('x-scrollbar__container--hideScrollbar');
    if (JSON.stringify(defaultStyle) != JSON.stringify(Object.keys(defaultStyle).reduce((obj, k) => ({ ...obj, [k]: this[k] }), {}))) {
      this.style();
    }

    // 自动隐藏
    if (!this.autoHide) this.$dom.classList.add('x-scrollbar-keep');

    // 绑定事件
    this.bindScroll();
    this.bindDrag();
    if (this.onlyHorizontal) {
      this.bindWheel();
    }

    // 响应容器和内容大小改变
    if (this.autoUpdate) {
      // 首次自动触发
      this.resizeObserver();
    } else {
      this.update();
    }

  }

  /**
   * 设置滑块大小
   */
  setThumbSize() {
    // (clientWidth / scrollWidth) = (滑块大小 / clientWidth)
    // 最大滑动距离 = clientWidth - 滑块大小
    // 最大滚动距离 = scrollWidth - clientWidth
    // (滑动距离 / 最大滑动距离) = (滚动距离 / 最大滚动距离)

    // 容器大小
    this.clientWidth = this.$container.clientWidth;
    this.clientHeight = this.$container.clientHeight;
    // 内容大小
    this.scrollWidth = this.$container.scrollWidth;
    this.scrollHeight = this.$container.scrollHeight;
    //是否存在滚动条
    this.hasXScrollbar = this.scrollWidth > this.clientWidth;
    this.hasYScrollbar = this.scrollHeight > this.clientHeight;
    //滑块大小
    this.thumbXWidth = Math.max((this.clientWidth / this.scrollWidth) * this.clientWidth, 30);
    this.thumbYHeight = Math.max((this.clientHeight / this.scrollHeight) * this.clientHeight, 30);
    //最大滑动距离
    this.thumbXMaxLeft = this.clientWidth - this.thumbXWidth;
    this.thumbYMaxTop = this.clientHeight - this.thumbYHeight;
    //最大滚动距离
    this.maxScrollLeft = this.scrollWidth - this.clientWidth;
    this.maxScrollTop = this.scrollHeight - this.clientHeight;

    this.$trackX.style.display = this.hasXScrollbar ? 'block' : 'none';
    this.$trackY.style.display = this.hasYScrollbar ? 'block' : 'none';
    this.$thumbX.style.width = this.thumbXWidth + 'px';
    this.$thumbY.style.height = this.thumbYHeight + 'px';
  }

  /**
   * 拖动事件
   */
  bindDrag() {
    // 上一次的拖动位置
    let screenX = null;
    let screenY = null;

    this.$thumbX.addEventListener('mousedown', (e) => {
      this.$trackX.classList.add('x-scrollbar__track--draging');
      this.thumbXActive = true;
      screenX = e.screenX;
    });

    this.$thumbY.addEventListener('mousedown', (e) => {
      this.$trackY.classList.add('x-scrollbar__track--draging');
      this.thumbYActive = true;
      screenY = e.screenY;
    });

    document.addEventListener('mouseup', (e) => {
      this.$trackX.classList.remove('x-scrollbar__track--draging');
      this.$trackY.classList.remove('x-scrollbar__track--draging');
      this.thumbXActive = false;
      this.thumbYActive = false;
    });

    document.addEventListener('mousemove', (e) => {
      if (!(this.thumbXActive || this.thumbYActive)) return;
      e.preventDefault();

      requestAnimationFrame(() => {
        if (this.thumbXActive) {
          let offset = e.screenX - screenX;
          screenX = e.screenX;
          let left = Math.max(Math.min((parseFloat(this.$thumbX.style.left || 0) + offset), this.thumbXMaxLeft), 0);
          this.$thumbX.style.left = left + 'px';
          this.$container.scrollLeft = left / this.thumbXMaxLeft * this.maxScrollLeft;
        } else {
          let offset = e.screenY - screenY;
          screenY = e.screenY;
          let top = Math.max(Math.min((parseFloat(this.$thumbY.style.top || 0) + offset), this.thumbYMaxTop), 0);
          this.$thumbY.style.top = top + 'px';
          this.$container.scrollTop = top / this.thumbYMaxTop * this.maxScrollTop;
        }
      });
    });
  }

  /**
   * 仅水平滚动(拨动鼠标滚轮时将作用于X轴)
   */
  bindWheel() {
    let easeout = (start, end) => {
      if (Math.abs(end - start) <= 1) return end;
      return start + (end - start) / 4;
    };

    this.$container.addEventListener('wheel', (e) => {
      // 仅响应 y 滚动 => 作用于 x
      if (!this.hasXScrollbar) return;
      if (e.deltaY && !e.shiftKey) {
        // 结束值
        this.scrollLeft = Math.max(Math.min((this.scrollLeft || this.$container.scrollLeft) + (e.deltaY > 0 ? 100 : -100), this.maxScrollLeft), 0);
        this.left = this.scrollLeft / this.maxScrollLeft * this.thumbXMaxLeft;

        // 阻止向上传递 || !(终点)
        if (this.preventDefault || !(this.scrollLeft == 0 || this.scrollLeft == this.maxScrollLeft)) {
          e.preventDefault();
          e.stopPropagation();
        }

        if (this.reqId) return;

        // 起始值
        let scrollLeft = this.$container.scrollLeft;
        let left = parseFloat(this.$thumbX.style.left || 0);

        let animate = () => {
          scrollLeft = easeout(scrollLeft, this.scrollLeft);
          left = easeout(left, this.left);
          this.$container.scrollLeft = scrollLeft;
          this.$thumbX.style.left = left + 'px';
          this.innerScroll = true;
          if (scrollLeft != this.scrollLeft) {
            this.reqId = requestAnimationFrame(animate);
          } else {
            this.reqId = null;
            this.scrollLeft = null;
            requestAnimationFrame(() => this.innerScroll = false);
          }
        };
        animate();
      }
    });
  }

  /**
   * 滚动事件 => 修正滑块位置
   */
  bindScroll() {
    this.$container.addEventListener('scroll', () => {
      if (this.thumbXActive || this.thumbYActive || this.innerScroll) return;
      if (this.hasXScrollbar) {
        this.$thumbX.style.left = this.$container.scrollLeft / this.maxScrollLeft * this.thumbXMaxLeft + 'px';
      }
      if (this.hasYScrollbar) {
        this.$thumbY.style.top = this.$container.scrollTop / this.maxScrollTop * this.thumbYMaxTop + 'px';
      }
    });
  }

  /**
   * 观察容器大小
   */
  resizeObserver() {
    this.$resizeObserver = new ResizeObserver((entries) => {
      let contentRect = entries[0].contentRect;
      if (!(contentRect.width || contentRect.height)) return;
      this.update();
    });
    this.$resizeObserver.observe(this.$container);
    this.$resizeObserver.observe(this.$content);
  }

  /**
   * 使用滚动值修正滑块
   * 在 容器大小 或 内容大小 发生改变时调用
   */
  update() {
    this.setThumbSize();
    if (this.hasXScrollbar) {
      this.$thumbX.style.left = this.$container.scrollLeft / this.maxScrollLeft * this.thumbXMaxLeft + 'px';
    }
    if (this.hasYScrollbar) {
      this.$thumbY.style.top = this.$container.scrollTop / this.maxScrollTop * this.thumbYMaxTop + 'px';
    }
  }

  /**
   * html字符串 转 dom对象
   * @param {*} html 
   * @returns 
   */
  html2dom(html) {
    let element = document.createElement('div');
    element.innerHTML = html;
    let children = element.children;
    if (children.length <= 1) {
      return children[0];
    } else {
      return children;
    }
  }

  /**
   * 生成自定义样式
   */
  style() {
    let content = `
/* 轨道 */
.x-scrollbar__track-x {
  height: ${parseInt(this.thumbSize) * 2 + 4}px;
}

.x-scrollbar__track-y {
  width: ${parseInt(this.thumbSize) * 2 + 4}px;
}

/* 滑块 */
.x-scrollbar__track-x > .x-scrollbar__thumb-x,
.x-scrollbar__track-y > .x-scrollbar__thumb-y {
  background: ${this.thumbBackground};
  border-radius: ${parseInt(this.thumbRadius || 0) != 5 ? parseInt(this.thumbRadius || 0) : parseInt(this.thumbSize)}px;
}

.x-scrollbar__track-x > .x-scrollbar__thumb-x {
  height: ${parseInt(this.thumbSize)}px;
}

.x-scrollbar__track-y > .x-scrollbar__thumb-y {
  width: ${parseInt(this.thumbSize)}px;
}

/* 激活后大小 */
.x-scrollbar__track-x:hover > .x-scrollbar__thumb-x,
.x-scrollbar__track--draging > .x-scrollbar__thumb-x {
  height: ${parseInt(this.thumbSize) * 2}px;
}

.x-scrollbar__track-y:hover > .x-scrollbar__thumb-y,
.x-scrollbar__track--draging > .x-scrollbar__thumb-y {
  width: ${parseInt(this.thumbSize) * 2}px;
}

/* 鼠标移入轨道 || 拖动过程中 => 显示轨道 & 高亮滑块 */
.x-scrollbar__track-x:hover,
.x-scrollbar__track-y:hover,
.x-scrollbar__track-x.x-scrollbar__track--draging,
.x-scrollbar__track-y.x-scrollbar__track--draging {
  background: ${this.trackBackground || 'transparent'};
}`;

    this.key = 'x-scrollbar-' + Math.abs(((1 + Math.random()) * Date.now()) | 0).toString(16);
    this.$dom.setAttribute(this.key, '');
    let style = this.html2dom(`<style ${this.key}></style>`);
    content = content.replaceAll('\n.x-scrollbar', `\n[${this.key}] > .x-scrollbar`);
    content = content.replaceAll(';', ' !important;');
    style.innerHTML = content;
    document.querySelector('head').appendChild(style);
  }
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
  module.exports = XScrollbar;
} else {
  window.XScrollbar = XScrollbar;
}