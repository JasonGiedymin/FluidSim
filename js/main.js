"use strict";
var Main = function() {
    function e(e) {
        if (0 === e.length) return "";
        if (1 === e.length) return "'" + e[0] + "'";
        for (var t = "", n = 0; n < e.length; ++n) {
            t += "'" + e[n] + "'";
            n < e.length - 1 && (t += n < e.length - 2 ? ", " : " and ");
        }
        return t;
    }

    function t() {
        return function() {
            // Initialize the canvas from template
            document.getElementById("placeholder").outerHTML = document.getElementById("main").innerHTML;
            
            // Add device pixel ratio handling
            const canvas = document.getElementById('canvas');
            const pixelRatio = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * pixelRatio;
            canvas.height = rect.height * pixelRatio;
            
            // Initialize the simulation
            r = new FluidParticles();
            
            // Initialize our slideout controls
            initializeControls();
        }
    }

    function n() {
        return function(t, n) {
            document.getElementById("placeholder").outerHTML = document.getElementById("no-support").innerHTML;
            t ? document.getElementById("error").textContent = "Unfortunately, your browser does not support the " + e(n) + " WebGL extension" + (n.length > 1 ? "s." : ".") :
                document.getElementById("error").textContent = "Unfortunately, your browser does not support WebGL";
        }
    }

    function initializeControls() {
        const controls = document.getElementById('controls');
        const toggleButton = document.getElementById('toggleControls');
        
        if (controls && toggleButton) {
            // Initialize toggle button functionality
            toggleButton.addEventListener('click', function() {
                controls.classList.toggle('visible');
                toggleButton.textContent = controls.classList.contains('visible') ? '×' : '☰';
            });

            // Close panel when clicking outside
            document.addEventListener('click', function(e) {
                if (!controls.contains(e.target) && !toggleButton.contains(e.target)) {
                    controls.classList.remove('visible');
                    toggleButton.textContent = '☰';
                }
            });
        }
    }

    var r = null;

    // Split extensions into required and optional groups
    var requiredExtensions = ["ANGLE_instanced_arrays", "WEBGL_depth_texture", "OES_texture_float"];
    var optionalExtensions = ["OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear"];
    
    // Check for required extensions first
    WrappedGL.checkWebGLSupportWithExtensions(
        requiredExtensions,
        function() {
            // All required extensions are supported, now check optional ones and log
            var canvas = document.createElement('canvas');
            var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            // Check which optional extensions are supported
            var missingOptionalExtensions = [];
            for (var i = 0; i < optionalExtensions.length; i++) {
                var ext = gl.getExtension(optionalExtensions[i]);
                if (!ext) {
                    missingOptionalExtensions.push(optionalExtensions[i]);
                    console.warn("Optional WebGL extension not supported: " + optionalExtensions[i]);
                }
            }
            
            // Continue with app initialization regardless of optional extensions
            t()();
        },
        n()
    );
    
    Conf.DEBUG_MODE && console.log("DEBUG_MODE: ON");

    return { fluidBox: r }
}();
