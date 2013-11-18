/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */
/**
    @module "montage/ui/stage.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage;
var Component = require("montage/ui/component").Component;
var RangeController = require("montage/core/range-controller").RangeController;
var Utilities = require("runtime/utilities").Utilities;
var Node = require("runtime/node").Node;

var glTFNode = require("runtime/glTF-node").glTFNode;
var Camera = require("runtime/camera").Camera;
var GLSLProgram = require("runtime/glsl-program").GLSLProgram;
var glMatrix = require("runtime/dependencies/gl-matrix").glMatrix;

/**
    Description TODO
    @class module:"montage/ui/stage.reel".Stage
    @extends module:montage/ui/component.Component
*/
exports.Stage = Montage.create(Component, /** @lends module:"montage/ui/stage.reel".Stage# */ {

    constructor: {
        value: function Stage () {
            this.super();
            this.modelsController = new RangeController().initWithContent([]);
            this.modelsController.selectAddedContent = true;
            this.camerasController = new RangeController().initWithContent([]);
            this.camerasController.selectAddedContent = true;

            this.defineBinding("model" ,{"<-": "modelsController.selection.0"});
            this.defineBinding("camera" ,{"<-": "camerasController.selection.0"});

            this.addOwnPropertyChangeListener("model", this);
            this.addOwnPropertyChangeListener("camera", this);
        }
    },

    view: {
        get: function() {
            return this.templateObjects ? this.templateObjects.view : null;
        }
    },

    /**
     */
    templateDidLoad:{
        value:function () {
            this.view.delegate = this;
        }
    },

    enterDocument: {
        value: function(firstTime) {
            if(firstTime) {
                this.modelsController.content = [
                    { "name": "loft",      "path": "model/loft/loft8.json"},
                    { "name": "vc",      "path": "model/vc/vc.json"},
                    { "name": "minebot",            "path": "model/minebot/mine_bot_anim.json"},
                    { "name": "bimba",            "path": "model/bimba/bimba.json"},
                    { "name": "David",            "path": "model/David/David.json"},
                    { "name": "elephant2",            "path": "model/elephant2/elephant2.json"},

                    { "name": "HolidayIn",            "path": "model/holidayin/models/model.json"},
                    { "name": "Atomium",            "path": "model/Atomium/models/model.json"},
                    { "name": "frigate",            "path": "model/frigate/frigate.json"},
                    { "name": "test",    "path": "model/testMark/testMark.json"},
                    { "name": "modo",    "path": "model/modo/modo.json"},
                    { "name": "duck", "path": "model/duck/duck.json"},
                    { "name": "Buggy",              "path": "model/rambler/Rambler.json"},
                    { "name": "SuperMurdoch", "path": "model/SuperMurdoch/SuperMurdoch.json"},
                    { "name": "Wine", "path": "model/wine/wine.json"},


                    { "name": "Buggy", "path": "model/rambler/Rambler.json"},

                    { "name": "challenge",          "path": "model/challenge/challengeFlattened.json"},
                    { "name": "monster", "path": "model/monster/monster.json"},

                    { "name": "testShadows",    "path": "model/test_shadows/test_shadows.json"},

                    { "name": "loft",    "path": "model/loft4/loft4.json"},


                    { "name": "cubemaps",    "path": "model/cubemaps/test1.json"},

                    { "name": "roomWithCameras",    "path": "model/testWithCameras/testWithCameras.json"},
                    { "name": "vc",                 "path": "model/vc/vc.json"},
                    { "name": "BuggyFlatttened",    "path": "model/rambler/RamblerFlattened.json"},
                    { "name": "duck",               "path": "model/duck/duck.json"},
                    { "name": "room1",              "path": "model/room/testRoom6.json"},
                    { "name": "SuperMurdoch",       "path": "model/SuperMurdoch/SuperMurdoch.json"},
                    { "name": "Wine",               "path": "model/wine/wine.json"},
                    { "name": "Nexus",              "path": "model/NexusFlattened/NexusFlattened.json"},
                    { "name": "room1",              "path": "model/room/testRoom5.json"},
                    { "name": "megacity",           "path": "model/megacity/megacity4.json"},
                    { "name": "Buggy",              "path": "model/rambler/Rambler.json"},
                    { "name": "BuggyFlatttened",    "path": "model/rambler/RamblerFlattened.json"},
                    { "name": "Wine",               "path": "model/wine/wine.json"},
                    { "name": "balloon",            "path": "model/baloon3/baloon.json"},
                    { "name": "brainsteam",         "path": "model/brainsteam/brainsteam2.json"},
                    { "name": "FemurTri",           "path": "model/femur/FemurTri.json"},
                    { "name": "monster",            "path": "model/monster/monster.json"}
                ];
                this.modelPath = this.modelsController.content[0].path;
            }
            if (this.fillViewport) {
                window.addEventListener("resize", this, true);
            }
        }
    },

    exitDocument: {
        value: function() {
            if (this.fillViewport) {
                window.removeEventListener("resize", this, true);
            }
        }
    },


    willDraw: {
        value: function() {
            this.view.width = this.width = window.innerWidth - 270;
            this.view.height = this.height = window.innerHeight;
        }
    },

    bytesLimit: { value: 250},

    concurrentRequests: { value: 6},

    modelPath: {
        value: null
    },

    loadingProgress: {
        value: 0
    },

    location: {
        value: null
    },

    _fillViewport: {
        value: true
    },

    fillViewport: {
        get: function() {
            return this._fillViewport;
        },
        set: function(value) {
            if (value && ! this._fillViewport) {
                window.addEventListener("resize", this, true);
            } else if (! value && this._fillViewport) {
                window.removeEventListener("resize", this, true);
            }
            this._fillViewport = value;
        }
    },

    height: {value: null},
    width: {value: null},

    captureResize: {
        value: function(evt) {
            this.needsDraw = true;
        }
    },

    handleOptionsReload: {
        value: function() {
            this.loadScene();
        }
    },

    handleModelChange: {
        value: function() {
            this.run(this.model.path);
            this.loading = true;
        }
    },

    handleCameraChange: {
        value: function(camera) {
            if (camera) {
                var m3dNode = Montage.create(Node);
                m3dNode.scene = this.view.scene;
                m3dNode.id = camera.node.baseId;
                this.view.viewPoint = m3dNode;
            } else {
                //FIXME: handle this case
                //this.view.viewPoint = null;
            }
        }
    },

    _playAnimation: { value: false, writable: true },

    playAnimation: {
        get: function() {
            return this._playAnimation;
        },
        set: function(flag) {
            this._playAnimation = flag;
            if (this.view) {
                if (flag) {
                    this.view.play();
                } else {
                    this.view.pause();
                }
            }
        }
    },

    run: {
        value: function(scenePath) {
            this.loadScene();
            if (this.view) {
                this.view.scenePath = scenePath;
            }
        }
    },

    loadScene: {
        value: function() {
            var self = this;
            var view = this.view;
            if (view) {
                if (view.sceneRenderer) {
                    if (view.sceneRenderer.scene) {
                        view.sceneRenderer.technique.rootPass.scene.rootNode.apply( function(node, parent) {
                            if (node.meshes) {
                                if (node.meshes.length) {
                                    node.meshes.forEach( function(mesh) {
                                        mesh.loadedPrimitivesCount = 0;
                                        mesh.step = 0;
                                    }, self);
                                }
                            }
                            return null;
                        } , true, null);
                    }
                }
            }
        }
    },

    /* View delegate methods*/

    sceneWillChange: {
        value: function() {
            var resourceManager = this.view.getResourceManager();
            if (resourceManager) {
                this.view.viewPoint = null;
                resourceManager.maxConcurrentRequests = this.concurrentRequests;
                resourceManager.bytesLimit = this.bytesLimit * 1024;
                resourceManager.reset();
            }
        }
    },

    sceneDidChange: {
        value: function() {
            if(this.view.scene) {
                this.loadScene();
                 var resourceManager = this.view.getResourceManager();
                 if (resourceManager) {
                     if (resourceManager.observers.length === 1) { //FIXME:...
                         resourceManager.observers.push(this);
                     }
                 }
                 this.camerasController.content = [];

                 var cameraNodes = [];
                 this.view.scene.glTFElement.rootNode.apply( function(node, parent, context) {
                     if (node.cameras) {
                         if (node.cameras.length)
                             cameraNodes = cameraNodes.concat(node);
                     }
                     return context;
                 } , true, null);

                 cameraNodes.forEach( function(cameraNode) {
                     this.camerasController.content.push( { "name": cameraNode.name, "node": cameraNode} );
                 }, this);
            }
        }
    },

    resourceAvailable: {
        value: function(resource) {
            if (resource.range && this.loading) {
                this.loadingProgress += ((resource.range[1] - resource.range[0])/this.view.totalBufferSize)*100;
                if (this.loadingProgress >= 99) {
                    this.loadingProgress = 0;
                    this.loading = false;
                }
            }
        }
    }

});
