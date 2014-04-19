App.HTML5Store = function(config) {
    this.config = config || {};
    this.config.host = this.config.host || 'api.nitrogen.io';
    this.config.protocol = this.config.protocol || 'https';
    this.config.http_port = this.config.http_port || 443;

    this.storePath = config.host + "_" + config.http_port + ".store";
    this.load();
}

App.HTML5Store.prototype.load = function() {
  if (this.props) return;

  var propsJson = localStorage.getItem(this.storePath);

  if (!propsJson) {
      this.props = {};
      this.save();
  } else {
      this.props = JSON.parse(propsJson);
  }
};

App.HTML5Store.prototype.get = function(key, callback) {
    if (key in this.props) {
        return callback(null, this.props[key]);
    } else {
        return callback(null, null);
    }
};

App.HTML5Store.prototype.set = function(key, value, callback) {
    this.props[key] = value;
    this.save();
    callback();
};

App.HTML5Store.prototype.delete = function(key, value) {
    delete this.props[key];
    this.save();
};

App.HTML5Store.prototype.save = function() {
    localStorage.setItem(this.storePath, JSON.stringify(this.props));
};