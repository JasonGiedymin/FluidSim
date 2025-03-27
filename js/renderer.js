"use strict";
var Renderer = function() {
    function e(e) { var r = [],
            t = [],
            i = function(e, r) { var t = .001; return Math.abs(e[0] - r[0]) < t && Math.abs(e[1] - r[1]) < t && Math.abs(e[2] - r[2]) < t },
            a = function(e) { Utilities.normalizeVector(e, e), r.push(e), t.push(e) },
            s = function(e, t) { var s = [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2, (e[2] + t[2]) / 2];
                Utilities.normalizeVector(s, s); for (var h = 0; h < r.length; ++h)
                    if (i(r[h], s)) return h; return a(s), r.length - 1 },
            h = (1 + Math.sqrt(5)) / 2;
        a([-1, h, 0]), a([1, h, 0]), a([-1, -h, 0]), a([1, -h, 0]), a([0, -1, h]), a([0, 1, h]), a([0, -1, -h]), a([0, 1, -h]), a([h, 0, -1]), a([h, 0, 1]), a([-h, 0, -1]), a([-h, 0, 1]); var u = [];
        u.push([0, 11, 5]), u.push([0, 5, 1]), u.push([0, 1, 7]), u.push([0, 7, 10]), u.push([0, 10, 11]), u.push([1, 5, 9]), u.push([5, 11, 4]), u.push([11, 10, 2]), u.push([10, 7, 6]), u.push([7, 1, 8]), u.push([3, 9, 4]), u.push([3, 4, 2]), u.push([3, 2, 6]), u.push([3, 6, 8]), u.push([3, 8, 9]), u.push([4, 9, 5]), u.push([2, 4, 11]), u.push([6, 2, 10]), u.push([8, 6, 7]), u.push([9, 8, 1]); for (var n = 0; n < e; ++n) { for (var o = [], n = 0; n < u.length; ++n) { var f = u[n],
                    l = s(r[f[0]], r[f[1]]),
                    T = s(r[f[1]], r[f[2]]),
                    E = s(r[f[2]], r[f[0]]);
                o.push([f[0], l, E]), o.push([f[1], T, l]), o.push([f[2], E, T]), o.push([l, T, E]) } u = o } for (var c = [], p = [], A = [], n = 0; n < r.length; ++n) c.push(r[n][0]), c.push(r[n][1]), c.push(r[n][2]), p.push(t[n][0]), p.push(t[n][1]), p.push(t[n][2]); for (var n = 0; n < u.length; ++n) { var f = u[n];
            A.push(f[0]), A.push(f[1]), A.push(f[2]) } return { vertices: c, normals: p, indices: A } }

    function r(r, a, s, h) { 
        this.canvas = r, 
        this.wgl = a, 
        this.particlesWidth = 0, 
        this.particlesHeight = 0, 
        this.sphereRadius = 0;
        
        // Check if OES_texture_float_linear is supported, otherwise fallback to NEAREST
        this.supportsTextureFloatLinear = !!a.getExtension("OES_texture_float_linear");
        this.floatTextureFilteringMode = this.supportsTextureFloatLinear ? a.LINEAR : a.NEAREST;
        
        this.wgl.getExtension("ANGLE_instanced_arrays"), 
        this.depthExt = this.wgl.getExtension("WEBGL_depth_texture"), 
        this.quadVertexBuffer = a.createBuffer(), 
        a.bufferData(this.quadVertexBuffer, a.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), a.STATIC_DRAW); 
        
        var u = this.sphereGeometry = e(3);
        this.sphereVertexBuffer = a.createBuffer(), a.bufferData(this.sphereVertexBuffer, a.ARRAY_BUFFER, new Float32Array(u.vertices), a.STATIC_DRAW), this.sphereNormalBuffer = a.createBuffer(), a.bufferData(this.sphereNormalBuffer, a.ARRAY_BUFFER, new Float32Array(u.normals), a.STATIC_DRAW), this.sphereIndexBuffer = a.createBuffer(), a.bufferData(this.sphereIndexBuffer, a.ELEMENT_ARRAY_BUFFER, new Uint16Array(u.indices), a.STATIC_DRAW), this.depthFramebuffer = a.createFramebuffer(), this.depthColorTexture = a.buildTexture(a.RGBA, a.UNSIGNED_BYTE, t, i, null, a.CLAMP_TO_EDGE, a.CLAMP_TO_EDGE, a.LINEAR, a.LINEAR), this.depthTexture = a.buildTexture(a.DEPTH_COMPONENT, a.UNSIGNED_SHORT, t, i, null, a.CLAMP_TO_EDGE, a.CLAMP_TO_EDGE, a.LINEAR, a.LINEAR), this.lightViewMatrix = new Float32Array(16); var n = [s[0] / 2, s[1] / 2, s[2] / 2];
        Utilities.makeLookAtMatrix(this.lightViewMatrix, n, [n[0], n[1] - 1, n[2]], [0, 0, 1]), this.lightProjectionMatrix = Utilities.makeOrthographicMatrix(new Float32Array(16), -s[0] / 2, s[0] / 2, -s[2] / 2, s[2] / 2, -s[1] / 2, s[1] / 2), this.lightProjectionViewMatrix = new Float32Array(16), Utilities.premultiplyMatrix(this.lightProjectionViewMatrix, this.lightViewMatrix, this.lightProjectionMatrix), this.particleVertexBuffer = a.createBuffer(), this.renderingFramebuffer = a.createFramebuffer(), this.renderingRenderbuffer = a.createRenderbuffer(), this.renderingTexture = a.createTexture(), this.occlusionTexture = a.createTexture(), this.compositingTexture = a.createTexture(), this.onResize(), a.createProgramsFromFiles(Env.rendererPrograms(), function(e) { for (var r in e) this[r] = e[r];
            h() }.bind(this)) 
    }

    var t = 256,
    i = 256;

    r.prototype.onResize = function(e) { 
        var wgl = this.wgl;
        wgl.renderbufferStorage(this.renderingRenderbuffer, wgl.RENDERBUFFER, wgl.DEPTH_COMPONENT16, this.canvas.width, this.canvas.height);
        
        // Use the appropriate filtering mode for float textures based on support
        wgl.rebuildTexture(this.renderingTexture, wgl.RGBA, wgl.FLOAT, this.canvas.width, this.canvas.height, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode);
        
        wgl.rebuildTexture(this.occlusionTexture, wgl.RGBA, wgl.UNSIGNED_BYTE, this.canvas.width, this.canvas.height, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.LINEAR, wgl.LINEAR);
        wgl.rebuildTexture(this.compositingTexture, wgl.RGBA, wgl.UNSIGNED_BYTE, this.canvas.width, this.canvas.height, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.LINEAR, wgl.LINEAR);
    };

    return r.prototype.reset = function(e, r, t) { this.particlesWidth = e, this.particlesHeight = r, this.sphereRadius = t; for (var i = (this.particlesWidth * this.particlesHeight, new Float32Array(this.particlesWidth * this.particlesHeight * 2)), a = 0; a < this.particlesHeight; ++a)
            for (var s = 0; s < this.particlesWidth; ++s) i[2 * (a * this.particlesWidth + s)] = (s + .5) / this.particlesWidth, i[2 * (a * this.particlesWidth + s) + 1] = (a + .5) / this.particlesHeight;
        wgl.bufferData(this.particleVertexBuffer, wgl.ARRAY_BUFFER, i, wgl.STATIC_DRAW) }, r.prototype.draw = function(e, r, a) { var s = this.wgl;
        Utilities.premultiplyMatrix(new Float32Array(16), a, r);
        s.framebufferTexture2D(this.renderingFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.renderingTexture, 0), s.framebufferRenderbuffer(this.renderingFramebuffer, s.FRAMEBUFFER, s.DEPTH_ATTACHMENT, s.RENDERBUFFER, this.renderingRenderbuffer), s.clear(s.createClearState()
            .bindFramebuffer(this.renderingFramebuffer)
            .clearColor(-99999, -99999, -99999, -99999), s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT); var h = s.createDrawState()
            .bindFramebuffer(this.renderingFramebuffer)
            .viewport(0, 0, this.canvas.width, this.canvas.height)
            .enable(s.DEPTH_TEST)
            .enable(s.CULL_FACE)
            .useProgram(this.sphereProgram)
            .vertexAttribPointer(this.sphereVertexBuffer, this.sphereProgram.getAttribLocation("a_vertexPosition"), 3, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribPointer(this.sphereNormalBuffer, this.sphereProgram.getAttribLocation("a_vertexNormal"), 3, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribPointer(this.particleVertexBuffer, this.sphereProgram.getAttribLocation("a_textureCoordinates"), 2, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribDivisorANGLE(this.sphereProgram.getAttribLocation("a_textureCoordinates"), 1)
            .bindIndexBuffer(this.sphereIndexBuffer)
            .uniformMatrix4fv("u_projectionMatrix", !1, r)
            .uniformMatrix4fv("u_viewMatrix", !1, a)
            .uniformTexture("u_positionsTexture", 0, s.TEXTURE_2D, e.particlePositionTexture)
            .uniformTexture("u_velocitiesTexture", 1, s.TEXTURE_2D, e.particleVelocityTexture)
            .uniform1f("u_sphereRadius", this.sphereRadius);
        s.drawElementsInstancedANGLE(h, s.TRIANGLES, this.sphereGeometry.indices.length, s.UNSIGNED_SHORT, 0, this.particlesWidth * this.particlesHeight), s.framebufferTexture2D(this.renderingFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.occlusionTexture, 0), s.clear(s.createClearState()
            .bindFramebuffer(this.renderingFramebuffer)
            .clearColor(0, 0, 0, 0), s.COLOR_BUFFER_BIT); var u = 2 * Math.atan(1 / r[5]),
            n = s.createDrawState()
            .bindFramebuffer(this.renderingFramebuffer)
            .viewport(0, 0, this.canvas.width, this.canvas.height)
            .enable(s.DEPTH_TEST)
            .depthMask(!1)
            .enable(s.CULL_FACE)
            .enable(s.BLEND)
            .blendEquation(s.FUNC_ADD)
            .blendFuncSeparate(s.ONE, s.ONE, s.ONE, s.ONE)
            .useProgram(this.sphereAOProgram)
            .vertexAttribPointer(this.sphereVertexBuffer, this.sphereAOProgram.getAttribLocation("a_vertexPosition"), 3, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribPointer(this.particleVertexBuffer, this.sphereAOProgram.getAttribLocation("a_textureCoordinates"), 2, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribDivisorANGLE(this.sphereAOProgram.getAttribLocation("a_textureCoordinates"), 1)
            .bindIndexBuffer(this.sphereIndexBuffer)
            .uniformMatrix4fv("u_projectionMatrix", !1, r)
            .uniformMatrix4fv("u_viewMatrix", !1, a)
            .uniformTexture("u_positionsTexture", 0, s.TEXTURE_2D, e.particlePositionTexture)
            .uniformTexture("u_velocitiesTexture", 1, s.TEXTURE_2D, e.particleVelocityTexture)
            .uniformTexture("u_renderingTexture", 2, s.TEXTURE_2D, this.renderingTexture)
            .uniform2f("u_resolution", this.canvas.width, this.canvas.height)
            .uniform1f("u_fov", u)
            .uniform1f("u_sphereRadius", this.sphereRadius);
        s.drawElementsInstancedANGLE(n, s.TRIANGLES, this.sphereGeometry.indices.length, s.UNSIGNED_SHORT, 0, this.particlesWidth * this.particlesHeight), s.framebufferTexture2D(this.depthFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.depthColorTexture, 0), s.framebufferTexture2D(this.depthFramebuffer, s.FRAMEBUFFER, s.DEPTH_ATTACHMENT, s.TEXTURE_2D, this.depthTexture, 0), s.clear(s.createClearState()
            .bindFramebuffer(this.depthFramebuffer)
            .clearColor(0, 0, 0, 0), s.DEPTH_BUFFER_BIT); var o = s.createDrawState()
            .bindFramebuffer(this.depthFramebuffer)
            .viewport(0, 0, t, i)
            .enable(s.DEPTH_TEST)
            .depthMask(!0)
            .enable(s.SCISSOR_TEST)
            .scissor(1, 1, t - 2, i - 2)
            .colorMask(!1, !1, !1, !1)
            .enable(s.CULL_FACE)
            .useProgram(this.sphereDepthProgram)
            .vertexAttribPointer(this.sphereVertexBuffer, this.sphereDepthProgram.getAttribLocation("a_vertexPosition"), 3, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribPointer(this.particleVertexBuffer, this.sphereDepthProgram.getAttribLocation("a_textureCoordinates"), 2, s.FLOAT, s.FALSE, 0, 0)
            .vertexAttribDivisorANGLE(this.sphereDepthProgram.getAttribLocation("a_textureCoordinates"), 1)
            .bindIndexBuffer(this.sphereIndexBuffer)
            .uniformMatrix4fv("u_projectionViewMatrix", !1, this.lightProjectionViewMatrix)
            .uniformTexture("u_positionsTexture", 0, s.TEXTURE_2D, e.particlePositionTexture)
            .uniformTexture("u_velocitiesTexture", 1, s.TEXTURE_2D, e.particleVelocityTexture)
            .uniform1f("u_sphereRadius", this.sphereRadius);
        s.drawElementsInstancedANGLE(o, s.TRIANGLES, this.sphereGeometry.indices.length, s.UNSIGNED_SHORT, 0, this.particlesWidth * this.particlesHeight); var f = Utilities.invertMatrix(new Float32Array(16), a);
        s.framebufferTexture2D(this.renderingFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.compositingTexture, 0), s.clear(s.createClearState()
            .bindFramebuffer(this.renderingFramebuffer)
            .clearColor(0, 0, 0, 0), s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT); var l = s.createDrawState()
            .bindFramebuffer(this.renderingFramebuffer)
            .viewport(0, 0, this.canvas.width, this.canvas.height)
            .useProgram(this["compositeProgram" + Env.valuePresets.theme[Env.globalSettings.theme].selection])
            .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
            .uniformTexture("u_renderingTexture", 0, s.TEXTURE_2D, this.renderingTexture)
            .uniformTexture("u_occlusionTexture", 1, s.TEXTURE_2D, this.occlusionTexture)
            .uniform2f("u_resolution", this.canvas.width, this.canvas.height)
            .uniform1f("u_fov", u)
            .uniformMatrix4fv("u_inverseViewMatrix", !1, f)
            .uniformTexture("u_shadowDepthTexture", 2, s.TEXTURE_2D, this.depthTexture)
            .uniform2f("u_shadowResolution", t, i)
            .uniformMatrix4fv("u_lightProjectionViewMatrix", !1, this.lightProjectionViewMatrix);
        s.drawArrays(l, s.TRIANGLE_STRIP, 0, 4); var f = Utilities.invertMatrix(new Float32Array(16), a);
        s.clear(s.createClearState()
            .bindFramebuffer(null)
            .clearColor(0, 0, 0, 0), s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT); var T = s.createDrawState()
            .bindFramebuffer(null)
            .viewport(0, 0, this.canvas.width, this.canvas.height)
            .useProgram(this.fxaaProgram)
            .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
            .uniformTexture("u_input", 0, s.TEXTURE_2D, this.compositingTexture)
            .uniform2f("u_resolution", this.canvas.width, this.canvas.height);
        s.drawArrays(T, s.TRIANGLE_STRIP, 0, 4) }, r;
}();
