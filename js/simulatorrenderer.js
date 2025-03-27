"use strict";
var SimulatorRenderer = function() {
    function t(t, i, e, s, a, o) {
        function n() { this.mouseX = 0, this.mouseY = 0, this.lastMousePlaneX = 0, this.lastMousePlaneY = 0, setTimeout(o, 1) } this.canvas = t, this.wgl = i, this.projectionMatrix = e, this.camera = s;
        
        // Get required extensions
        i.getExtension("OES_texture_float");
        
        // Check if OES_texture_float_linear is supported, otherwise fallback to NEAREST
        this.supportsTextureFloatLinear = !!i.getExtension("OES_texture_float_linear");
        
        // Indicate whether we need to use NEAREST or LINEAR for float textures
        this.floatTextureFilteringMode = this.supportsTextureFloatLinear ? i.LINEAR : i.NEAREST;
        
        if (!this.supportsTextureFloatLinear) {
            console.log("OES_texture_float_linear not supported, using NEAREST filtering");
        }
        
        var r = !1,
            h = !1;
        this.renderer = new Renderer(this.canvas, this.wgl, a, function() { r = !0, r && h && n.call(this) }.bind(this)), this.simulator = new Simulator(this.wgl, function() { h = !0, r && h && n.call(this) }.bind(this), this.floatTextureFilteringMode) } return t.prototype.onMouseMove = function(t) { var i = Utilities.getMousePosition(t, this.canvas),
            e = i.x / this.canvas.width,
            s = i.y / this.canvas.height;
        this.mouseX = 2 * e - 1, this.mouseY = 2 * (1 - s) - 1, this.camera.onMouseMove(t) }, t.prototype.onMouseDown = function(t) { this.camera.onMouseDown(t) }, t.prototype.onMouseUp = function(t) { this.camera.onMouseUp(t) }, t.prototype.reset = function(t, i, e, s, a, o, n) { this.simulator.reset(t, i, e, s, a, o), this.renderer.reset(t, i, n) }, t.prototype.update = function(t) { var i = 2 * Math.atan(1 / this.projectionMatrix[5]),
            e = [this.mouseX * Math.tan(i / 2) * (this.canvas.width / this.canvas.height), this.mouseY * Math.tan(i / 2), -1],
            s = e[0] * this.camera.distance,
            a = e[1] * this.camera.distance,
            o = s - this.lastMousePlaneX,
            n = a - this.lastMousePlaneY;
        this.camera.isMouseDown() && (o = 0, n = 0), this.lastMousePlaneX = s, this.lastMousePlaneY = a; var r = Utilities.invertMatrix([], this.camera.getViewMatrix()),
            h = Utilities.transformDirectionByMatrix([], e, r);
        Utilities.normalizeVector(h, h); for (var u = this.camera.getViewMatrix(), c = [u[0], u[4], u[8]], l = [u[1], u[5], u[9]], m = [], M = 0; M < 3; ++M) m[M] = o * c[M] + n * l[M];
        this.simulator.simulate(t, m, this.camera.getPosition(), h), this.renderer.draw(this.simulator, this.projectionMatrix, this.camera.getViewMatrix()) }, t.prototype.onResize = function(t) { this.renderer.onResize(t) }, t }();
