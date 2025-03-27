"use strict";
var Camera = function() {
    function t(t, i) { this.element = t, this.distance = 40, this.orbitPoint = i, this.azimuth = 0, this.elevation = .25, this.minElevation = -Math.PI / 4, this.maxElevation = Math.PI / 4, this.currentMouseX = 0, this.currentMouseY = 0, this.lastMouseX = 0, this.lastMouseY = 0, this.mouseDown = !1, this.viewMatrix = new Float32Array(16), this.recomputeViewMatrix(), t.addEventListener("wheel", function(t) { var i = t.deltaY;
            this.distance += 2 * (i > 0 ? 1 : -1), this.distance < e && (this.distance = e), this.distance > s && (this.distance = s), this.recomputeViewMatrix() }.bind(this)) } var i = .005,
        e = 25,
        s = 60; return t.prototype.recomputeViewMatrix = function() { var t = new Float32Array(16),
            i = new Float32Array(16),
            e = Utilities.makeIdentityMatrix(new Float32Array(16)),
            s = Utilities.makeIdentityMatrix(new Float32Array(16));
        Utilities.makeIdentityMatrix(this.viewMatrix), Utilities.makeXRotationMatrix(t, this.elevation), Utilities.makeYRotationMatrix(i, this.azimuth), e[14] = -this.distance, s[12] = -this.orbitPoint[0], s[13] = -this.orbitPoint[1], s[14] = -this.orbitPoint[2], Utilities.premultiplyMatrix(this.viewMatrix, this.viewMatrix, s), Utilities.premultiplyMatrix(this.viewMatrix, this.viewMatrix, i), Utilities.premultiplyMatrix(this.viewMatrix, this.viewMatrix, t), Utilities.premultiplyMatrix(this.viewMatrix, this.viewMatrix, e) }, t.prototype.getPosition = function() { var t = [this.distance * Math.sin(Math.PI / 2 - this.elevation) * Math.sin(-this.azimuth) + this.orbitPoint[0], this.distance * Math.cos(Math.PI / 2 - this.elevation) + this.orbitPoint[1], this.distance * Math.sin(Math.PI / 2 - this.elevation) * Math.cos(-this.azimuth) + this.orbitPoint[2]]; return t }, t.prototype.isMouseDown = function() { return this.mouseDown }, t.prototype.getViewMatrix = function() { return this.viewMatrix }, t.prototype.setBounds = function(t, i) { this.minElevation = t, this.maxElevation = i, this.elevation > this.maxElevation && (this.elevation = this.maxElevation), this.elevation < this.minElevation && (this.elevation = this.minElevation), this.recomputeViewMatrix() }, t.prototype.onMouseDown = function(t) { t.preventDefault(); var i = Utilities.getMousePosition(t, this.element)
            .x,
            e = Utilities.getMousePosition(t, this.element)
            .y;
        this.mouseDown = !0, this.lastMouseX = i, this.lastMouseY = e }, t.prototype.onMouseUp = function(t) { t.preventDefault(), this.mouseDown = !1 }, t.prototype.onMouseMove = function(t) { t.preventDefault(); var e = Utilities.getMousePosition(t, this.element)
            .x,
            s = Utilities.getMousePosition(t, this.element)
            .y; if (this.mouseDown) { this.currentMouseX = e, this.currentMouseY = s; var o = (this.currentMouseX - this.lastMouseX) * i,
                a = (this.currentMouseY - this.lastMouseY) * i;
            this.azimuth += o, this.elevation += a, this.elevation > this.maxElevation && (this.elevation = this.maxElevation), this.elevation < this.minElevation && (this.elevation = this.minElevation), this.recomputeViewMatrix(), this.lastMouseX = this.currentMouseX, this.lastMouseY = this.currentMouseY } }, t }();
