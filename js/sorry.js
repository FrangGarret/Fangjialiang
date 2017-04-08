function closeWebPage(){  
 if (navigator.userAgent.indexOf("MSIE") > 0) {//close IE  
  if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {  
   window.opener = null;  
   window.close();  
  } else {  
   window.open('', '_top');  
   window.top.close();  
  }  
 }  
 else if (navigator.userAgent.indexOf("Firefox") > 0) {//close firefox  
  window.location.href = 'about:blank ';  
 } else {//close chrome;It is effective when it is only one.  
  window.opener = null;  
  window.open('', '_self');  
  window.close();  
 }  
}  
(function () {
	'use strict';
	var devtools = {
		open: false,
		orientation: null
	};
	var threshold = 160;
	var emitEvent = function (state, orientation) {
		window.dispatchEvent(new CustomEvent('devtoolschange', {
			detail: {
				open: state,
				orientation: orientation
			}
		}));
	};

	setInterval(function () {
		var widthThreshold = window.outerWidth - window.innerWidth > threshold;
		var heightThreshold = window.outerHeight - window.innerHeight > threshold;
		var orientation = widthThreshold ? 'vertical' : 'horizontal';

		if (!(heightThreshold && widthThreshold) &&
      ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
      		//closeWebPage();
			window.location.href="sorry.html"
			if (!devtools.open || devtools.orientation !== orientation) {
				emitEvent(true, orientation);
			}

			devtools.open = true;
			devtools.orientation = orientation;
		} else {
			//window.location.href="sorry.html"
			if (devtools.open) {
				emitEvent(false, null);
				
			}

			devtools.open = false;
			devtools.orientation = null;
		}
	}, 0);

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = devtools;
	} else {
		window.devtools = devtools;
	}
})();
