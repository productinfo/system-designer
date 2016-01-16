/* 
 * System Designer
 * http://systemdesigner.io
 * @ecarriou
 *
 * Copyright (C) 2016 - Erwan Carriou
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

monoco.on('ready', function () {
    var system = this.system('design');

    // DIALOG IMPORT
    var DialogImport = this.require('DialogImport');
    DialogImport.on('init', function (config) {
        var html = '',
            dom = null;

        $('#monoco-dialog-import').empty();

        html = this.require('dialog-modal-import.html');
        document.querySelector('#monoco-dialog-import').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{message}}/gi, this.message())
            );
                
        //events
        dom = document.getElementById('monoco-dialog-import-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-import-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    DialogImport.on('show', function () {
        $('#monoco-dialog-import-modal').modal('show');
    });

    DialogImport.on('hide', function () {
        $('#monoco-dialog-import-modal').modal('hide');
    });
    
    // DIALOG CHECK
    var DialogCheck = this.require('DialogCheck');
    DialogCheck.on('init', function (config) {
        var html = '',
            dom = null;

        $('#monoco-dialog-check').empty();

        html = this.require('dialog-modal-check.html');
        document.querySelector('#monoco-dialog-check').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{message}}/gi, this.message())
            );

    });

    DialogCheck.on('show', function () {
        $('#monoco-dialog-check-modal').modal('show');
    });

    DialogCheck.on('hide', function () {
        $('#monoco-dialog-check-modal').modal('hide');
    });
    
    // DIALOG EXPORT
    var DialogExport = this.require('DialogExport');
    DialogExport.on('init', function (config) {
        var html = null,
            dom = null,
            sys = '';

        $('#monoco-dialog-export').empty();

        sys = this.require('db').collections().System.find({
            '_id': this.require('designer').system().id()
        })[0];

        html = this.require('dialog-modal-export.html');
        document.querySelector('#monoco-dialog-export').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{message}}/gi, window.location.toString().split('#')[0] + '?system=' + encodeURI(JSON.stringify(sys)))
            );
                
        //events
        dom = document.getElementById('monoco-dialog-export-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-export-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    DialogExport.on('show', function () {
        $('#monoco-dialog-export-modal').modal('show');
    });

    DialogExport.on('hide', function () {
        $('#monoco-dialog-export-modal').modal('hide');
    });
    
    // DIALOG COPYRIGHT
    var DialogCopyright = this.require('DialogCopyright');
    DialogCopyright.on('init', function (config) {
        var html = '',
            dom = null;

        $('#monoco-dialog-copyright').empty();

        html = this.require('dialog-modal-copyright.html');
        document.querySelector('#monoco-dialog-copyright').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{message}}/gi, this.message())
            );
                
        //events
        dom = document.getElementById('monoco-dialog-copyright-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    DialogCopyright.on('show', function () {
        $('#monoco-dialog-copyright-modal').modal('show');
    });

    DialogCopyright.on('hide', function () {
        $('#monoco-dialog-copyright-modal').modal('hide');
    });
    
    // DIALOG CONFIG
    var DialogConfig = this.require('DialogConfig');
    DialogConfig.on('init', function (config) {
        var html = '',
            dom = null,
            that = this,
            designer = that.require('designer');

        $('#monoco-dialog-config').empty();

        html = this.require('dialog-modal-config.html');
        document.querySelector('#monoco-dialog-config').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
            );
         
        // default value
        $('#monoco-dialog-type-config-isdebug')[0].checked = designer.debug();       
                
        //events
        dom = document.getElementById('monoco-dialog-config-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-config-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-type-config-reset');
        dom.addEventListener('click', function (event) {
            window.localStorage.clear();
            this.require('designer').workspace().refresh();
            this.require('message').success('system designer has been reseted.');
        }.bind(this));

        dom = document.getElementById('monoco-dialog-type-config-isdebug');
        dom.addEventListener('click', function (obj) {
            var designer = that.require('designer'),
                isEnum = false;

            isEnum = $('#monoco-dialog-type-config-isdebug')[0].checked;
            if (isEnum) {
                designer.debug(true);
            } else {
                designer.debug(false);
            }
        });
    });

    DialogConfig.on('show', function () {
        $('#monoco-dialog-config-modal').modal('show');
    });

    DialogConfig.on('hide', function () {
        $('#monoco-dialog-config-modal').modal('hide');
    });
    
    // DIALOG IMPORT FILE
    var DialogImportFile = this.require('DialogImportFile');
    DialogImportFile.on('init', function (config) {
        var html = '',
            dom = null,
            that = this,
            designer = that.require('designer');

        $('#monoco-dialog-import-file').empty();

        html = this.require('dialog-modal-import-file.html');
        document.querySelector('#monoco-dialog-import-file').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
            );
               
        //events
        dom = document.getElementById('monoco-dialog-import-file-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-import-file-modal-merge');
        dom.addEventListener('click', function (event) {
            this.mergeSystem();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-import-file-modal-import');
        dom.addEventListener('click', function (event) {
            this.importSystem();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-import-file-modal-file');
        dom.addEventListener('change', function (e) {
            e.stopPropagation();
            e.preventDefault();

            var files = e.target.files,
                reader = new FileReader(),
                json = '',
                that = this;

            reader.onload = function (event) {
                json = json + event.target.result;
            };
            reader.onloadend = function () {
                try {
                    that.data(JSON.parse(json));
                } catch (e) {
                    that.data({});
                }
            };
            reader.readAsText(files[0], 'UTF-8');
        }.bind(this));
    });

    DialogImportFile.on('show', function () {
        $('#monoco-dialog-import-file-modal').modal('show');
    });

    DialogImportFile.on('hide', function () {
        $('#monoco-dialog-import-file-modal').modal('hide');
    });
    
    // DIALOG DROP FILE
    var DialogDropFile = this.require('DialogDropFile');
    DialogDropFile.on('init', function (config) {
        var html = null,
            dom = null;

        $('#monoco-dialog-drop-file').empty();

        html = this.require('dialog-modal-drop-file.html');
        document.querySelector('#monoco-dialog-drop-file').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{message}}/gi, this.message())
            );
               
        //events
        dom = document.getElementById('monoco-dialog-drop-file-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-drop-file-modal-merge');
        dom.addEventListener('click', function (event) {
            this.mergeSystem();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-drop-file-modal-import');
        dom.addEventListener('click', function (event) {
            this.importSystem();
        }.bind(this));
    });

    DialogDropFile.on('mergeSystem', function () {
        var sys = null,
            name = '',
            modelName = '',
            designer = this.require('designer'),
            system = designer.system(),
            message = this.require('message');

        sys = this.data();

        for (name in sys.schemas) {
            system.schemas()[name] = sys.schemas[name];
        }

        for (name in sys.types) {
            system.types()[name] = sys.types[name];
        }

        for (name in sys.behaviors) {
            system.behaviors()[name] = sys.behaviors[name];
        }

        for (name in sys.components) {
            if (!system.components()[name]) {
                system.components()[name] = {};
            }
            for (modelName in sys.components[name]) {
                system.components()[name][modelName] = sys.components[name][modelName];
            }
        }

        designer.save();
        designer.workspace().refresh();

        this.hide();
        designer.save();
        message.success('merge of the system is done.');
    });

    DialogDropFile.on('importSystem', function () {
        var System = this.require('System'),
            sys = null,
            designer = this.require('designer'),
            message = this.require('message');

        if (designer.system()) {
            designer.system().destroy();
        }
        sys = new System(this.data());
        designer.system(sys);
        designer.save();
        designer.workspace().refresh();

        this.hide();
        designer.save();

        message.success('importation of the system is done.');
    });

    DialogDropFile.on('show', function () {
        $('#monoco-dialog-drop-file-modal').modal('show');
    });

    DialogDropFile.on('hide', function () {
        $('#monoco-dialog-drop-file-modal').modal('hide');
    });
    
    // DIALOG TYPE CREATION
    var dialogTypeCreation = this.require('DialogTypeCreation');
    dialogTypeCreation.on('init', function (config) {
        var html = '',
            dom = null;

        $('#monoco-dialog-type-creation').empty();

        html = this.require('dialog-modal-type-creation.html');
        document.querySelector('#monoco-dialog-type-creation').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
            );
                
        //events
        dom = document.getElementById('monoco-dialog-type-creation-name');
        dom.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                event.stopPropagation();
                event.preventDefault();
                if ($('#monoco-dialog-type-creation-name').val()) {
                    this.ok();
                }
                return false;
            }
        }.bind(this));

        dom = document.getElementById('monoco-dialog-type-creation-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-type-creation-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    dialogTypeCreation.on('show', function () {
        $('#monoco-dialog-type-creation-modal').modal('show');
    });

    dialogTypeCreation.on('hide', function () {
        $('#monoco-dialog-type-creation-modal').modal('hide');
    });
    
    // DIALOG SCHEMA CREATION
    var dialogSchemaCreation = this.require('DialogSchemaCreation');
    dialogSchemaCreation.on('init', function (config) {
        var html = '',
            dom = null;

        $('#monoco-dialog-schema-creation').empty();

        html = this.require('dialog-modal-schema-creation.html');
        document.querySelector('#monoco-dialog-schema-creation').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
            );
                
        //events
        dom = document.getElementById('monoco-dialog-schema-creation-name');
        dom.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                event.stopPropagation();
                event.preventDefault();
                if ($('#monoco-dialog-schema-creation-name').val()) {
                    this.ok();
                }
                return false;
            }
        }.bind(this));

        dom = document.getElementById('monoco-dialog-schema-creation-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-schema-creation-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    dialogSchemaCreation.on('show', function () {
        $('#monoco-dialog-schema-creation-modal').modal('show');
    });

    dialogSchemaCreation.on('hide', function () {
        $('#monoco-dialog-schema-creation-modal').modal('hide');
    });  
    
    // DIALOG SYSTEM CREATION
    var dialogSystemCreation = this.require('DialogSystemCreation');
    dialogSystemCreation.on('init', function (config) {
        var html = '',
            dom = null;

        $('#monoco-dialog-system-creation').empty();

        html = this.require('dialog-modal-system-creation.html');
        document.querySelector('#monoco-dialog-system-creation').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
            );
                
        //events
        dom = document.getElementById('monoco-dialog-system-creation-name');
        dom.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                event.stopPropagation();
                event.preventDefault();
                if ($('#monoco-dialog-system-creation-name').val()) {
                    this.ok();
                }
                return false;
            }
        }.bind(this));

        dom = document.getElementById('monoco-dialog-system-creation-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-system-creation-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    dialogSystemCreation.on('show', function () {
        $('#monoco-dialog-system-creation-modal').modal('show');
    });

    dialogSystemCreation.on('hide', function () {
        $('#monoco-dialog-system-creation-modal').modal('hide');
    });
      
    // DIALOG MODEL CREATION
    var dialogModelCreation = this.require('DialogModelCreation');
    dialogModelCreation.on('init', function (config) {
        var html = '',
            dom = null,
            selectSchemas = '',
            designer = this.require('designer'),
            schemas = designer.system().schemas();

        $('#monoco-dialog-model-creation').empty();

        for (name in schemas) {
            if (!schemas[name]._schema) {
                selectSchemas = selectSchemas + '<option value="' + name + '">' + name + '</option>';
            }
        }

        html = this.require('dialog-modal-model-creation.html');
        document.querySelector('#monoco-dialog-model-creation').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{schemas}}/gi, selectSchemas)
            );
                
        //events
        dom = document.getElementById('monoco-dialog-model-creation-name');
        dom.addEventListener('keydown', function (event) {
            if (event.keyCode === 13) {
                event.stopPropagation();
                event.preventDefault();
                if ($('#monoco-dialog-model-creation-name').val()) {
                    this.ok();
                }
                return false;
            }
        }.bind(this));

        dom = document.getElementById('monoco-dialog-model-creation-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-model-creation-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

    });

    dialogModelCreation.on('show', function () {
        $('#monoco-dialog-model-creation-modal').modal('show');
    });

    dialogModelCreation.on('hide', function () {
        $('#monoco-dialog-model-creation-modal').modal('hide');
    });  
    
    // DIALOG BEHAVIOR CREATION
    var dialogBehaviorCreation = this.require('DialogBehaviorCreation');
    dialogBehaviorCreation.on('init', function (config) {
        var html = '',
            dom = null,
            selectSchemas = '',
            selectStates = '',
            models = [],
            states = [],
            that = this,
            designer = this.require('designer'),
            schemas = designer.system().schemas();

        $('#monoco-dialog-behavior-creation').empty();

        for (name in schemas) {
            if (schemas[name]._schema) {
                models.push({
                    'name': name,
                    'schema': schemas[name]._schema
                });
            }
        }
        models.sort();
        models.forEach(
            function (nameDef) {
                selectSchemas = selectSchemas + '<option value="' + nameDef.name + '">' + nameDef.name + '</option>';
            });

        if (models.length) {
            states.push('init'); // TODO check if inherit from MonocoComponent
            for (name in designer.system().schemas()[models[0].name]) {
                switch (designer.system().schemas()[models[0].schema][name]) {
                    case 'property':
                    case 'collection':
                    case 'event':
                    case 'method':
                        states.push(name);
                        break;
                    default:
                        break;
                }
            }
        }

        states.sort();
        states.forEach(
            function (name) {
                selectStates = selectStates + '<option value="' + name + '">' + name + '</option>';
            });

        html = this.require('dialog-modal-behavior-creation.html');
        document.querySelector('#monoco-dialog-behavior-creation').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{models}}/gi, selectSchemas)
                .replace(/{{states}}/gi, selectStates)
            );
                
        //events
        dom = document.getElementById('monoco-dialog-behavior-creation-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-behavior-creation-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-behavior-creation-model');
        dom.addEventListener('change', function (obj) {
            var modelName = '',
                schemaName = '',
                att = '',
                methods = [],
                designer = that.require('designer'),
                schemas = designer.system().schemas();

            modelName = this.value;
            schemaName = schemas[modelName]._schema;

            $('#monoco-dialog-behavior-creation-state').empty();

            for (att in schemas[schemaName]) {
                if (schemas[schemaName][att] === 'method') {
                    methods.push(att);
                }
            }

            methods.push('init');
            methods.sort();
            methods.forEach(
                function (name) {
                    document.querySelector('#monoco-dialog-behavior-creation-state').insertAdjacentHTML('afterbegin',
                        '<option value="' + name + '">' + name + '</option>'
                        )
                });
        });

    });

    dialogBehaviorCreation.on('show', function () {
        $('#monoco-dialog-behavior-creation-modal').modal('show');
    });

    dialogBehaviorCreation.on('hide', function () {
        $('#monoco-dialog-behavior-creation-modal').modal('hide');
    }); 
    
    // DIALOG COMPONENT CREATION
    var dialogComponentCreation = this.require('DialogComponentCreation');
    dialogComponentCreation.on('init', function (config) {
        var html = '',
            dom = null,
            selectSchemas = '',
            designer = this.require('designer'),
            schemas = designer.system().schemas();

        $('#monoco-dialog-component-creation').empty();

        for (name in schemas) {
            if (schemas[name]._schema) {
                selectSchemas = selectSchemas + '<option value="' + name + '">' + name + '</option>';
            }
        }

        html = this.require('dialog-modal-component-creation.html');
        document.querySelector('#monoco-dialog-component-creation').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{models}}/gi, selectSchemas)
            );
                
        //events
        dom = document.getElementById('monoco-dialog-component-creation-modal-cancel');
        dom.addEventListener('click', function (event) {
            this.cancel();
        }.bind(this));

        dom = document.getElementById('monoco-dialog-component-creation-modal-ok');
        dom.addEventListener('click', function (event) {
            this.ok();
        }.bind(this));
    });

    dialogComponentCreation.on('show', function () {
        $('#monoco-dialog-component-creation-modal').modal('show');
    });

    dialogComponentCreation.on('hide', function () {
        $('#monoco-dialog-component-creation-modal').modal('hide');
    }); 
      
    // MODELSYSTEM
    var ModelSystem = this.require('ModelSystem');
    ModelSystem.on('render', function () {
        var html = null;
        var that = this;
        
        // html 
        html = this.require('model-system.html');

        document.querySelector('#monoco-workspace').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{_id}}/gi, this.uuid())
            );

        //events
        html = document.getElementsByClassName('monoco-model-system-open-' + this.uuid());
        html[0].addEventListener('click', function (event) {
            window.open('system.html?_id=' + that.uuid());
        });

        html = document.getElementsByClassName('monoco-model-system-design-' + this.uuid());
        html[0].addEventListener('click', function (event) {
            var designer = this.require('designer'),
                system = JSON.parse(window.localStorage.getItem(this.uuid())),
                System = this.require('System'),
                message = this.require('message');
            if (system) {
                designer.system(new System(system));
                message.success('the system \'' + system.name + '\' is ready to be designed.');
            }
        }.bind(this));

        html = document.getElementsByClassName('monoco-model-system-delete-' + this.uuid());
        html[0].addEventListener('click', function (event) {

            var systems = JSON.parse(window.localStorage.getItem('systems')),
                designer = this.require('designer'),
                System = this.require('System'),
                systemId = this.uuid(),
                message = this.require('message');
            
            // remove from localstorage
            window.localStorage.removeItem(systemId);
            systems.systems.splice(systems.systems.indexOf(systemId), 1);
            window.localStorage.setItem('systems', JSON.stringify(systems));

            designer.system().destroy();
             
            // set default system
            if (systems.systems.length) {
                designer.system(new System(JSON.parse(window.localStorage.getItem(systems.systems[0]))));
            }

            $('#monoco-system-' + this.uuid()).remove();
            this.destroy();
            message.success('the system has been destroyed.');
        }.bind(this));
    });

    ModelSystem.on('hide', function () {
        $('#monoco-system-' + this.uuid()).hide();
    });

    ModelSystem.on('show', function () {
        $('#monoco-system-' + this.uuid()).show();
    });
    
    // MODELTYPE
    var ModelType = this.require('ModelType');
    ModelType.on('render', function () {
        var html = null;
        var that = this;
        
        // html 
        html = this.require('model-type.html');

        document.querySelector('#monoco-workspace').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{id}}/gi, this.title())
            );

        //events
        html = document.getElementsByClassName('monoco-model-type-open-' + this.title());
        html[0].addEventListener('click', function (event) {
            window.open('type.html?_id=' + that.title());
        });

        html = document.getElementsByClassName('monoco-model-type-delete-' + this.title());
        html[0].addEventListener('click', function (event) {
            var designer = this.require('designer');
            delete designer.system().types()[this.title()];
            $('#monoco-type-' + this.title()).remove();
            this.destroy();
            designer.save();
            designer.require('message').success('the type has been destroyed.')
        }.bind(this));
    });

    ModelType.on('hide', function () {
        $('#monoco-type-' + this.title()).hide();
    });

    ModelType.on('show', function () {
        $('#monoco-type-' + this.title()).show();
    });
   
    // MODELSCHEMA
    var ModelSchema = this.require('ModelSchema');
    ModelSchema.on('render', function () {
        var html = null,
            that = this;
        
        // html 
        html = this.require('model-schema.html');

        document.querySelector('#monoco-workspace').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{id}}/gi, this.title())
            );

        //events
        html = document.getElementsByClassName('monoco-model-schema-open-' + this.title());
        html[0].addEventListener('click', function (event) {
            window.open('schema.html?_id=' + that.title());
        });

        html = document.getElementsByClassName('monoco-model-schema-delete-' + this.title());
        html[0].addEventListener('click', function (event) {
            var designer = this.require('designer');
            delete designer.system().schemas()[this.title()];
            $('#monoco-schema-' + this.title()).remove();
            this.destroy();
            designer.save();
            designer.require('message').success('the schema has been destroyed.')
        }.bind(this));
    });

    ModelSchema.on('hide', function () {
        $('#monoco-schema-' + this.title()).hide();
    });

    ModelSchema.on('show', function () {
        $('#monoco-schema-' + this.title()).show();
    });
    
    // MODELCLASS
    var ModelClass = this.require('ModelClass');
    ModelClass.on('render', function () {
        var html = null;
        var that = this;
        
        // html 
        html = this.require('model-class.html');

        document.querySelector('#monoco-workspace').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{id}}/gi, this.title())
            );

        //events
        html = document.getElementsByClassName('monoco-model-class-open-' + this.title());
        html[0].addEventListener('click', function (event) {
            window.open('model.html?_id=' + that.title());
        });

        html = document.getElementsByClassName('monoco-model-class-delete-' + this.title());
        html[0].addEventListener('click', function (event) {
            var designer = this.require('designer');
            delete designer.system().schemas()[this.title()];
            $('#monoco-class-' + this.title()).remove();
            this.destroy();
            designer.save();
            designer.require('message').success('the model has been destroyed.')
        }.bind(this));
    });

    ModelClass.on('hide', function () {
        $('#monoco-class-' + this.title()).hide();
    });

    ModelClass.on('show', function () {
        $('#monoco-class-' + this.title()).show();
    });
    
    // MODELBEHAVIOR
    var ModelBehavior = this.require('ModelBehavior');
    ModelBehavior.on('render', function () {
        var template = '',
            html = null,
            dom = null,
            that = this;
        
        // html 
        template = this.require('model-behavior.html');
        html = template.source().replace(/{{title}}/gi, this.title());
        html = html.replace(/{{_id}}/gi, this.uuid());

        document.querySelector('#monoco-workspace').insertAdjacentHTML('afterbegin', html);

        //events
        dom = document.getElementsByClassName('monoco-model-behavior-open-' + this.title());
        dom[0].addEventListener('click', function (event) {
            window.open('behavior.html?_id=' + that.uuid());
        });

        html = document.getElementsByClassName('monoco-model-behavior-delete-' + this.title());
        html[0].addEventListener('click', function (event) {
            var designer = this.require('designer');
            delete designer.system().behaviors()[this.uuid()];
            $('#monoco-behavior-' + this.uuid()).remove();
            this.destroy();
            designer.save();
            designer.require('message').success('the behavior has been destroyed.')
        }.bind(this));
    });

    ModelBehavior.on('hide', function () {
        $('#monoco-behavior-' + this.uuid()).hide();
    });

    ModelBehavior.on('show', function () {
        $('#monoco-behavior-' + this.uuid()).show();
    });
    
    // MODELCOMPONENT
    var ModelComponent = this.require('ModelComponent');
    ModelComponent.on('render', function () {
        var html = null;
        var that = this;
        
        // html 
        html = this.require('model-component.html');

        document.querySelector('#monoco-workspace').insertAdjacentHTML('afterbegin',
            html.source()
                .replace(/{{title}}/gi, this.title())
                .replace(/{{_id}}/gi, this.uuid())
            );

        //events
        html = document.getElementsByClassName('monoco-model-component-open-' + this.title());
        html[0].addEventListener('click', function (event) {
            window.open('component.html?_id=' + encodeURI(that.title()));
        });

        html = document.getElementsByClassName('monoco-model-component-delete-' + this.title());
        html[0].addEventListener('click', function (event) {
            var designer = this.require('designer');

            delete designer.system().components()[this.model()][this.uuid()];
            if (Object.keys(designer.system().components()[this.model()])) {
                delete designer.system().components()[this.model()];
            }
            $('#monoco-component-' + this.uuid()).remove();
            this.destroy();
            designer.save();
            designer.require('message').success('the component has been destroyed.')
        }.bind(this));
    });

    ModelComponent.on('hide', function () {
        $('#monoco-component-' + this.uuid()).hide();
    });

    ModelComponent.on('show', function () {
        $('#monoco-component-' + this.uuid()).show();
    });  
    
    // MenuBar
    var MenuBar = this.require('MenuBar');
    MenuBar.on('init', function (conf) {
        var menuHeader = [],
            menuItems = [],
            menuActions = [],
            menuSearch = [],
            self = this;
        
        // menu header
        menuHeader = this.require('db').collections().MenuHeader.find({
            "type": "designer"
        })
        this.header(this.require(menuHeader[0]._id));
        
        // menu items
        menuItems = this.require('db').collections().MenuItem.find({
            "type": "designer"
        })

        menuItems.sort(function (itemA, itemB) {
            if (itemA.position > itemB.position) {
                return 1;
            }
            if (itemA.position < itemB.position) {
                return -1;
            }
            return 0;
        });

        menuItems.forEach(function (menuItem) {
            var id = menuItem._id;
            self.items().push(self.require(id));
        });
        
        // menu actions
        menuActions = this.require('db').collections().MenuAction.find({
            "type": "designer"
        })

        menuSearch = this.require('db').collections().MenuSearch.find({
            "type": "designer"
        })

        menuActions = menuActions.concat(menuSearch);

        menuActions.sort(function (itemA, itemB) {
            if (itemA.position > itemB.position) {
                return 1;
            }
            if (itemA.position < itemB.position) {
                return -1;
            }
            return 0;
        });

        menuActions.forEach(function (menuAction) {
            var id = menuAction._id;
            self.actions().push(self.require(id));
        });

    });

    MenuBar.on('render', function () {
        var length = 0,
            i = 0,
            item = null,
            domHeader = document.getElementById('monoco-menubar-header'),
            domItems = document.getElementById('monoco-menubar-items'),
            domAction = document.getElementById('monoco-menubar-actions'),
            self = this;

        function _removeActive() {
            var length = 0,
                i = 0,
                item = null;

            length = domItems.children.length;
            for (i = 0; i < length; i++) {
                item = domItems.children[i];
                $(item).removeClass('active');
            }
        }
        
        // header
        domHeader.insertAdjacentHTML('afterbegin', this.header().html().source());
    
        // items
        this.items().forEach(function (item) {
            domItems.insertAdjacentHTML('beforeend', '<li>' + item.html().source() + '</>')
        });

        // events
        length = domItems.children.length;
        for (i = 0; i < length; i++) {
            item = domItems.children[i];
            item.addEventListener('click', function () {
                _removeActive();
                $(this).addClass('active');
            });
            item.addEventListener('click', function () {
                this.click();
            }.bind(self.items(i)));
        }

        // actions
        this.actions().forEach(function (action) {
            domAction.insertAdjacentHTML('afterbegin', '<li>' + action.html().source() + '</>')
        });
        
        // focus on first element
        if (length > 0) {
            this.designer().context(this.items(0).name());
            item = domItems.children[0];
            $(item).addClass('active');
        }

        var that = this;
        $('#monoco-menu-action-search').on('keyup', function (event) {
            var value = $('#monoco-menu-action-search').val();
            that.designer().filter(value);
        });
    });
    
    // ToolBar
    var ToolBar = this.require('ToolBar');
    ToolBar.on('init', function (conf) {
        var toolBarItems = [],
            self = this;
        
        // items
        toolBarItems = this.require('db').collections().ToolBarItem.find({
            "type": "designer"
        })

        // sort items
        toolBarItems.sort(function (itemA, itemB) {
            if (itemA.position > itemB.position) {
                return 1;
            }
            if (itemA.position < itemB.position) {
                return -1;
            }
            return 0;
        });

        toolBarItems.forEach(function (toolBarItem) {
            var id = toolBarItem._id;
            self.items().push(self.require(id));
        });
    });

    ToolBar.on('render', function () {
        var domItems = document.getElementById('monoco-toolbar-items'),
            i = 0,
            length = 0,
            item = null,
            self = this;
        
        // items
        this.items().forEach(function (item) {
            domItems.insertAdjacentHTML('beforeend', '<li>' + item.html().source() + '</>')
        });

        // events
        length = domItems.children.length;
        for (i = 0; i < length; i++) {
            item = domItems.children[i];
            item.addEventListener('click', function () {
                this.click();
            }.bind(self.items(i)));
        }
    });
    
    // Workspace
    var Workspace = this.require('Workspace');
    Workspace.on('init', function (conf) {
        var that = this;

        $('html')
            .on('dragenter dragover', false)
            .on('drop', function (e) {

                e.stopPropagation();
                e.preventDefault();
                var files = e.originalEvent.dataTransfer.files;
                var reader = new FileReader();
                var json = '';
                reader.onload = function (event) {
                    json += event.target.result;
                };
                reader.onloadend = function () {
                    var sys = JSON.parse(json);

                    var DialogDropFile = that.require('DialogDropFile');

                    DialogDropFile = new DialogDropFile({
                        'title': 'A system has been found',
                        'message': 'What do you want to do ?'
                    });
                    DialogDropFile.data(sys);
                    DialogDropFile.show();
                };
                reader.readAsText(files[0], "UTF-8");

            });
    });

    Workspace.on('create', function () {
        var Dialog = null,
            dialog = null,
            system = this.require('designer').system();

        switch (this.designer().context()) {
            case 'system':
                Dialog = this.require('DialogSystemCreation');
                dialog = new Dialog({
                    'title': 'Create a new system',
                })
                dialog.show();
                dialog.on('ok', function () {
                    var designer = this.require('designer'),
                        name = null,
                        uuid = '',
                        mainUuid = '',
                        system = {},
                        System = this.require('System'),
                        ModelSystem = null,
                        modelSystem = null,
                        message = this.require('message');
                        
                    // get value
                    name = $('#monoco-dialog-system-creation-name').val();

                    function generateId() {
                        function gen() {
                            return Math.floor((1 + Math.random()) * 0x10000).toString(16);
                        }
                        return gen() + gen() + gen();
                    }

                    uuid = generateId();
                    mainUuid = generateId();
                        
                    // set system
                    system = {
                        "name": name,
                        "master": false,
                        "subsystem": false,
                        "version": "0.0.1",
                        "description": "",
                        "schemas": {},
                        "behaviors": {},
                        "types": {},
                        "components": {},
                        "_id": uuid
                    };
                    
                    // add main method
                    system.behaviors[mainUuid] = {
                        "_id": mainUuid,
                        "component": uuid,
                        "state": "main",
                        "action": "function main() { \n}",
                        "useCoreAPI": false,
                        "core": false
                    };
                       
                    // add (TODO improve)
                    if (designer.system()) {
                        designer.system().destroy();
                    }

                    designer.system(new System(system));

                    ModelSystem = this.require('ModelSystem');
                    modelSystem = new ModelSystem({
                        'title': name
                    });
                    modelSystem.uuid(uuid);
                    this.hide();
                    modelSystem.render();
                    designer.save();

                    message.success('the system \'' + name + '\' has been created.');
                });
                break;
            case 'schemas':
                if (system && Object.keys(system).length) {
                    Dialog = this.require('DialogSchemaCreation');
                    dialog = new Dialog({
                        'title': 'Create a new schema',
                    })
                    dialog.show();
                    dialog.on('ok', function () {
                        var designer = this.require('designer'),
                            name = null,
                            schema = {},
                            ModelSchema = null,
                            modelSchema = null,
                            message = this.require('message');
                        
                        // get value
                        name = $('#monoco-dialog-schema-creation-name').val();
                        
                        // set schema
                        schema = {
                            "_id": name,
                            "_name": name,
                            "_inherit": ["MonocoComponentSchema"]
                        };
                    
                        // add (TODO improve)
                        designer.system().schemas()[name] = schema;

                        ModelSchema = this.require('ModelSchema');
                        modelSchema = new ModelSchema({
                            'title': name
                        });
                        this.hide();
                        modelSchema.render();
                        designer.save();

                        message.success('the schema \'' + name + '\' has been created.');
                    });
                }
                break;
            case 'models':
                if (system && Object.keys(system).length) {
                    Dialog = this.require('DialogModelCreation');
                    dialog = new Dialog({
                        'title': 'Create a new model',
                    })
                    dialog.show();
                    dialog.on('ok', function () {
                        var designer = this.require('designer'),
                            name = null,
                            schema = null,
                            model = {},
                            ModelClass = null,
                            modelClass = null,
                            message = this.require('message');
                    
                        // get value
                        name = $('#monoco-dialog-model-creation-name').val();
                        schema = $('#monoco-dialog-model-creation-schema').val();
                        
                        // set model
                        model = {
                            "_id": name,
                            "_name": name,
                            "_schema": schema,
                            "_inherit": ["MonocoComponent"]
                        };
                    
                        // prepare model
                        for (var att in designer.system().schemas()[schema]) {
                            switch (true) {
                                case designer.system().schemas()[schema][att] === 'property':
                                    model[att] = {
                                        "type": "string",
                                        "readOnly": false,
                                        "mandatory": false,
                                        "default": ""
                                    };
                                    break;
                                case designer.system().schemas()[schema][att] === 'method':
                                    model[att] = {
                                        "params": [
                                            {
                                                "name": "param",
                                                "type": "string",
                                                "mandatory": false
                                            }
                                        ],
                                        "result": "string"
                                    };
                                    break;
                                case designer.system().schemas()[schema][att] === 'event':
                                    model[att] = {
                                        "params": [
                                            {
                                                "name": "param",
                                                "type": "string",
                                                "mandatory": false
                                            }
                                        ]
                                    };
                                    break;
                                case designer.system().schemas()[schema][att] === 'collection':
                                    model[att] = {
                                        "type": ["string"],
                                        "readOnly": false,
                                        "mandatory": false,
                                        "default": []
                                    };
                                    break;
                                default:
                                    break;
                            }
                        }
                    
                        // add (TODO improve)
                        designer.system().schemas()[name] = model;

                        ModelClass = this.require('ModelClass');
                        modelClass = new ModelClass({
                            'title': name
                        });
                        this.hide();
                        modelClass.render();
                        designer.save();

                        message.success('the model \'' + name + '\' has been created.');
                    });
                }
                break;
            case 'types':
                if (system && Object.keys(system).length) {
                    Dialog = this.require('DialogTypeCreation');
                    dialog = new Dialog({
                        'title': 'Create a new type',
                    })
                    dialog.show();
                    dialog.on('ok', function () {
                        var designer = this.require('designer'),
                            name = null,
                            isEnum = false,
                            type = {},
                            ModelType = null,
                            modelType = null,
                            message = this.require('message');
                        
                        // get value
                        name = $('#monoco-dialog-type-creation-name').val();
                        isEnum = $('#monoco-dialog-type-creation-isEnum')[0].checked;
                        
                        // set system
                        if (isEnum) {
                            type = {
                                "name": name,
                                "type": "string",
                                "value": [""]
                            };
                        } else {
                            type = {
                                'name': name,
                                'type': 'object',
                                'schema': {
                                }
                            };
                        }
                    
                        // add (TODO improve)
                        designer.system().types()[name] = type;

                        ModelType = this.require('ModelType');
                        modelType = new ModelType({
                            'title': name
                        });
                        this.hide();
                        modelType.render();
                        designer.save();

                        message.success('the type \'' + name + '\' has been created.');
                    });
                }
                break;
            case 'components':
                if (system && Object.keys(system).length) {
                    Dialog = this.require('DialogComponentCreation');
                    dialog = new Dialog({
                        'title': 'Create a new component',
                    })
                    dialog.show();
                    dialog.on('ok', function () {
                        var designer = this.require('designer'),
                            schemas = designer.system().schemas(),
                            component = {},
                            ModelComponent = null,
                            modelComponent = null,
                            model = '',
                            uuid = '',
                            message = this.require('message');
                    
                        // get value
                        model = $('#monoco-dialog-component-creation-model').val();

                        function generateId() {
                            function gen() {
                                return Math.floor((1 + Math.random()) * 0x10000).toString(16);
                            }
                            return gen() + gen() + gen();
                        }

                        uuid = generateId();
                        
                        // set component
                        component = {
                            "_id": uuid,
                        };
                    
                        // set properties default values
                        var schemaName = schemas[model]._schema;
                        var schema = schemas[schemaName];
                        var propertyNames = [];

                        for (var att in schema) {
                            if (schema[att] === 'property') {
                                propertyNames.push(att);
                            }
                        }
                        propertyNames.sort();
                        length = propertyNames.length;
                        for (var i = 0; i < length; i++) {
                            component[propertyNames[i]] = schemas[model][propertyNames[i]].default;
                        } 

                        // add (TODO improve)
                        if (!designer.system().components()[model]) {
                            designer.system().components()[model] = {};
                        }
                        designer.system().components()[model][uuid] = component;

                        ModelComponent = this.require('ModelComponent');

                        modelComponent = new ModelComponent({
                            title: uuid.toString() + ' (' + model + ')'
                        });
                        modelComponent.model(model);
                        modelComponent.uuid(uuid.toString());

                        this.hide();
                        modelComponent.render();
                        designer.save();

                        message.success('the component \'' + uuid.toString() + ' (' + model + ')' + '\' has been created.');
                    });
                }
                break;
            case 'behaviors':
                if (system && Object.keys(system).length) {
                    Dialog = this.require('DialogBehaviorCreation');
                    dialog = new Dialog({
                        'title': 'Create a new behavior',
                    })
                    dialog.show();
                    dialog.on('ok', function () {
                        var designer = this.require('designer'),
                            schemas = designer.system().schemas(),
                            schemaModel = '',
                            methodDef = null,
                            behavior = {},
                            result = '',
                            body = '',
                            ModelBehavior = null,
                            modelBehavior = null,
                            model = '',
                            state = '',
                            uuid = '',
                            params = '',
                            i = 0,
                            length = 0,
                            message = this.require('message');
                    
                        // get value
                        model = $('#monoco-dialog-behavior-creation-model').val();
                        state = $('#monoco-dialog-behavior-creation-state').val();

                        function generateId() {
                            function gen() {
                                return Math.floor((1 + Math.random()) * 0x10000).toString(16);
                            }
                            return gen() + gen() + gen();
                        }

                        uuid = generateId();
                    
                        // schema
                        schemaModel = schemas[model]._schema;

                        // params
                        if (schemas[model][state]) {
                            methodDef = schemas[model][state].params;
                        }
                        if (methodDef && methodDef.length) {
                            length = methodDef.length;
                            for (i = 0; i < length; i++) {
                                if (i === 0) {
                                    params = methodDef[i].name;
                                } else {
                                    params = params + ', ' + methodDef[i].name;
                                }
                            }
                        }

                        if (schemas[schemaModel][state] === 'property') {
                            params = 'value';
                        }

                        if (schemas[schemaModel][state] === 'collection') {
                            params = 'size, value, event';
                        }

                        if (state === 'init') {
                            params = 'conf';
                        }
                    
                        // body
                        if (schemas[model][state]) {
                            result = schemas[model][state].result;
                        }
                        if (result) {
                            switch (result) {
                                case 'string':
                                    body = "\tvar result = '';\n\treturn result;\n";
                                    break;
                                case 'array':
                                    body = "\tvar result = [];\n\treturn result;\n";
                                    break;
                                case 'number':
                                    body = "\tvar result = 0;\n\treturn result;\n";
                                    break;
                                case 'object':
                                    body = "\tvar result = {};\n\treturn result;\n";
                                    break;
                                default:
                                    body = "\tvar result = {};\n\treturn result;\n";
                                    break;
                            }
                        }
                        
                        // set model
                        behavior = {
                            "_id": uuid,
                            "component": model,
                            "state": state,
                            "action": "function " + state + "(" + params + ") {\n" + body + "}",
                            "useCoreAPI": false,
                            "core": false
                        };
                    
                        // add (TODO improve)
                        designer.system().behaviors()[uuid] = behavior;

                        ModelBehavior = this.require('ModelBehavior');

                        modelBehavior = new ModelBehavior({
                            'uuid': uuid
                        });

                        modelBehavior.title(model + '.' + state);
                        this.hide();
                        modelBehavior.render();
                        designer.save();

                        message.success('the behavior \'' + model + '.' + state + '\' has been created.');
                    });
                }
                break;
            default:
                break;
        }
    });

    Workspace.on('refresh', function () {
        var ModelSystem = null,
            ModelSchema = null,
            ModelClass = null,
            schema = null,
            sys = null,
            name = '',
            modelclass = null,
            ModelType = null,
            type = null,
            className = '',
            ModelComponent = null,
            component = null,
            ModelBehavior = null,
            behavior = null,
            system = this.designer().system();
        if (system) {
            this.clear();
            switch (this.designer().context()) {
                case 'system':
                    var systems = JSON.parse(window.localStorage.getItem('systems')),
                        systemIds = [],
                        length = 0,
                        i = 0;

                    if (systems) {
                        systemIds = systems.systems;
                    }
                    length = systemIds.length;

                    for (i = 0; i < length; i++) {
                        system = JSON.parse(window.localStorage.getItem(systemIds[i]));
                        ModelSystem = this.require('ModelSystem');
                        sys = new ModelSystem({
                            'title': system.name
                        });
                        sys.uuid(system._id);
                        sys.render();
                    }
                    break;
                case 'schemas':
                    for (name in system.schemas()) {
                        if (typeof system.schemas()[name]._schema === 'undefined') {
                            ModelSchema = this.require('ModelSchema');
                            schema = new ModelSchema({
                                'title': name
                            });
                            schema.render();
                        }
                    }
                    break;
                case 'models':
                    for (name in system.schemas()) {
                        if (typeof system.schemas()[name]._schema !== 'undefined') {
                            ModelClass = this.require('ModelClass');
                            modelclass = new ModelClass({
                                'title': name
                            });
                            modelclass.render();
                        }
                    }
                    break;
                case 'types':
                    for (name in system.types()) {
                        ModelType = this.require('ModelType');
                        type = new ModelType({
                            'title': name
                        });
                        type.render();
                    }
                    break;
                case 'components':
                    for (className in system.components()) {
                        for (name in system.components()[className]) {
                            ModelComponent = this.require('ModelComponent');
                            component = new ModelComponent({
                                'title': name + ' (' + className + ')'
                            });
                            component.uuid(name);
                            component.model(className);
                            component.render();
                        }
                    }
                    break;
                case 'behaviors':
                    for (name in system.behaviors()) {
                        ModelBehavior = this.require('ModelBehavior');

                        behavior = new ModelBehavior({
                            'uuid': system.behaviors()[name]._id
                        });
                        behavior.title(system.behaviors()[name].component + '.' + system.behaviors()[name].state);
                        behavior.render();
                    }
                    break;
                default:
                    break;
            }
            // TODO IMPROVE REFRESH
            if (this.designer().filter()) {
                this.designer().filter(this.designer().filter());
            }
        }
    });

    Workspace.on('clear', function () {
        $('#monoco-workspace').empty();
    });
    
    // Server
    var Server = this.require('Server');
    Server.on('start', function () {
        var MonocoChannel = null,
            channel = null,
            Worker = null,
            worker = null;

        MonocoChannel = this.require('MonocoChannel');
        channel = new MonocoChannel({
            '_id': 'channel'
        });

        channel.on('send', function (message) {
            this.require('worker').worker().port.postMessage(message);
        });

        channel.on('getSystem', function (id) {
            if (id === this.require('designer').system().id()) {
                this.setSystem(id, this.require('db').collections().System.find({
                    '_id': id
                })[0]);
            } else {
                this.setSystem(id, JSON.parse(window.localStorage.getItem(id)));
            }
        });

        channel.on('getInitSystem', function (id) {
            if (id === this.require('designer').system().id()) {
                this.setInitSystem(id, this.require('db').collections().System.find({
                    '_id': id
                })[0]);
            } else {
                this.setInitSystem(id, JSON.parse(window.localStorage.getItem(id)));
            }
        });

        channel.on('getType', function (id) {
            this.setType(id, this.require('db').collections().System.find({
                '_id': this.require('designer').system().id()
            })[0].types[id]);
        });

        channel.on('getSchema', function (id) {
            this.setSchema(id, this.require('db').collections().System.find({
                '_id': this.require('designer').system().id()
            })[0].schemas[id]);
        });

        channel.on('getModel', function (id) {
            this.setModel(id, this.require('db').collections().System.find({
                '_id': this.require('designer').system().id()
            })[0].schemas[id]);
        });

        channel.on('getBehavior', function (id) {
            this.setBehavior(id, this.require('db').collections().System.find({
                '_id': this.require('designer').system().id()
            })[0].behaviors[id]);
        });

        channel.on('getComponent', function (id, collection) {
            this.setComponent(id, collection, this.require('db').collections().System.find({
                '_id': this.require('designer').system().id()
            })[0].components[collection][id], this.require('db').collections().System.find({
                '_id': this.require('designer').system().id()
            })[0].schemas[collection]);
        });

        channel.on('updateType', function (id, type) {
            var designer = this.require('designer');
            designer.system().types()[id] = type;
            designer.save();
        });

        channel.on('updateSchema', function (id, schema) {
            var designer = this.require('designer');
            designer.system().schemas()[id] = schema;
            designer.save();
        });

        channel.on('updateModel', function (id, model) {
            var designer = this.require('designer');
            designer.system().schemas()[id] = model;
            designer.save();
        });

        channel.on('updateBehavior', function (id, behavior) {
            var designer = this.require('designer');
            designer.system().behaviors()[id] = behavior;
            designer.save();
        });

        channel.on('updateComponent', function (id, collection, component) {
            var designer = this.require('designer');
            designer.system().components()[collection][id] = component;
            designer.save();
        });

        channel.on('updateSystem', function (id, system) {
            var System = this.require('System'),
                sys = null,
                designer = this.require('designer');

            if (designer.system()) {
                designer.system().destroy();
            }
            sys = new System(system);
            designer.system(sys);
            designer.save();
            designer.workspace().refresh();
        });

        channel.on('loadSystem', function (system) {
            var Dialog = null,
                dialog = null;

            Dialog = this.require('DialogImport');
            dialog = new Dialog({
                'title': 'A system has been found',
                'message': 'Do you want to import the system ?',
                'data': system
            })
            dialog.show();

            dialog.on('ok', function () {
                var System = this.require('System'),
                    sys = null,
                    designer = this.require('designer'),
                    message = this.require('message');

                if (designer.system()) {
                    designer.system().destroy();
                }
                sys = new System(this.data());
                designer.system(sys);
                designer.save();
                designer.workspace().refresh();

                this.hide();
                designer.save();

                message.success('importation of the system is done.');
            });
        });
        
        // DEBUG
        channel.on('updateBehavior', function (id, behavior) {
            var designer = this.require('designer');
            if (designer.debug()) {
                this.require(id).action(behavior.action);
            }
        });
        channel.on('sync', function () {
            var System = null,
                system = null,
                designer = this.require('designer');

            if (designer.debug()) {
                system = this.require('db').system();
                if (designer.system()) {
                    designer.system().destroy();
                }
                System = this.require('System');
                designer.system(new System(JSON.parse(system)));
                designer.save();
                designer.workspace().refresh();
            }
        });

        Worker = this.require('Worker');
        worker = new Worker({
            "_id": "worker",
            "worker": new SharedWorker('./scripts/worker.js'),
        });
        worker.worker().port.onmessage = function (e) {
            $db.MonocoMessage.insert(e.data);
        }

    }, true);

    // Designer
    var Designer = this.require('Designer');
    Designer.on('init', function (conf) {
        var MenuBar = null,
            menubar = null,
            ToolBar = null,
            toolbar = null,
            Workspace = null,
            workspace = null,
            System = null,
            Server = null,
            server = null;
      
        // menu
        MenuBar = this.require('MenuBar');
        menubar = new MenuBar({
            designer: this
        });
        ToolBar = this.require('ToolBar');
        toolbar = new ToolBar({
            designer: this
        });
        
        // workspace
        Workspace = this.require('Workspace');
        workspace = new Workspace({
            designer: this
        });
        
        // server
        Server = this.require('Server');
        server = new Server({
            'designer': this
        });

        this.menubar(menubar);
        this.toolbar(toolbar);
        this.workspace(workspace);
        this.server(server);
        
        // message
        this.require('monoco').on('warning', function (message) {
            this.require('message').warning(message);
        });
        this.require('monoco').on('error', function (error) {
            this.require('message').danger(error.message);
        });
        
        // system
        System = this.require('System');
        var systems = JSON.parse(window.localStorage.getItem('systems'));
        
        // case of url
        if (document.location.search.split('?')[1]) {
            var systemParam = JSON.parse(decodeURI(document.location.search.split('?')[1].split('system=')[1]));
            var sys = null;

            sys = new System(systemParam);
            this.system(sys);
            this.save();
            this.refresh();
            this.require('message').success('the system \'' + systemParam.name + '\' was imported');
        } else {
            if (systems) {
                this.system(new System(JSON.parse(window.localStorage.getItem(systems.systems[0]))));
                this.refresh();
            }
        }
        this.check();
    });

    Designer.on('check', function () {
        var Dialog = null,
            dialog = null;

        if (typeof SharedWorker === 'undefined') {
            Dialog = this.require('DialogCheck');
            dialog = new Dialog({
                'title': 'Hem... You will laugh',
                'message': 'Your browser has not all the features to use correctly System Designer.<br><br>Please use:<br><br>- Mozilla Firefox (recommended), <br>- Google Chrome, <br>- or Opera.<br><br>'
            })
            dialog.show();
        }
    });

    Designer.on('render', function () {
        this.menubar().render();
        this.toolbar().render();
    });

    Designer.on('filter', function (val) {
        var result = [],
            collectionName = '';

        switch (this.context()) {
            case 'behaviors':
                collectionName = 'ModelBehavior';
                break;
            case 'schemas':
                collectionName = 'ModelSchema';
                break;
            case 'types':
                collectionName = 'ModelType';
                break;
            case 'models':
                collectionName = 'ModelClass';
                break;
            case 'components':
                collectionName = 'ModelComponent';
                break;
            case 'system':
                collectionName = 'ModelSystem';
                break;
            default:
                break;
        }

        var resultTemp = this.require('db').collections()[collectionName].find({});
        for (var index = 0; index < resultTemp.length; index++) {
            result.push(this.require(resultTemp[index]._id));
        }
        if (val.length > 0) {
            result.forEach(function (model) {
                if (model.title().toLowerCase().indexOf(val.toLowerCase()) === -1) {
                    model.hide();
                } else {
                    model.show();
                }
            });
        } else {
            result.forEach(function (model) {
                model.show();
            });
        }


    });

    Designer.on('context', function (val) {
        this.workspace().clear();
        this.workspace().refresh();
    });

    Designer.on('save', function () {
        var systems = JSON.parse(window.localStorage.getItem('systems')),
            designer = this.require('designer'),
            system = this.require('db').collections().System.find({
                '_id': designer.system().id()
            })[0],
            systemId = system._id;
        
        // save system
        window.localStorage.setItem(systemId, JSON.stringify(system));
        
        // save index
        if (!systems) {
            systems = { 'systems': [systemId] };
        } else {
            if (systems.systems.indexOf(systemId) === -1) {
                systems.systems.push(systemId);
            }
        }
        window.localStorage.setItem('systems', JSON.stringify(systems));
    });

    // main
    system.on('main', function () {
        var Designer = null,
            designer = null;

        Designer = this.require('Designer');
        designer = new Designer({
            '_id': 'designer'
        });
        designer.render();
        designer.server().start();
    });

    system.main();
});