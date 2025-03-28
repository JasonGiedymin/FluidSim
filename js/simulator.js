"use strict";
var Simulator = function() {
    function e(e, t, floatTextureFilteringMode) { this.wgl = e, this.particlesWidth = 0, this.particlesHeight = 0, this.gridWidth = 0, this.gridHeight = 0, this.gridDepth = 0, this.gridResolutionX = 0, this.gridResolutionY = 0, this.gridResolutionZ = 0, this.particleDensity = 0, this.velocityTextureWidth = 0, this.velocityTextureHeight = 0, this.scalarTextureWidth = 0, this.scalarTextureHeight = 0, this.floatTextureFilteringMode = floatTextureFilteringMode || e.NEAREST, this.halfFloatExt = this.wgl.getExtension("OES_texture_half_float"), this.wgl.getExtension("OES_texture_half_float_linear"), this.simulationNumberType = this.halfFloatExt.HALF_FLOAT_OES, this.flipness = .99, this.frameNumber = 0, this.quadVertexBuffer = e.createBuffer(), e.bufferData(this.quadVertexBuffer, e.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), e.STATIC_DRAW), this.simulationFramebuffer = e.createFramebuffer(), this.particleVertexBuffer = e.createBuffer(), this.particlePositionTexture = e.createTexture(), this.particlePositionTextureTemp = e.createTexture(), this.particleVelocityTexture = e.createTexture(), this.particleVelocityTextureTemp = e.createTexture(), this.particleRandomTexture = e.createTexture(), this.velocityTexture = e.createTexture(), this.tempVelocityTexture = e.createTexture(), this.originalVelocityTexture = e.createTexture(), this.weightTexture = e.createTexture(), this.markerTexture = e.createTexture(), this.divergenceTexture = e.createTexture(), this.pressureTexture = e.createTexture(), this.tempSimulationTexture = e.createTexture(), e.createProgramsFromFiles(Env.simulatorPrograms(), function(e) { for (var i in e) this[i] = e[i];
            t() }.bind(this)) }

    function t(e, t, i) { var r = e[t];
        e[t] = e[i], e[i] = r } return e.prototype.reset = function(e, t, i, r, u, s) { this.particlesWidth = e, this.particlesHeight = t, this.gridWidth = r[0], this.gridHeight = r[1], this.gridDepth = r[2], this.gridResolutionX = u[0], this.gridResolutionY = u[1], this.gridResolutionZ = u[2], this.particleDensity = s, this.velocityTextureWidth = (this.gridResolutionX + 1) * (this.gridResolutionZ + 1), this.velocityTextureHeight = this.gridResolutionY + 1, this.scalarTextureWidth = this.gridResolutionX * this.gridResolutionZ, this.scalarTextureHeight = this.gridResolutionY; for (var a = (this.particlesWidth * this.particlesHeight, new Float32Array(this.particlesWidth * this.particlesHeight * 2)), l = 0; l < this.particlesHeight; ++l)
            for (var o = 0; o < this.particlesWidth; ++o) a[2 * (l * this.particlesWidth + o)] = (o + .5) / this.particlesWidth, a[2 * (l * this.particlesWidth + o) + 1] = (l + .5) / this.particlesHeight;
        wgl.bufferData(this.particleVertexBuffer, wgl.ARRAY_BUFFER, a, wgl.STATIC_DRAW); for (var h = new Float32Array(this.particlesWidth * this.particlesHeight * 4), T = new Float32Array(this.particlesWidth * this.particlesHeight * 4), f = 0; f < this.particlesWidth * this.particlesHeight; ++f) { h[4 * f] = i[f][0], h[4 * f + 1] = i[f][1], h[4 * f + 2] = i[f][2], h[4 * f + 3] = 0; var n = 2 * Math.random() * Math.PI,
                g = 2 * Math.random() - 1;
            T[4 * f] = Math.sqrt(1 - g * g) * Math.cos(n), T[4 * f + 1] = Math.sqrt(1 - g * g) * Math.sin(n), T[4 * f + 2] = g, T[4 * f + 3] = 0 } wgl.rebuildTexture(this.particlePositionTexture, wgl.RGBA, wgl.FLOAT, this.particlesWidth, this.particlesHeight, h, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.NEAREST, wgl.NEAREST), wgl.rebuildTexture(this.particlePositionTextureTemp, wgl.RGBA, wgl.FLOAT, this.particlesWidth, this.particlesHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.NEAREST, wgl.NEAREST), wgl.rebuildTexture(this.particleVelocityTexture, wgl.RGBA, this.simulationNumberType, this.particlesWidth, this.particlesHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.NEAREST, wgl.NEAREST), wgl.rebuildTexture(this.particleVelocityTextureTemp, wgl.RGBA, this.simulationNumberType, this.particlesWidth, this.particlesHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.NEAREST, wgl.NEAREST), wgl.rebuildTexture(this.particleRandomTexture, wgl.RGBA, wgl.FLOAT, this.particlesWidth, this.particlesHeight, T, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.NEAREST, wgl.NEAREST), wgl.rebuildTexture(this.velocityTexture, wgl.RGBA, this.simulationNumberType, this.velocityTextureWidth, this.velocityTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode), wgl.rebuildTexture(this.tempVelocityTexture, wgl.RGBA, this.simulationNumberType, this.velocityTextureWidth, this.velocityTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode), wgl.rebuildTexture(this.originalVelocityTexture, wgl.RGBA, this.simulationNumberType, this.velocityTextureWidth, this.velocityTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode), wgl.rebuildTexture(this.weightTexture, wgl.RGBA, this.simulationNumberType, this.velocityTextureWidth, this.velocityTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode), wgl.rebuildTexture(this.markerTexture, wgl.RGBA, wgl.UNSIGNED_BYTE, this.scalarTextureWidth, this.scalarTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, wgl.LINEAR, wgl.LINEAR), wgl.rebuildTexture(this.divergenceTexture, wgl.RGBA, this.simulationNumberType, this.scalarTextureWidth, this.scalarTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode), wgl.rebuildTexture(this.pressureTexture, wgl.RGBA, this.simulationNumberType, this.scalarTextureWidth, this.scalarTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode), wgl.rebuildTexture(this.tempSimulationTexture, wgl.RGBA, this.simulationNumberType, this.scalarTextureWidth, this.scalarTextureHeight, null, wgl.CLAMP_TO_EDGE, wgl.CLAMP_TO_EDGE, this.floatTextureFilteringMode, this.floatTextureFilteringMode) }, e.prototype.simulate = function(e, i, r, u) { if (0 !== e) { this.frameNumber += 1; var s = this.wgl,
                a = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.velocityTextureWidth, this.velocityTextureHeight)
                .vertexAttribPointer(this.particleVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.transferToGridProgram)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniform3f("u_gridSize", this.gridWidth, this.gridHeight, this.gridDepth)
                .uniformTexture("u_positionTexture", 0, s.TEXTURE_2D, this.particlePositionTexture)
                .uniformTexture("u_velocityTexture", 1, s.TEXTURE_2D, this.particleVelocityTexture)
                .enable(s.BLEND)
                .blendEquation(s.FUNC_ADD)
                .blendFuncSeparate(s.ONE, s.ONE, s.ONE, s.ONE);
            s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.weightTexture, 0), s.clear(s.createClearState()
                .bindFramebuffer(this.simulationFramebuffer)
                .clearColor(0, 0, 0, 0), s.COLOR_BUFFER_BIT), a.uniform1i("u_accumulate", 0); for (var l = 5, o = -(l - 1) / 2; o <= (l - 1) / 2; ++o) a.uniform1f("u_zOffset", o), s.drawArrays(a, s.POINTS, 0, this.particlesWidth * this.particlesHeight);
            s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tempVelocityTexture, 0), s.clear(s.createClearState()
                .bindFramebuffer(this.simulationFramebuffer), s.COLOR_BUFFER_BIT), a.uniform1i("u_accumulate", 1); for (var o = -(l - 1) / 2; o <= (l - 1) / 2; ++o) a.uniform1f("u_zOffset", o), s.drawArrays(a, s.POINTS, 0, this.particlesWidth * this.particlesHeight);
            s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.velocityTexture, 0); var h = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.velocityTextureWidth, this.velocityTextureHeight)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.normalizeGridProgram)
                .uniformTexture("u_weightTexture", 0, s.TEXTURE_2D, this.weightTexture)
                .uniformTexture("u_accumulatedVelocityTexture", 1, s.TEXTURE_2D, this.tempVelocityTexture);
            s.drawArrays(h, s.TRIANGLE_STRIP, 0, 4), s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.markerTexture, 0), s.clear(s.createClearState()
                .bindFramebuffer(this.simulationFramebuffer), s.COLOR_BUFFER_BIT); var T = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.scalarTextureWidth, this.scalarTextureHeight)
                .vertexAttribPointer(this.particleVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.markProgram)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniform3f("u_gridSize", this.gridWidth, this.gridHeight, this.gridDepth)
                .uniformTexture("u_positionTexture", 0, s.TEXTURE_2D, this.particlePositionTexture)
                .uniform1f("pointSize", Env.valuePresets.pressure[Env.globalSettings.pressure].pointSize)
                .uniform1f("positionX", Env.valuePresets.temp[Env.globalSettings.temp].positionX)
                .uniform1f("positionY", Env.valuePresets.temp[Env.globalSettings.temp].positionY);
            s.drawArrays(T, s.POINTS, 0, this.particlesWidth * this.particlesHeight), s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.originalVelocityTexture, 0); var f = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.velocityTextureWidth, this.velocityTextureHeight)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.copyProgram)
                .uniformTexture("u_texture", 0, s.TEXTURE_2D, this.velocityTexture);
            s.drawArrays(f, s.TRIANGLE_STRIP, 0, 4), s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tempVelocityTexture, 0); var n = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.velocityTextureWidth, this.velocityTextureHeight)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.addForceProgram)
                .uniformTexture("u_velocityTexture", 0, s.TEXTURE_2D, this.velocityTexture)
                .uniform1f("u_timeStep", e)
                .uniform3f("u_mouseVelocity", i[0], i[1], i[2])
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniform3f("u_gridSize", this.gridWidth, this.gridHeight, this.gridDepth)
                .uniform3f("u_mouseRayOrigin", r[0], r[1], r[2])
                .uniform3f("u_mouseRayDirection", u[0], u[1], u[2])
                .uniform1f("velocityZ", Env.valuePresets.viscosity[Env.globalSettings.viscosity].velocityZ)
                .uniform1f("velocityW", Env.valuePresets.viscosity[Env.globalSettings.viscosity].velocityW);
            s.drawArrays(n, s.TRIANGLE_STRIP, 0, 4), t(this, "velocityTexture", "tempVelocityTexture"), s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tempVelocityTexture, 0); var g = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.velocityTextureWidth, this.velocityTextureHeight)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.enforceBoundariesProgram)
                .uniformTexture("u_velocityTexture", 0, s.TEXTURE_2D, this.velocityTexture)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ);
            s.drawArrays(g, s.TRIANGLE_STRIP, 0, 4), t(this, "velocityTexture", "tempVelocityTexture"); var m = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.scalarTextureWidth, this.scalarTextureHeight)
                .useProgram(this.divergenceProgram)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniformTexture("u_velocityTexture", 0, s.TEXTURE_2D, this.velocityTexture)
                .uniformTexture("u_markerTexture", 1, s.TEXTURE_2D, this.markerTexture)
                .uniformTexture("u_weightTexture", 2, s.TEXTURE_2D, this.weightTexture)
                .uniform1f("u_maxDensity", this.particleDensity)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, !1, 0, 0);
            s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.divergenceTexture, 0), s.clear(s.createClearState()
                .bindFramebuffer(this.simulationFramebuffer), s.COLOR_BUFFER_BIT), s.drawArrays(m, s.TRIANGLE_STRIP, 0, 4); var E = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.scalarTextureWidth, this.scalarTextureHeight)
                .useProgram(this.jacobiProgram)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniformTexture("u_divergenceTexture", 1, s.TEXTURE_2D, this.divergenceTexture)
                .uniformTexture("u_markerTexture", 2, s.TEXTURE_2D, this.markerTexture)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, !1, 0, 0);
            s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.pressureTexture, 0), s.clear(s.createClearState()
                .bindFramebuffer(this.simulationFramebuffer), s.COLOR_BUFFER_BIT); for (var c = 50, x = 0; x < c; ++x) s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tempSimulationTexture, 0), E.uniformTexture("u_pressureTexture", 0, s.TEXTURE_2D, this.pressureTexture), s.drawArrays(E, s.TRIANGLE_STRIP, 0, 4), t(this, "pressureTexture", "tempSimulationTexture");
            s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tempVelocityTexture, 0); var R = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.velocityTextureWidth, this.velocityTextureHeight)
                .useProgram(this.subtractProgram)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniformTexture("u_pressureTexture", 0, s.TEXTURE_2D, this.pressureTexture)
                .uniformTexture("u_velocityTexture", 1, s.TEXTURE_2D, this.velocityTexture)
                .uniformTexture("u_markerTexture", 2, s.TEXTURE_2D, this.markerTexture)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, !1, 0, 0);
            s.drawArrays(R, s.TRIANGLE_STRIP, 0, 4), t(this, "velocityTexture", "tempVelocityTexture"), s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.particleVelocityTextureTemp, 0); var d = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.particlesWidth, this.particlesHeight)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.transferToParticlesProgram)
                .uniformTexture("u_particlePositionTexture", 0, s.TEXTURE_2D, this.particlePositionTexture)
                .uniformTexture("u_particleVelocityTexture", 1, s.TEXTURE_2D, this.particleVelocityTexture)
                .uniformTexture("u_gridVelocityTexture", 2, s.TEXTURE_2D, this.velocityTexture)
                .uniformTexture("u_originalGridVelocityTexture", 3, s.TEXTURE_2D, this.originalVelocityTexture)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniform3f("u_gridSize", this.gridWidth, this.gridHeight, this.gridDepth)
                .uniform1f("u_flipness", this.flipness);
            s.drawArrays(d, s.TRIANGLE_STRIP, 0, 4), t(this, "particleVelocityTextureTemp", "particleVelocityTexture"), s.framebufferTexture2D(this.simulationFramebuffer, s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.particlePositionTextureTemp, 0), s.clear(s.createClearState()
                .bindFramebuffer(this.simulationFramebuffer), s.COLOR_BUFFER_BIT); var _ = s.createDrawState()
                .bindFramebuffer(this.simulationFramebuffer)
                .viewport(0, 0, this.particlesWidth, this.particlesHeight)
                .vertexAttribPointer(this.quadVertexBuffer, 0, 2, s.FLOAT, s.FALSE, 0, 0)
                .useProgram(this.advectProgram)
                .uniformTexture("u_positionsTexture", 0, s.TEXTURE_2D, this.particlePositionTexture)
                .uniformTexture("u_randomsTexture", 1, s.TEXTURE_2D, this.particleRandomTexture)
                .uniformTexture("u_velocityGrid", 2, s.TEXTURE_2D, this.velocityTexture)
                .uniform3f("u_gridResolution", this.gridResolutionX, this.gridResolutionY, this.gridResolutionZ)
                .uniform3f("u_gridSize", this.gridWidth, this.gridHeight, this.gridDepth)
                .uniform1f("u_timeStep", e)
                .uniform1f("u_frameNumber", this.frameNumber)
                .uniform2f("u_particlesResolution", this.particlesWidth, this.particlesHeight);
            s.drawArrays(_, s.TRIANGLE_STRIP, 0, 4), t(this, "particlePositionTextureTemp", "particlePositionTexture") } }, e }();
