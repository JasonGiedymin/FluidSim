"use strict";
var Env = function(e) {
    function r() { return { transferToGridProgram: { vertexShader: "shaders/transfertogrid.vert", fragmentShader: "shaders/transfertogrid.frag", attributeLocations: { a_textureCoordinates: 0 } }, normalizeGridProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/normalizegrid.frag", attributeLocations: { a_position: 0 } }, markProgram: { vertexShader: "shaders/mark.vert", fragmentShader: "shaders/mark.frag", attributeLocations: { a_textureCoordinates: 0 } }, addForceProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: ["shaders/addforce.frag"], attributeLocations: { a_position: 0 } }, enforceBoundariesProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/enforceboundaries.frag", attributeLocations: { a_textureCoordinates: 0 } }, extendVelocityProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/extendvelocity.frag", attributeLocations: { a_textureCoordinates: 0 } }, transferToParticlesProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/transfertoparticles.frag", attributeLocations: { a_position: 0 } }, divergenceProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/divergence.frag", attributeLocations: { a_position: 0 } }, jacobiProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/jacobi.frag", attributeLocations: { a_position: 0 } }, subtractProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/subtract.frag", attributeLocations: { a_position: 0 } }, advectProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/advect.frag", attributeLocations: { a_position: 0 } }, copyProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/copy.frag", attributeLocations: { a_position: 0 } } } }

    function t() { return { sphereProgram: { vertexShader: "shaders/sphere.vert", fragmentShader: "shaders/sphere.frag" }, sphereDepthProgram: { vertexShader: "shaders/spheredepth.vert", fragmentShader: "shaders/spheredepth.frag" }, sphereAOProgram: { vertexShader: "shaders/sphereao.vert", fragmentShader: "shaders/sphereao.frag" }, compositeProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.frag", attributeLocations: { a_position: 0 } }, compositeProgram0: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.frag", attributeLocations: { a_position: 0 } }, compositeProgram1: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.1.frag", attributeLocations: { a_position: 0 } }, compositeProgram2: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.2.frag", attributeLocations: { a_position: 0 } }, compositeProgram3: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.3.frag", attributeLocations: { a_position: 0 } }, compositeProgram4: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.4.frag", attributeLocations: { a_position: 0 } }, compositeProgram5: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.5.frag", attributeLocations: { a_position: 0 } }, compositeProgram6: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.6.frag", attributeLocations: { a_position: 0 } }, compositeProgram7: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.7.frag", attributeLocations: { a_position: 0 } }, compositeProgram8: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.8.frag", attributeLocations: { a_position: 0 } }, compositeProgram9: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.9.frag", attributeLocations: { a_position: 0 } }, compositeProgram10: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.10.frag", attributeLocations: { a_position: 0 } }, compositeProgram11: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.11.frag", attributeLocations: { a_position: 0 } }, compositeProgram12: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/composite.12.frag", attributeLocations: { a_position: 0 } }, fxaaProgram: { vertexShader: "shaders/fullscreen.vert", fragmentShader: "shaders/fxaa.frag", attributeLocations: { a_position: 0 } } } }

    function a() { return { backgroundProgram: { vertexShader: "shaders/background.vert", fragmentShader: "shaders/background.frag" }, boxProgram: { vertexShader: "shaders/box.vert", fragmentShader: "shaders/box.frag" }, boxWireframeProgram: { vertexShader: "shaders/boxwireframe.vert", fragmentShader: "shaders/boxwireframe.frag" }, gridProgram: { vertexShader: "shaders/grid.vert", fragmentShader: "shaders/grid.frag" }, pointProgram: { vertexShader: "shaders/point.vert", fragmentShader: "shaders/point.frag" } } }

    function o() { return [{ name: "dam-break-2", density: .5, boxes: [new BoxEditor.AABB([0, 0, 0], [40, 20, 4])] }, { name: "dam-break-3", density: .5, boxes: [new BoxEditor.AABB([0, 0, 0], [40, 20, 4]), new BoxEditor.AABB([0, 19, 16], [40, 20, 33])] }, { name: "pillars", density: .5, boxes: [new BoxEditor.AABB([2, 0, 10], [7, 20, 20]), new BoxEditor.AABB([18, 0, 10], [23, 20, 20]), new BoxEditor.AABB([35, 0, 10], [39, 20, 20])] }, { name: "drops", density: .5, boxes: [new BoxEditor.AABB([0, 16, 10], [5, 20, 20]), new BoxEditor.AABB([17, 9, 10], [22, 13, 20]), new BoxEditor.AABB([36, 2, 14], [40, 6, 21]), new BoxEditor.AABB([0, 0, 3], [40, 1, 27])] }, { name: "raining-suppression", density: .5, boxes: [new BoxEditor.AABB([0, 19, 0], [40, 20, 33]), new BoxEditor.AABB([0, 10, 10], [5, 14, 20]), new BoxEditor.AABB([17, 6, 10], [22, 10, 20]), new BoxEditor.AABB([36, 2, 14], [40, 6, 21]), new BoxEditor.AABB([0, 0, 3], [40, 1, 27])] }, { name: "raining-suppression-3", density: .5, boxes: [new BoxEditor.AABB([0, 17, 0], [40, 20, 33]), new BoxEditor.AABB([0, 10, 10], [5, 14, 20]), new BoxEditor.AABB([17, 6, 10], [22, 10, 20]), new BoxEditor.AABB([36, 2, 14], [40, 6, 21]), new BoxEditor.AABB([0, 0, 3], [40, 1, 27])] }, { name: "plosions", density: 2.5, boxes: [new BoxEditor.AABB([33, 13, 0], [49, 20, 7]), new BoxEditor.AABB([33, 0, 0], [40, 13, 2]), new BoxEditor.AABB([-10, 13, 0], [6, 20, 7]), new BoxEditor.AABB([0, 0, 0], [1, 13, 7]), new BoxEditor.AABB([-10, 13, 26], [6, 20, 33]), new BoxEditor.AABB([0, 0, 31], [9, 13, 33]), new BoxEditor.AABB([33, 13, 23], [49, 20, 30]), new BoxEditor.AABB([39, 0, 25], [40, 13, 33]), new BoxEditor.AABB([19, 13, 8], [22, 20, 24]), new BoxEditor.AABB([0, 5, 7], [40, 6, 23])] }, { name: "dam-break", density: .3, boxes: [new BoxEditor.AABB([0, 0, 0], [15, 20, 20])] }, { name: "block-drop", density: .5, boxes: [new BoxEditor.AABB([0, 0, 0], [40, 7, 20]), new BoxEditor.AABB([12, 12, 5], [28, 20, 15])] }, { name: "double-splash", density: .2, boxes: [new BoxEditor.AABB([0, 0, 0], [10, 20, 15]), new BoxEditor.AABB([30, 0, 5], [40, 20, 20])] }, { name: "waves", density: .2, boxes: [new BoxEditor.AABB([0, 0, 0], [40, 6, 23])] }, { name: "plane", density: .5, boxes: [new BoxEditor.AABB([0, 0, 0], [40, 4, 32])] }, { name: "pool", density: .2, boxes: [new BoxEditor.AABB([0, 0, 0], [40, 6, 32])] }] }

    function s(e, r) { return { positionX: e, positionY: r } }

    function i(e) { return { pointSize: e } }

    function n(e, r) { return { velocityZ: e, velocityW: r } }

    function d(e, r) { $("#dropdown-" + e + " ul li.active")
            .toggleClass("active"), $("#dropdown-" + e + " a#" + r)
            .parent()
            .toggleClass("active") } var h = { pressure: { shallow: i(1), pool: i(2), river: i(4), ocean: i(10) }, viscosity: { honey: n(.9, 0), oil: n(.94, 0), dishsoap: n(.98, 0), water: n(1, 0), rollingboil: n(1.008, 0), lava: n(1.01, 0) }, temp: { stableTemp: s(0, 1), boilingoverTemp: s(0, .999), superheatingTemp: s(0, .98), explosiveTemp: s(0, .95) }, theme: { defaultTheme: { selection: 0 }, skittlesTheme: { selection: 1 }, invisiblehandTheme: { selection: 2 }, fireTheme: { selection: 3 }, valentinesTheme: { selection: 4 }, valentines2Theme: { selection: 5 }, handoflightTheme: { selection: 6 }, technicolorTheme: { selection: 7 }, wavesTheme: { selection: 8 }, aquariumTheme: { selection: 9 }, deepoceanTheme: { selection: 10 }, handoflifeTheme: { selection: 11 }, bloodlustTheme: { selection: 12 } }, stage: { defaultStage: function() { m.pressure = "shallow", d("pressure", m.pressure), m.viscosity = "water", d("viscosity", m.viscosity), m.temp = "stableTemp", d("temp", m.temp), m.theme = "defaultTheme", m.model = "dam-break-2", d("theme", m.theme), Main.fluidBox.reset() }, oceanStage: function() { m.pressure = "shallow", d("pressure", m.pressure), m.viscosity = "rollingboil", d("viscosity", m.viscosity), m.temp = "stableTemp", d("temp", m.temp), m.theme = "deepoceanTheme", m.model = "dam-break-2", d("theme", m.theme), Main.fluidBox.setModel() }, lifeStage: function() { m.pressure = "pool", d("pressure", m.pressure), m.viscosity = "water", d("viscosity", m.viscosity), m.temp = "boilingoverTemp", d("temp", m.temp), m.theme = "handoflifeTheme", m.model = "plane", d("theme", m.theme), Main.fluidBox.setModel() }, lavaStage: function() { m.pressure = "shallow", d("pressure", m.pressure), m.viscosity = "water", d("viscosity", m.viscosity), m.temp = "superheatingTemp", d("temp", m.temp), m.theme = "fireTheme", m.model = "pool", d("theme", m.theme), Main.fluidBox.setModel() }, bloodStage: function() { m.pressure = "shallow", d("pressure", m.pressure), m.viscosity = "water", d("viscosity", m.viscosity), m.temp = "stableTemp", d("temp", m.temp), m.theme = "bloodlustTheme", m.model = "plosions", d("theme", m.theme), Main.fluidBox.setModel() } } },
        m = { model: "", pressure: "shallow", viscosity: "water", temp: "stableTemp", theme: "defaultTheme", stage: "defaultStage", reset: !1 }; return { simulatorPrograms: r, rendererPrograms: t, boxeditorPrograms: a, boxPresets: o, valuePresets: h, globalSettings: m } }();
