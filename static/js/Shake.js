		(function(global, factory) {
			if(typeof define === 'function' && define.amd) {
				define(function() {
					return factory(global, global.document);
				});
			} else if(typeof module !== 'undefined' && module.exports) {
				module.exports = factory(global, global.document);
			} else {
				global.Shake = factory(global, global.document);
			}
		}(typeof window !== 'undefined' ? window : this, function(window, document) {
			'use strict';

			function Shake(options) {
				//feature detect  
				this.hasDeviceMotion = 'ondevicemotion' in window;
				this.options = {
					threshold: 15, //默认摇动阈值  
					timeout: 1000 //默认两次事件间隔时间  
				};
				if(typeof options === 'object') {
					for(var i in options) {
						if(options.hasOwnProperty(i)) {
							this.options[i] = options[i];
						}
					}
				}
				//使用date防止重复调用  
				this.lastTime = new Date();
				//accelerometer values  
				this.lastX = null;
				this.lastY = null;
				this.lastZ = null;
				//创建自定义事件  
				if(typeof document.CustomEvent === 'function') {
					this.event = new document.CustomEvent('shake', {
						bubbles: true,
						cancelable: true
					});
				} else if(typeof document.createEvent === 'function') {
					this.event = document.createEvent('Event');
					this.event.initEvent('shake', true, true);
				} else {
					return false;
				}
			}
			//重置时间计时器  
			Shake.prototype.reset = function() {
				this.lastTime = new Date();
				this.lastX = null;
				this.lastY = null;
				this.lastZ = null;
			};
			//开始监听 devicemotion  
			Shake.prototype.start = function() {
				this.reset();
				if(this.hasDeviceMotion) {
					window.addEventListener('devicemotion', this, false);
				}
			};
			//停止监听 devicemotion  
			Shake.prototype.stop = function() {
				if(this.hasDeviceMotion) {
					window.removeEventListener('devicemotion', this, false);
				}
				this.reset();
			};
			//计算是否触发摇动  
			Shake.prototype.devicemotion = function(e) {
				var current = e.accelerationIncludingGravity;
				var currentTime;
				var timeDifference;
				var deltaX = 0;
				var deltaY = 0;
				var deltaZ = 0;
				if((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
					this.lastX = current.x;
					this.lastY = current.y;
					this.lastZ = current.z;
					return;
				}
				deltaX = Math.abs(this.lastX - current.x);
				deltaY = Math.abs(this.lastY - current.y);
				deltaZ = Math.abs(this.lastZ - current.z);
				if(((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
					//计算上次触发摇动到现在的间隔时间  
					currentTime = new Date();
					timeDifference = currentTime.getTime() - this.lastTime.getTime();
					if(timeDifference > this.options.timeout) {
						window.dispatchEvent(this.event);
						this.lastTime = new Date();
					}
				}
				this.lastX = current.x;
				this.lastY = current.y;
				this.lastZ = current.z;
			};
			//事件处理  
			Shake.prototype.handleEvent = function(e) {
				if(typeof(this[e.type]) === 'function') {
					return this[e.type](e);
				}
			};
			return Shake;
		})
		);
		export{
			Shake
		}
		
