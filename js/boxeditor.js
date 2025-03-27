"use strict";
var BoxEditor = function() {
    function t(t, i) { this.min = [t[0], t[1], t[2]], this.max = [i[0], i[1], i[2]] }

    function i(t, i) { return t.min[0] < i.max[0] && t.max[0] > i.min[0] && t.min[1] < i.max[1] && t.max[1] > i.min[1] && t.min[2] < i.max[2] && t.max[2] > i.min[2] }

    function e(t, i, e) { for (var r = -(1 / 0), a = 1 / 0, n = 0, s = 0; s < 3; ++s) { var o = (e.min[s] - t[s]) / i[s],
                h = (e.max[s] - t[s]) / i[s]; if (o > h) { var c = o;
                o = h, h = c } if (h < r || o > a) return null;
            o > r && (r = o, n = s), h < a && (a = h) } if (r > a) return null; for (var m = [], s = 0; s < 3; ++s) m[s] = t[s] + i[s] * r; return { aabb: e, t: r, axis: n, side: i[n] > 0 ? -1 : 1, point: m } }

    function r(t, i, e, r) { var a = Utilities.subtractVectors([], t, e),
            n = Utilities.dotVectors(i, i),
            s = Utilities.dotVectors(i, r),
            o = Utilities.dotVectors(r, r),
            h = Utilities.dotVectors(i, a),
            c = Utilities.dotVectors(r, a),
            m = (s * c - o * h) / (n * o - s * s),
            u = (n * c - s * h) / (n * o - s * s); return [Utilities.addVectors([], t, Utilities.multiplyVectorByScalar([], i, m)), Utilities.addVectors([], e, Utilities.multiplyVectorByScalar([], r, u))] }

    function a(t, i, e, r, a, n, s) { this.canvas = t, this.wgl = i, this.gridWidth = a[0], this.gridHeight = a[1], this.gridDepth = a[2], this.gridDimensions = [this.gridWidth, this.gridHeight, this.gridDepth], this.projectionMatrix = e, this.camera = r, this.onChange = s, this.cubeVertexBuffer = i.createBuffer(), i.bufferData(this.cubeVertexBuffer, i.ARRAY_BUFFER, new Float32Array([0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0]), i.STATIC_DRAW), this.cubeIndexBuffer = i.createBuffer(), i.bufferData(this.cubeIndexBuffer, i.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23]), i.STATIC_DRAW), this.cubeWireframeVertexBuffer = i.createBuffer(), i.bufferData(this.cubeWireframeVertexBuffer, i.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1]), i.STATIC_DRAW), this.cubeWireframeIndexBuffer = i.createBuffer(), i.bufferData(this.cubeWireframeIndexBuffer, i.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]), i.STATIC_DRAW), this.gridVertexBuffers = []; for (var o = 0; o < 3; ++o) { this.gridVertexBuffers[o] = i.createBuffer(); var h, c = [];
            0 === o ? h = [[0, 0, 0], [0, this.gridHeight, 0], [0, this.gridHeight, this.gridDepth], [0, 0, this.gridDepth]] : 1 === o ? h = [[0, 0, 0], [this.gridWidth, 0, 0], [this.gridWidth, 0, this.gridDepth], [0, 0, this.gridDepth]] : 2 === o && (h = [[0, 0, 0], [this.gridWidth, 0, 0], [this.gridWidth, this.gridHeight, 0], [0, this.gridHeight, 0]]); for (var m = 0; m < 4; ++m) c.push(h[m][0]), c.push(h[m][1]), c.push(h[m][2]), c.push(h[(m + 1) % 4][0]), c.push(h[(m + 1) % 4][1]), c.push(h[(m + 1) % 4][2]);
            i.bufferData(this.gridVertexBuffers[o], i.ARRAY_BUFFER, new Float32Array(c), i.STATIC_DRAW) } this.pointVertexBuffer = i.createBuffer(), i.bufferData(this.pointVertexBuffer, i.ARRAY_BUFFER, new Float32Array([-1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]), i.STATIC_DRAW), this.quadVertexBuffer = i.createBuffer(), i.bufferData(this.quadVertexBuffer, i.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]), i.STATIC_DRAW), this.boxes = [], this.mouseX = 999, this.mouseY = 999, this.keyPressed = []; for (var m = 0; m < 256; ++m) this.keyPressed[m] = !1;
        this.interactionState = null, i.createProgramsFromFiles(Env.boxeditorPrograms(), function(t) { for (var i in t) this[i] = t[i];
            n() }.bind(this)) }

    function n(t, i) { return Math.round(t / i) * i }

    function s(t, i) { for (var e = 0; e < t.length; ++e) t[e] = n(t[e], i); return t } t.prototype.computeVolume = function() { for (var t = 1, i = 0; i < 3; ++i) t *= this.max[i] - this.min[i]; return t }, t.prototype.computeSurfaceArea = function() { var t = this.max[0] - this.min[0],
            i = this.max[1] - this.min[1],
            e = this.max[2] - this.min[2]; return 2 * (t * i + t * e + i * e) }, t.prototype.clone = function() { return new t([this.min[0], this.min[1], this.min[2]], [this.max[0], this.max[1], this.max[2]]) }, t.prototype.randomPoint = function() { for (var t = [], i = 0; i < 3; ++i) t[i] = this.min[i] + Math.random() * (this.max[i] - this.min[i]); return t }; var o = { RESIZING: 0, TRANSLATING: 1, DRAWING: 2, EXTRUDING: 3 },
        h = 1; return a.prototype.onKeyDown = function(t) { this.keyPressed[t.keyCode] = !0 }, a.prototype.onKeyUp = function(t) { this.keyPressed[t.keyCode] = !1 }, a.prototype.onMouseMove = function(e) { e.preventDefault(); var a = Utilities.getMousePosition(e, this.canvas),
            c = a.x / this.canvas.width,
            m = a.y / this.canvas.height; if (this.mouseX = 2 * c - 1, this.mouseY = 2 * (1 - m) - 1, null !== this.interactionState)
            if (this.onChange(), this.interactionState.mode === o.RESIZING || this.interactionState.mode === o.EXTRUDING) { var u = this.getMouseRay(),
                    f = this.interactionState.point,
                    x = [0, 0, 0];
                x[this.interactionState.axis] = 1; var l = r(f, x, u.origin, u.direction),
                    d = l[0][this.interactionState.axis];
                d = n(d, h); var g = this.interactionState.box,
                    S = this.interactionState.side,
                    v = this.interactionState.axis;
                S === -1 ? g.min[v] = Math.max(Math.min(d, g.max[v]), 0) : 1 === S && (g.max[v] = Math.min(Math.max(d, g.min[v]), this.gridDimensions[v])); for (var b = 0; b < this.boxes.length; ++b) { var p = this.boxes[b];
                    g !== p && i(g, p) && (S === -1 ? g.min[v] = p.max[v] : 1 === S && (g.max[v] = p.min[v])) } } else if (this.interactionState.mode === o.TRANSLATING) { var u = this.getMouseRay(),
                f = this.interactionState.point,
                x = [0, 0, 0];
            x[this.interactionState.axis] = 1; var l = r(f, x, u.origin, u.direction),
                d = l[0][this.interactionState.axis];
            d = n(d, h); var g = this.interactionState.box,
                S = this.interactionState.side,
                v = this.interactionState.axis,
                A = this.interactionState.startMax - this.interactionState.startMin;
            S === -1 ? (g.min[v] = d, g.max[v] = d + A) : 1 === S && (g.max[v] = d, g.min[v] = d - A), g.min[v] < 0 && (g.min[v] = 0, g.max[v] = A), g.max[v] > this.gridDimensions[v] && (g.max[v] = this.gridDimensions[v], g.min[v] = this.gridDimensions[v] - A); var M = 0;
            S === -1 ? M = d < this.interactionState.startMin ? -1 : 1 : 1 === S && (M = d < this.interactionState.startMax ? -1 : 1); var D = g.clone();
            D.min[v] = this.interactionState.startMin, D.max[v] = this.interactionState.startMax, 1 === M ? D.max[v] = g.max[v] : M === -1 && (D.min[v] = g.min[v]); for (var b = 0; b < this.boxes.length; ++b) { var p = this.boxes[b];
                g !== p && i(D, p) && (M === -1 ? (g.min[v] = p.max[v], g.max[v] = p.max[v] + A) : 1 === M && (g.max[v] = p.min[v], g.min[v] = p.min[v] - A)) } } else if (this.interactionState.mode === o.DRAWING) { var u = this.getMouseRay(),
                v = this.interactionState.axis,
                S = this.interactionState.side,
                R = this.interactionState.point,
                y = S === -1 ? 0 : this.gridDimensions[v],
                B = (y - u.origin[v]) / u.direction[v]; if (B > 0) { var I = Utilities.addVectors([], u.origin, Utilities.multiplyVectorByScalar([], u.direction, B));
                s(I, h); for (var b = 0; b < 3; ++b) I[b] = Utilities.clamp(I[b], 0, this.gridDimensions[b]), I[b] = Utilities.clamp(I[b], 0, this.gridDimensions[b]); var T = [Math.min(R[0], I[0]), Math.min(R[1], I[1]), Math.min(R[2], I[2])],
                    _ = [Math.max(R[0], I[0]), Math.max(R[1], I[1]), Math.max(R[2], I[2])],
                    g = this.interactionState.box,
                    D = new t(T, _);
                this.interactionState.side === -1 ? D.max[this.interactionState.axis] = .1 * h : D.min[this.interactionState.axis] = this.gridDimensions[this.interactionState.axis] - .1 * h; for (var b = 0; b < this.boxes.length; ++b) { var p = this.boxes[b]; if (g !== p && i(D, p)) { for (var E = 99999999, w = -1, v = 0; v < 3; ++v)
                            if (v !== this.interactionState.axis) { var F = Math.min(_[v], p.max[v]) - Math.max(T[v], p.min[v]);
                                F > 0 && F < E && (R[v] < p.min[v] || R[v] > p.max[v]) && (E = F, w = v) } I[w] > R[w] ? _[w] = p.min[w] : T[w] = p.max[w] } } this.interactionState.box.min = T, this.interactionState.box.max = _ } } this.camera.onMouseMove(e) }, a.prototype.getBoxIntersection = function(t, i) { for (var r = { aabb: null, t: 1 / 0 }, a = 0; a < this.boxes.length; ++a) { var n = this.boxes[a],
                s = e(t, i, n);
            null !== s && s.t < r.t && (r = s) } return null === r.aabb ? null : r }, a.prototype.getBoundingPlaneIntersection = function(t, i) { for (var e = 0; e < 3; ++e)
            for (var r = -1; r <= 1; r += 2) { var a = r === -1 ? i[e] < 0 : i[e] > 0; if (a) { var n = r === -1 ? 0 : this.gridDimensions[e],
                        s = (n - t[e]) / i[e]; if (s > 0) { var o = Utilities.addVectors([], t, Utilities.multiplyVectorByScalar([], i, s)); if (o[0] >= 0 && o[0] <= this.gridDimensions[0] && o[1] >= 0 && o[1] <= this.gridDimensions[1] && o[2] >= 0 && o[2] <= this.gridDimensions[2]) return { axis: e, side: r, point: o } } } }
        return null }, a.prototype.onMouseDown = function(i) { if (i.preventDefault(), this.onMouseMove(i), !this.keyPressed[32]) { if (null !== this.interactionState && this.interactionState.mode === o.EXTRUDING) return 0 === this.interactionState.box.computeVolume() && this.boxes.splice(this.boxes.indexOf(this.interactionState.box), 1), this.interactionState = null, void this.onChange(); var e = this.getMouseRay(),
                r = this.getBoxIntersection(e.origin, e.direction); if (null !== r) { var a = r; if (this.keyPressed[16] ? this.interactionState = { mode: o.TRANSLATING, box: a.aabb, axis: a.axis, side: a.side, point: a.point, startMax: a.aabb.max[a.axis], startMin: a.aabb.min[a.axis] } : this.interactionState = { mode: o.RESIZING, box: a.aabb, axis: a.axis, side: a.side, point: a.point }, Conf.DEBUG_MODE) { var s = JSON.stringify(this.interactionState.box.min),
                        c = JSON.stringify(this.interactionState.box.max);
                    console.log("(" + s + "," + c + ")") } } if (null === r) { var e = this.getMouseRay(),
                    m = this.getBoundingPlaneIntersection(e.origin, e.direction); if (null !== m) { var u = m.point;
                    u[0] = n(u[0], h), u[1] = n(u[1], h), u[2] = n(u[2], h); var f = new t(u, u);
                    this.boxes.push(f), this.interactionState = { mode: o.DRAWING, box: f, axis: m.axis, side: m.side, point: m.point } } this.onChange() } } null === this.interactionState && this.camera.onMouseDown(i) }, a.prototype.onMouseUp = function(t) { if (t.preventDefault(), null !== this.interactionState) { if (this.interactionState.mode === o.RESIZING) 0 === this.interactionState.box.computeVolume() && this.boxes.splice(this.boxes.indexOf(this.interactionState.box), 1), this.interactionState = null;
            else if (this.interactionState.mode === o.TRANSLATING) this.interactionState = null;
            else if (this.interactionState.mode === o.DRAWING)
                if (this.interactionState.box.computeSurfaceArea() > 0) { var i = this.getMouseRay(),
                        e = this.interactionState.axis,
                        r = this.interactionState.side,
                        a = (this.interactionState.point, r === -1 ? 0 : this.gridDimensions[e]),
                        n = (a - i.origin[e]) / i.direction[e],
                        c = Utilities.addVectors([], i.origin, Utilities.multiplyVectorByScalar([], i.direction, n));
                    s(c, h); for (var m = 0; m < 3; ++m) c[m] = Utilities.clamp(c[m], 0, this.gridDimensions[m]), c[m] = Utilities.clamp(c[m], this.interactionState.box.min[m], this.interactionState.box.max[m]);
                    this.interactionState = { mode: o.EXTRUDING, box: this.interactionState.box, axis: this.interactionState.axis, side: this.interactionState.side * -1, point: c } } else this.boxes.splice(this.boxes.indexOf(this.interactionState.box), 1), this.interactionState = null;
            this.onChange() } null === this.interactionState && this.camera.onMouseUp(t) }, a.prototype.getMouseRay = function() { var t = 2 * Math.atan(1 / this.projectionMatrix[5]),
            i = [this.mouseX * Math.tan(t / 2) * (this.canvas.width / this.canvas.height), this.mouseY * Math.tan(t / 2), -1],
            e = Utilities.invertMatrix([], this.camera.getViewMatrix()),
            r = Utilities.transformDirectionByMatrix([], i, e);
        Utilities.normalizeVector(r, r); var a = this.camera.getPosition(); return { origin: a, direction: r } }, a.prototype.draw = function() { var t = this.wgl;
        t.clear(t.createClearState()
            .bindFramebuffer(null)
            .clearColor(.9, .9, .9, 1), t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT); var i = t.createDrawState()
            .bindFramebuffer(null)
            .viewport(0, 0, this.canvas.width, this.canvas.height)
            .useProgram(this.backgroundProgram)
            .vertexAttribPointer(this.quadVertexBuffer, this.backgroundProgram.getAttribLocation("a_position"), 2, t.FLOAT, t.FALSE, 0, 0);
        t.drawArrays(i, t.TRIANGLE_STRIP, 0, 4); for (var e = 0; e < 3; ++e)
            for (var r = 0; r <= 1; ++r) { var a = this.camera.getPosition(),
                    n = [this.gridWidth / 2, this.gridHeight / 2, this.gridDepth / 2];
                n[e] = 0 === r ? 0 : this.gridDimensions[e]; var c = Utilities.subtractVectors([], n, a),
                    m = t.createDrawState()
                    .bindFramebuffer(null)
                    .viewport(0, 0, this.canvas.width, this.canvas.height)
                    .useProgram(this.gridProgram)
                    .vertexAttribPointer(this.gridVertexBuffers[e], this.gridProgram.getAttribLocation("a_vertexPosition"), 3, t.FLOAT, t.FALSE, 0, 0)
                    .uniformMatrix4fv("u_projectionMatrix", !1, this.projectionMatrix)
                    .uniformMatrix4fv("u_viewMatrix", !1, this.camera.getViewMatrix()),
                    u = [0, 0, 0];
                u[e] = r * this.gridDimensions[e], m.uniform3f("u_translation", u[0], u[1], u[2]), (0 === r && c[e] <= 0 || 1 === r && c[e] >= 0) && t.drawArrays(m, t.LINES, 0, 8) }
        var f = t.createDrawState()
            .bindFramebuffer(null)
            .viewport(0, 0, this.canvas.width, this.canvas.height)
            .enable(t.DEPTH_TEST)
            .enable(t.CULL_FACE)
            .useProgram(this.boxProgram)
            .vertexAttribPointer(this.cubeVertexBuffer, this.boxProgram.getAttribLocation("a_cubeVertexPosition"), 3, t.FLOAT, t.FALSE, 0, 0)
            .bindIndexBuffer(this.cubeIndexBuffer)
            .uniformMatrix4fv("u_projectionMatrix", !1, this.projectionMatrix)
            .uniformMatrix4fv("u_viewMatrix", !1, this.camera.getViewMatrix())
            .enable(t.POLYGON_OFFSET_FILL)
            .polygonOffset(1, 1),
            x = null,
            l = null,
            d = null; if (null !== this.interactionState) this.interactionState.mode !== o.RESIZING && this.interactionState.mode !== o.EXTRUDING || (x = this.interactionState.box, l = [1.5, 1.5, 1.5], l[this.interactionState.axis] = this.interactionState.side, d = [.75, .75, .75]);
        else if (!this.keyPressed[32] && !this.camera.isMouseDown()) { var g = this.getMouseRay(),
                S = this.getBoxIntersection(g.origin, g.direction); if (null !== S && (x = S.aabb, l = [1.5, 1.5, 1.5], l[S.axis] = S.side, d = [.9, .9, .9]), null === S && !this.keyPressed[32]) { var v = this.getBoundingPlaneIntersection(g.origin, g.direction); if (null !== v) { var b = v.point;
                    s(b, h); var p = [new Float32Array([0, 0, 1, 0, 1, 0, 1, 0, 0]), new Float32Array([1, 0, 0, 0, 0, 1, 0, 1, 0]), new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])][v.axis],
                        A = t.createDrawState()
                        .bindFramebuffer(null)
                        .viewport(0, 0, this.canvas.width, this.canvas.height)
                        .enable(t.DEPTH_TEST)
                        .useProgram(this.pointProgram)
                        .vertexAttribPointer(this.pointVertexBuffer, this.pointProgram.getAttribLocation("a_position"), 3, t.FLOAT, t.FALSE, 0, 0)
                        .uniformMatrix4fv("u_projectionMatrix", !1, this.projectionMatrix)
                        .uniformMatrix4fv("u_viewMatrix", !1, this.camera.getViewMatrix())
                        .uniform3f("u_position", b[0], b[1], b[2])
                        .uniformMatrix3fv("u_rotation", !1, p);
                    t.drawArrays(A, t.TRIANGLE_STRIP, 0, 4) } } } for (var M = 0; M < this.boxes.length; ++M) { var D = this.boxes[M];
            f.uniform3f("u_translation", D.min[0], D.min[1], D.min[2])
                .uniform3f("u_scale", D.max[0] - D.min[0], D.max[1] - D.min[1], D.max[2] - D.min[2]), D === x ? (f.uniform3f("u_highlightSide", l[0], l[1], l[2]), f.uniform3f("u_highlightColor", d[0], d[1], d[2])) : f.uniform3f("u_highlightSide", 1.5, 1.5, 1.5), t.drawElements(f, t.TRIANGLES, 36, t.UNSIGNED_SHORT) } for (var R = t.createDrawState()
                .bindFramebuffer(null)
                .viewport(0, 0, this.canvas.width, this.canvas.height)
                .enable(t.DEPTH_TEST)
                .useProgram(this.boxWireframeProgram)
                .vertexAttribPointer(this.cubeWireframeVertexBuffer, this.boxWireframeProgram.getAttribLocation("a_cubeVertexPosition"), 3, t.FLOAT, t.FALSE, 0, 0)
                .bindIndexBuffer(this.cubeWireframeIndexBuffer)
                .uniformMatrix4fv("u_projectionMatrix", !1, this.projectionMatrix)
                .uniformMatrix4fv("u_viewMatrix", !1, this.camera.getViewMatrix()), M = 0; M < this.boxes.length; ++M) { var D = this.boxes[M];
            R.uniform3f("u_translation", D.min[0], D.min[1], D.min[2])
                .uniform3f("u_scale", D.max[0] - D.min[0], D.max[1] - D.min[1], D.max[2] - D.min[2]), t.drawElements(R, t.LINES, 24, t.UNSIGNED_SHORT) } }, { BoxEditor: a, AABB: t, InteractionMode: o } }();
