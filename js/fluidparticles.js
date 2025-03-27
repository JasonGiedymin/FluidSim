"use strict";
var FluidParticles = function() {
    function t() {
        function t(t) {
            this.state = i.EDITING;
            
            // Use our new slideout controls
            this.startButton = document.querySelector('#controls .action-button#start-button');
            this.startButton.addEventListener("click", function() {
                if (this.state === i.EDITING) {
                    if (this.boxEditor.boxes.length > 0) {
                        this.startSimulation();
                    }
                    this.redrawUI();
                } else if (this.state === i.SIMULATING) {
                    this.stopSimulation();
                    this.redrawUI();
                }
            }.bind(this));

            this.currentPresetIndex = 0;
            this.editedSinceLastPreset = false;
            this.PRESETS = Env.boxPresets();
            
            this.presetButton = document.querySelector('#controls .action-button.secondary#preset-button');
            this.presetButton.addEventListener("click", function() {
                this.editedSinceLastPreset = false;
                this.boxEditor.boxes.length = 0;
                var t = this.PRESETS[this.currentPresetIndex];
                
                if (Conf.DEBUG_MODE) {
                    console.log("Preset: " + t.name + " (density: " + t.density + ")");
                    this.gridCellDensity = t.density;
                }
                
                for (var e = 0; e < t.boxes.length; ++e) {
                    this.boxEditor.boxes.push(t.boxes[e].clone());
                }
                
                this.currentPresetIndex = (this.currentPresetIndex + 1) % this.PRESETS.length;
                this.redrawUI(t.density);
            }.bind(this));

            // Update dropdown handlers to use our new controls
            var e = function(t, e, i) {
                return function(event) {
                    event.preventDefault();
                    var dropdownId = '#controls #dropdown-' + e;
                    document.querySelector(dropdownId + ' ul li.active').classList.remove('active');
                    this.closest('li').classList.add('active');
                    t[e] = this.id;
                    if (i) Env.valuePresets.stage[this.id]();
                };
            };

            // Attach click handlers to our new controls
            document.querySelectorAll('#controls #menu-hp a').forEach(function(item) {
                item.addEventListener('click', e(Env.globalSettings, 'pressure', false));
            });

            document.querySelectorAll('#controls #menu-velocity a').forEach(function(item) {
                item.addEventListener('click', e(Env.globalSettings, 'viscosity', false));
            });

            document.querySelectorAll('#controls #menu-temp a').forEach(function(item) {
                item.addEventListener('click', e(Env.globalSettings, 'temp', false));
            });

            document.querySelectorAll('#controls .dropdown-menu a[id*="Theme"]').forEach(function(item) {
                item.addEventListener('click', e(Env.globalSettings, 'theme', false));
            });

            document.querySelectorAll('#controls .dropdown-menu a[id*="Stage"]').forEach(function(item) {
                item.addEventListener('click', e(Env.globalSettings, 'stage', true));
            });

            if (Conf.DEBUG_MODE) {
                console.log(Env.globalSettings);
            }

            this.gridCellDensity = 0.5;
            this.timeStep = 1 / 60;

            var s = function(t) {
                this.gridCellDensity = t;
                this.redrawUI();
            }.bind(this);

            // Initialize sliders with our new controls
            this.densitySlider = new Slider(document.querySelector('#controls #density-slider'), this.gridCellDensity, 0.2, 3, s);
            this.flipnessSlider = new Slider(document.querySelector('#controls #fluidity-slider'), this.simulatorRenderer.simulator.flipness, 0.5, 0.99, function(t) {
                this.simulatorRenderer.simulator.flipness = t;
            }.bind(this));
            this.speedSlider = new Slider(document.querySelector('#controls #speed-slider'), this.timeStep, 0, 1 / 60, function(t) {
                this.timeStep = t;
            }.bind(this));

            this.redrawUI();
            this.presetButton.click();

            r.addEventListener("mousemove", this.onMouseMove.bind(this));
            r.addEventListener("mousedown", this.onMouseDown.bind(this));
            document.addEventListener("mouseup", this.onMouseUp.bind(this));
            document.addEventListener("keydown", this.onKeyDown.bind(this));
            document.addEventListener("keyup", this.onKeyUp.bind(this));
            window.addEventListener("resize", this.onResize.bind(this));
            this.onResize();

            var n = 0;
            var o = function(t) {
                var e = t - n || 0;
                n = t;
                this.update(e);
                requestAnimationFrame(o);
            }.bind(this);

            Env.valuePresets.stage.oceanStage();
            o();
        }
        var r = this.canvas = document.getElementById("canvas"),
            a = this.wgl = new WrappedGL(r);
        window.wgl = a, this.projectionMatrix = Utilities.makePerspectiveMatrix(new Float32Array(16), e, this.canvas.width / this.canvas.height, .1, 100), this.camera = new Camera(this.canvas, [s / 2, n / 3, o / 2]); var h = !1,
            d = !1;
        this.boxEditor = new BoxEditor.BoxEditor(this.canvas, this.wgl, this.projectionMatrix, this.camera, [s, n, o], function() { h = !0, h && d && t.call(this) }.bind(this), function() { this.redrawUI() }.bind(this)), this.simulatorRenderer = new SimulatorRenderer(this.canvas, this.wgl, this.projectionMatrix, this.camera, [s, n, o], function() { d = !0, h && d && t.call(this) }.bind(this)), this.modelSearch = function() { return function(t, e, i) { if (t.name == Env.globalSettings.model) { Conf.DEBUG_MODE && console.log("Preset: " + t.name + " (density: " + t.density + ")"); for (var s = 0; s < t.boxes.length; ++s) this.boxEditor.boxes.push(t.boxes[s].clone());
                    this.gridCellDensity = t.density, this.redrawUI() } } } } var e = Math.PI / 4.2,
        i = { EDITING: 0, SIMULATING: 1 },
        s = 40,
        n = 20,
        o = 33,
        r = 10; return t.prototype.onResize = function(t) { this.canvas.width = window.innerWidth, this.canvas.height = window.innerHeight, Utilities.makePerspectiveMatrix(this.projectionMatrix, e, this.canvas.width / this.canvas.height, .1, 100), this.simulatorRenderer.onResize(t) }, t.prototype.onMouseMove = function(t) { t.preventDefault(), this.state === i.EDITING ? (this.boxEditor.onMouseMove(t), null !== this.boxEditor.interactionState && (this.editedSinceLastPreset = true)) : this.state === i.SIMULATING && this.simulatorRenderer.onMouseMove(t) }, t.prototype.onMouseDown = function(t) { t.preventDefault(), this.state === i.EDITING ? this.boxEditor.onMouseDown(t) : this.state === i.SIMULATING && this.simulatorRenderer.onMouseDown(t) }, t.prototype.onMouseUp = function(t) { t.preventDefault(), this.state === i.EDITING ? this.boxEditor.onMouseUp(t) : this.state === i.SIMULATING && this.simulatorRenderer.onMouseUp(t) }, t.prototype.onKeyDown = function(t) { this.state === i.EDITING && this.boxEditor.onKeyDown(t) }, t.prototype.onKeyUp = function(t) { this.state === i.EDITING && this.boxEditor.onKeyUp(t) }, t.prototype.redrawUI = function() { var t = document.querySelectorAll(".simulating-ui"),
            e = document.querySelectorAll(".editing-ui"); if (this.state === i.SIMULATING) { for (var s = 0; s < t.length; ++s) t[s].style.display = "block"; for (var s = 0; s < e.length; ++s) e[s].style.display = "none";
            this.startButton.textContent = "Edit", this.startButton.className = "start-button-active" } else if (this.state === i.EDITING) { for (var s = 0; s < t.length; ++s) t[s].style.display = "none"; for (var s = 0; s < e.length; ++s) e[s].style.display = "block";
            document.getElementById("particle-count")
                .innerHTML = this.getParticleCount()
                .toFixed(0) + " particles", this.boxEditor.boxes.length >= 2 || 1 === this.boxEditor.boxes.length && (null === this.boxEditor.interactionState || this.boxEditor.interactionState.mode !== BoxEditor.InteractionMode.EXTRUDING && this.boxEditor.interactionState.mode !== BoxEditor.InteractionMode.DRAWING) ? this.startButton.className = "start-button-active" : this.startButton.className = "start-button-inactive", this.startButton.textContent = "Start", this.editedSinceLastPreset ? this.presetButton.innerHTML = "Use Preset" : this.presetButton.innerHTML = "Next Preset" } this.flipnessSlider.redraw(), this.densitySlider.redraw(), this.speedSlider.redraw() }, t.prototype.getParticleCount = function() { for (var t = this.boxEditor, e = s * n * o * this.gridCellDensity, i = Math.ceil(Math.pow(e / 2, 1 / 3)), a = 1 * i, h = 2 * i, d = h * i * a, l = 0, u = [], c = 0; c < t.boxes.length; ++c) { var p = t.boxes[c],
                E = p.computeVolume();
            l += E, u[c] = l } var m = l / (s * n * o),
            v = m * d * r; return v }, t.prototype.startSimulation = function() { this.state = i.SIMULATING; for (var t = this.getParticleCount(), e = 512, a = Math.ceil(t / e), h = e * a, d = [], l = this.boxEditor, u = 0, c = 0; c < l.boxes.length; ++c) u += l.boxes[c].computeVolume(); for (var p = 0, c = 0; c < l.boxes.length; ++c) { var E = l.boxes[c],
                m = 0;
            m = c < l.boxes.length - 1 ? Math.floor(h * E.computeVolume() / u) : h - p; for (var v = 0; v < m; ++v) { var b = E.randomPoint();
                d.push(b) } p += m } var g = s * n * o * this.gridCellDensity,
            I = Math.ceil(Math.pow(g / 2, 1 / 3)),
            S = 1 * I,
            x = 2 * I,
            y = [s, n, o],
            f = [x, I, S],
            w = 7 / x;
        this.simulatorRenderer.reset(e, a, d, y, f, r, w), this.camera.setBounds(0, Math.PI / 2) }, t.prototype.stopSimulation = function() { this.state = i.EDITING, this.camera.setBounds(-Math.PI / 4, Math.PI / 4) }, t.prototype.update = function() { this.state === i.EDITING ? this.boxEditor.draw() : this.state === i.SIMULATING && this.simulatorRenderer.update(this.timeStep) }, t.prototype.reset = function() { this.boxEditor.boxes.length = 0, this.PRESETS.forEach(this.modelSearch()
            .bind(this)), this.stopSimulation(), this.redrawUI() }, t.prototype.setModel = function() { this.boxEditor.boxes.length = 0, this.PRESETS.forEach(this.modelSearch()
            .bind(this)), this.stopSimulation(), this.redrawUI() }, t }();
