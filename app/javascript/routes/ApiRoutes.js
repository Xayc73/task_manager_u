/*
File generated by js-routes 1.4.9
Based on Rails 6.0.3.3 routes of App::Application
 */

(function() {
  var DeprecatedGlobbingBehavior, NodeTypes, ParameterMissing, ReservedOptions, SpecialOptionsKey, UriEncoderSegmentRegex, Utils, result, root,
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  ParameterMissing = function(message, fileName, lineNumber) {
    var instance;
    instance = new Error(message, fileName, lineNumber);
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    } else {
      instance.__proto__ = this.__proto__;
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(instance, ParameterMissing);
    }
    return instance;
  };

  ParameterMissing.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Error,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ParameterMissing, Error);
  } else {
    ParameterMissing.__proto__ = Error;
  }

  NodeTypes = {"GROUP":1,"CAT":2,"SYMBOL":3,"OR":4,"STAR":5,"LITERAL":6,"SLASH":7,"DOT":8};

  DeprecatedGlobbingBehavior = false;

  SpecialOptionsKey = "_options";

  UriEncoderSegmentRegex = /[^a-zA-Z0-9\-\._~!\$&'\(\)\*\+,;=:@]/g;

  ReservedOptions = ['anchor', 'trailing_slash', 'subdomain', 'host', 'port', 'protocol'];

  Utils = {
    configuration: {
      prefix: "",
      default_url_options: {},
      special_options_key: "_options",
      serializer: null
    },
    default_serializer: function(object, prefix) {
      var element, i, j, key, len, prop, s;
      if (prefix == null) {
        prefix = null;
      }
      if (object == null) {
        return "";
      }
      if (!prefix && !(this.get_object_type(object) === "object")) {
        throw new Error("Url parameters should be a javascript hash");
      }
      s = [];
      switch (this.get_object_type(object)) {
        case "array":
          for (i = j = 0, len = object.length; j < len; i = ++j) {
            element = object[i];
            s.push(this.default_serializer(element, prefix + "[]"));
          }
          break;
        case "object":
          for (key in object) {
            if (!hasProp.call(object, key)) continue;
            prop = object[key];
            if ((prop == null) && (prefix != null)) {
              prop = "";
            }
            if (prop != null) {
              if (prefix != null) {
                key = prefix + "[" + key + "]";
              }
              s.push(this.default_serializer(prop, key));
            }
          }
          break;
        default:
          if (object != null) {
            s.push((encodeURIComponent(prefix.toString())) + "=" + (encodeURIComponent(object.toString())));
          }
      }
      if (!s.length) {
        return "";
      }
      return s.join("&");
    },
    serialize: function(object) {
      var custom_serializer;
      custom_serializer = this.configuration.serializer;
      if ((custom_serializer != null) && this.get_object_type(custom_serializer) === "function") {
        return custom_serializer(object);
      } else {
        return this.default_serializer(object);
      }
    },
    clean_path: function(path) {
      var last_index;
      path = path.split("://");
      last_index = path.length - 1;
      path[last_index] = path[last_index].replace(/\/+/g, "/");
      return path.join("://");
    },
    extract_options: function(number_of_params, args) {
      var last_el, options;
      last_el = args[args.length - 1];
      if ((args.length > number_of_params && last_el === void 0) || ((last_el != null) && "object" === this.get_object_type(last_el) && !this.looks_like_serialized_model(last_el))) {
        options = args.pop() || {};
        delete options[this.configuration.special_options_key];
        return options;
      } else {
        return {};
      }
    },
    looks_like_serialized_model: function(object) {
      return !object[this.configuration.special_options_key] && ("id" in object || "to_param" in object);
    },
    path_identifier: function(object) {
      var property;
      if (object === 0) {
        return "0";
      }
      if (!object) {
        return "";
      }
      property = object;
      if (this.get_object_type(object) === "object") {
        if ("to_param" in object) {
          if (object.to_param == null) {
            throw new ParameterMissing("Route parameter missing: to_param");
          }
          property = object.to_param;
        } else if ("id" in object) {
          if (object.id == null) {
            throw new ParameterMissing("Route parameter missing: id");
          }
          property = object.id;
        } else {
          property = object;
        }
        if (this.get_object_type(property) === "function") {
          property = property.call(object);
        }
      }
      return property.toString();
    },
    clone: function(obj) {
      var attr, copy, key;
      if ((obj == null) || "object" !== this.get_object_type(obj)) {
        return obj;
      }
      copy = obj.constructor();
      for (key in obj) {
        if (!hasProp.call(obj, key)) continue;
        attr = obj[key];
        copy[key] = attr;
      }
      return copy;
    },
    merge: function() {
      var tap, xs;
      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      tap = function(o, fn) {
        fn(o);
        return o;
      };
      if ((xs != null ? xs.length : void 0) > 0) {
        return tap({}, function(m) {
          var j, k, len, results, v, x;
          results = [];
          for (j = 0, len = xs.length; j < len; j++) {
            x = xs[j];
            results.push((function() {
              var results1;
              results1 = [];
              for (k in x) {
                v = x[k];
                results1.push(m[k] = v);
              }
              return results1;
            })());
          }
          return results;
        });
      }
    },
    normalize_options: function(parts, required_parts, default_options, actual_parameters) {
      var i, j, key, len, options, part, parts_options, result, route_parts, url_parameters, use_all_parts, value;
      options = this.extract_options(parts.length, actual_parameters);
      if (actual_parameters.length > parts.length) {
        throw new Error("Too many parameters provided for path");
      }
      use_all_parts = actual_parameters.length > required_parts.length;
      parts_options = {};
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        use_all_parts = true;
        if (this.indexOf(parts, key) >= 0) {
          parts_options[key] = value;
        }
      }
      options = this.merge(this.configuration.default_url_options, default_options, options);
      result = {};
      url_parameters = {};
      result['url_parameters'] = url_parameters;
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        value = options[key];
        if (this.indexOf(ReservedOptions, key) >= 0) {
          result[key] = value;
        } else {
          url_parameters[key] = value;
        }
      }
      route_parts = use_all_parts ? parts : required_parts;
      i = 0;
      for (j = 0, len = route_parts.length; j < len; j++) {
        part = route_parts[j];
        if (i < actual_parameters.length) {
          if (!parts_options.hasOwnProperty(part)) {
            url_parameters[part] = actual_parameters[i];
            ++i;
          }
        }
      }
      return result;
    },
    build_route: function(parts, required_parts, default_options, route, full_url, args) {
      var options, parameters, result, url, url_params;
      args = Array.prototype.slice.call(args);
      options = this.normalize_options(parts, required_parts, default_options, args);
      parameters = options['url_parameters'];
      result = "" + (this.get_prefix()) + (this.visit(route, parameters));
      url = Utils.clean_path(result);
      if (options['trailing_slash'] === true) {
        url = url.replace(/(.*?)[\/]?$/, "$1/");
      }
      if ((url_params = this.serialize(parameters)).length) {
        url += "?" + url_params;
      }
      url += options.anchor ? "#" + options.anchor : "";
      if (full_url) {
        url = this.route_url(options) + url;
      }
      return url;
    },
    visit: function(route, parameters, optional) {
      var left, left_part, right, right_part, type, value;
      if (optional == null) {
        optional = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return this.visit(left, parameters, true);
        case NodeTypes.STAR:
          return this.visit_globbing(left, parameters, true);
        case NodeTypes.LITERAL:
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
          return left;
        case NodeTypes.CAT:
          left_part = this.visit(left, parameters, optional);
          right_part = this.visit(right, parameters, optional);
          if (optional && ((this.is_optional_node(left[0]) && !left_part) || ((this.is_optional_node(right[0])) && !right_part))) {
            return "";
          }
          return "" + left_part + right_part;
        case NodeTypes.SYMBOL:
          value = parameters[left];
          delete parameters[left];
          if (value != null) {
            return this.encode_segment(this.path_identifier(value));
          }
          if (optional) {
            return "";
          } else {
            throw new ParameterMissing("Route parameter missing: " + left);
          }
          break;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    encode_segment: function(segment) {
      return segment.replace(UriEncoderSegmentRegex, function(str) {
        return encodeURIComponent(str);
      });
    },
    is_optional_node: function(node) {
      return this.indexOf([NodeTypes.STAR, NodeTypes.SYMBOL, NodeTypes.CAT], node) >= 0;
    },
    build_path_spec: function(route, wildcard) {
      var left, right, type;
      if (wildcard == null) {
        wildcard = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return "(" + (this.build_path_spec(left)) + ")";
        case NodeTypes.CAT:
          return "" + (this.build_path_spec(left)) + (this.build_path_spec(right));
        case NodeTypes.STAR:
          return this.build_path_spec(left, true);
        case NodeTypes.SYMBOL:
          if (wildcard === true) {
            return "" + (left[0] === '*' ? '' : '*') + left;
          } else {
            return ":" + left;
          }
          break;
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
        case NodeTypes.LITERAL:
          return left;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    visit_globbing: function(route, parameters, optional) {
      var left, right, type, value;
      type = route[0], left = route[1], right = route[2];
      value = parameters[left];
      delete parameters[left];
      if (value == null) {
        return this.visit(route, parameters, optional);
      }
      value = (function() {
        switch (this.get_object_type(value)) {
          case "array":
            return value.join("/");
          default:
            return value;
        }
      }).call(this);
      if (DeprecatedGlobbingBehavior) {
        return this.path_identifier(value);
      } else {
        return encodeURI(this.path_identifier(value));
      }
    },
    get_prefix: function() {
      var prefix;
      prefix = this.configuration.prefix;
      if (prefix !== "") {
        prefix = (prefix.match("/$") ? prefix : prefix + "/");
      }
      return prefix;
    },
    route: function(parts_table, default_options, route_spec, full_url) {
      var j, len, part, parts, path_fn, ref, required, required_parts;
      required_parts = [];
      parts = [];
      for (j = 0, len = parts_table.length; j < len; j++) {
        ref = parts_table[j], part = ref[0], required = ref[1];
        parts.push(part);
        if (required) {
          required_parts.push(part);
        }
      }
      path_fn = function() {
        return Utils.build_route(parts, required_parts, default_options, route_spec, full_url, arguments);
      };
      path_fn.required_params = required_parts;
      path_fn.toString = function() {
        return Utils.build_path_spec(route_spec);
      };
      return path_fn;
    },
    route_url: function(route_defaults) {
      var hostname, port, protocol, subdomain;
      if (typeof route_defaults === 'string') {
        return route_defaults;
      }
      hostname = route_defaults.host || Utils.current_host();
      if (!hostname) {
        return '';
      }
      subdomain = route_defaults.subdomain ? route_defaults.subdomain + '.' : '';
      protocol = route_defaults.protocol || Utils.current_protocol();
      port = route_defaults.port || (!route_defaults.host ? Utils.current_port() : void 0);
      port = port ? ":" + port : '';
      return protocol + "://" + subdomain + hostname + port;
    },
    has_location: function() {
      return (typeof window !== "undefined" && window !== null ? window.location : void 0) != null;
    },
    current_host: function() {
      if (this.has_location()) {
        return window.location.hostname;
      } else {
        return null;
      }
    },
    current_protocol: function() {
      if (this.has_location() && window.location.protocol !== '') {
        return window.location.protocol.replace(/:$/, '');
      } else {
        return 'http';
      }
    },
    current_port: function() {
      if (this.has_location() && window.location.port !== '') {
        return window.location.port;
      } else {
        return '';
      }
    },
    _classToTypeCache: null,
    _classToType: function() {
      var j, len, name, ref;
      if (this._classToTypeCache != null) {
        return this._classToTypeCache;
      }
      this._classToTypeCache = {};
      ref = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
      for (j = 0, len = ref.length; j < len; j++) {
        name = ref[j];
        this._classToTypeCache["[object " + name + "]"] = name.toLowerCase();
      }
      return this._classToTypeCache;
    },
    get_object_type: function(obj) {
      if (root.jQuery && (root.jQuery.type != null)) {
        return root.jQuery.type(obj);
      }
      if (obj == null) {
        return "" + obj;
      }
      if (typeof obj === "object" || typeof obj === "function") {
        return this._classToType()[Object.prototype.toString.call(obj)] || "object";
      } else {
        return typeof obj;
      }
    },
    indexOf: function(array, element) {
      if (Array.prototype.indexOf) {
        return array.indexOf(element);
      } else {
        return this.indexOfImplementation(array, element);
      }
    },
    indexOfImplementation: function(array, element) {
      var el, i, j, len, result;
      result = -1;
      for (i = j = 0, len = array.length; j < len; i = ++j) {
        el = array[i];
        if (el === element) {
          result = i;
        }
      }
      return result;
    },
    namespace: function(root, namespace, routes) {
      var index, j, len, part, parts;
      parts = namespace ? namespace.split(".") : [];
      if (parts.length === 0) {
        return routes;
      }
      for (index = j = 0, len = parts.length; j < len; index = ++j) {
        part = parts[index];
        if (index < parts.length - 1) {
          root = (root[part] || (root[part] = {}));
        } else {
          return root[part] = routes;
        }
      }
    },
    configure: function(new_config) {
      return this.configuration = this.merge(this.configuration, new_config);
    },
    config: function() {
      return this.clone(this.configuration);
    },
    make: function() {
      var routes;
      routes = {
// admin_user => /admin/users/:id(.:format)
  // function(id, options)
  adminUserPath: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// admin_users => /admin/users(.:format)
  // function(options)
  adminUsersPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// api_v1_task => /api/v1/tasks/:id(.:format)
  // function(id, options)
  apiV1TaskPath: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v1",false],[2,[7,"/",false],[2,[6,"tasks",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// api_v1_tasks => /api/v1/tasks(.:format)
  // function(options)
  apiV1TasksPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v1",false],[2,[7,"/",false],[2,[6,"tasks",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// api_v1_user => /api/v1/users/:id(.:format)
  // function(id, options)
  apiV1UserPath: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v1",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// api_v1_users => /api/v1/users(.:format)
  // function(options)
  apiV1UsersPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"api",false],[2,[7,"/",false],[2,[6,"v1",false],[2,[7,"/",false],[2,[6,"users",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// board => /board(.:format)
  // function(options)
  boardPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"board",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// developers => /developers(.:format)
  // function(options)
  developersPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"developers",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// edit_admin_user => /admin/users/:id/edit(.:format)
  // function(id, options)
  editAdminUserPath: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// edit_rails_conductor_inbound_email => /rails/conductor/action_mailbox/inbound_emails/:id/edit(.:format)
  // function(id, options)
  editRailsConductorInboundEmailPath: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"conductor",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[2,[7,"/",false],[2,[3,"id",false],[2,[7,"/",false],[2,[6,"edit",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
// new_admin_user => /admin/users/new(.:format)
  // function(options)
  newAdminUserPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"admin",false],[2,[7,"/",false],[2,[6,"users",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// new_developer => /developers/new(.:format)
  // function(options)
  newDeveloperPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"developers",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// new_rails_conductor_inbound_email => /rails/conductor/action_mailbox/inbound_emails/new(.:format)
  // function(options)
  newRailsConductorInboundEmailPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"conductor",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
// new_session => /session/new(.:format)
  // function(options)
  newSessionPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"session",false],[2,[7,"/",false],[2,[6,"new",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// rails_blob_representation => /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format)
  // function(signed_blob_id, variation_key, filename, options)
  railsBlobRepresentationPath: Utils.route([["signed_blob_id",true],["variation_key",true],["filename",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"active_storage",false],[2,[7,"/",false],[2,[6,"representations",false],[2,[7,"/",false],[2,[3,"signed_blob_id",false],[2,[7,"/",false],[2,[3,"variation_key",false],[2,[7,"/",false],[2,[5,[3,"filename",false],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]]]),
// rails_conductor_inbound_email => /rails/conductor/action_mailbox/inbound_emails/:id(.:format)
  // function(id, options)
  railsConductorInboundEmailPath: Utils.route([["id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"conductor",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[2,[7,"/",false],[2,[3,"id",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
// rails_conductor_inbound_email_reroute => /rails/conductor/action_mailbox/:inbound_email_id/reroute(.:format)
  // function(inbound_email_id, options)
  railsConductorInboundEmailReroutePath: Utils.route([["inbound_email_id",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"conductor",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[3,"inbound_email_id",false],[2,[7,"/",false],[2,[6,"reroute",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
// rails_conductor_inbound_emails => /rails/conductor/action_mailbox/inbound_emails(.:format)
  // function(options)
  railsConductorInboundEmailsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"conductor",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// rails_direct_uploads => /rails/active_storage/direct_uploads(.:format)
  // function(options)
  railsDirectUploadsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"active_storage",false],[2,[7,"/",false],[2,[6,"direct_uploads",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// rails_disk_service => /rails/active_storage/disk/:encoded_key/*filename(.:format)
  // function(encoded_key, filename, options)
  railsDiskServicePath: Utils.route([["encoded_key",true],["filename",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"active_storage",false],[2,[7,"/",false],[2,[6,"disk",false],[2,[7,"/",false],[2,[3,"encoded_key",false],[2,[7,"/",false],[2,[5,[3,"filename",false],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
// rails_info => /rails/info(.:format)
  // function(options)
  railsInfoPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"info",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// rails_info_properties => /rails/info/properties(.:format)
  // function(options)
  railsInfoPropertiesPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"info",false],[2,[7,"/",false],[2,[6,"properties",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// rails_info_routes => /rails/info/routes(.:format)
  // function(options)
  railsInfoRoutesPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"info",false],[2,[7,"/",false],[2,[6,"routes",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]),
// rails_mailers => /rails/mailers(.:format)
  // function(options)
  railsMailersPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"mailers",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]),
// rails_mailgun_inbound_emails => /rails/action_mailbox/mailgun/inbound_emails/mime(.:format)
  // function(options)
  railsMailgunInboundEmailsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"mailgun",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[2,[7,"/",false],[2,[6,"mime",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
// rails_mandrill_inbound_emails => /rails/action_mailbox/mandrill/inbound_emails(.:format)
  // function(options)
  railsMandrillInboundEmailsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"mandrill",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// rails_mandrill_inbound_health_check => /rails/action_mailbox/mandrill/inbound_emails(.:format)
  // function(options)
  railsMandrillInboundHealthCheckPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"mandrill",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// rails_postmark_inbound_emails => /rails/action_mailbox/postmark/inbound_emails(.:format)
  // function(options)
  railsPostmarkInboundEmailsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"postmark",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// rails_relay_inbound_emails => /rails/action_mailbox/relay/inbound_emails(.:format)
  // function(options)
  railsRelayInboundEmailsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"relay",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// rails_sendgrid_inbound_emails => /rails/action_mailbox/sendgrid/inbound_emails(.:format)
  // function(options)
  railsSendgridInboundEmailsPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"action_mailbox",false],[2,[7,"/",false],[2,[6,"sendgrid",false],[2,[7,"/",false],[2,[6,"inbound_emails",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]),
// rails_service_blob => /rails/active_storage/blobs/:signed_id/*filename(.:format)
  // function(signed_id, filename, options)
  railsServiceBlobPath: Utils.route([["signed_id",true],["filename",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"active_storage",false],[2,[7,"/",false],[2,[6,"blobs",false],[2,[7,"/",false],[2,[3,"signed_id",false],[2,[7,"/",false],[2,[5,[3,"filename",false],false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]]]]),
// root => /
  // function(options)
  rootPath: Utils.route([], {}, [7,"/",false]),
// session => /session(.:format)
  // function(options)
  sessionPath: Utils.route([["format",false]], {}, [2,[7,"/",false],[2,[6,"session",false],[1,[2,[8,".",false],[3,"format",false]],false]]]),
// update_rails_disk_service => /rails/active_storage/disk/:encoded_token(.:format)
  // function(encoded_token, options)
  updateRailsDiskServicePath: Utils.route([["encoded_token",true],["format",false]], {}, [2,[7,"/",false],[2,[6,"rails",false],[2,[7,"/",false],[2,[6,"active_storage",false],[2,[7,"/",false],[2,[6,"disk",false],[2,[7,"/",false],[2,[3,"encoded_token",false],[1,[2,[8,".",false],[3,"format",false]],false]]]]]]]]])}
;
      routes.configure = function(config) {
        return Utils.configure(config);
      };
      routes.config = function() {
        return Utils.config();
      };
      Object.defineProperty(routes, 'defaults', {
        get: function() {
          throw new Error("Routes" + ".defaults is removed. Use " + "Routes" + ".configure() instead.");
        },
        set: function(value) {}
      });
      routes.default_serializer = function(object, prefix) {
        return Utils.default_serializer(object, prefix);
      };
      return Utils.namespace(root, "Routes", routes);
    }
  };

  result = Utils.make();

  if (typeof define === "function" && define.amd) {
    define([], function() {
      return result;
    });
  }

  return result;

}).call(this);
