var User = function (name, age, location, image) {
  this.name = name;
  this.age = age;
  this.location = location;
  this. = image;
  this.post = localStorage.getItem("post");
  this.key = "post";
}



function SaveRender() {}

SaveRender.prototype.saveToLs = function (input) {

  if (this.items) {
    items_json = JSON.parse(this.items)
  }
  else {
    items_json = [];
  }
  items_json.push(input);

  localStorage.setItem(this.key, JSON.stringify(items_json));

}

SaveRender.prototype.renderTemplate = function (template_source, where) {

  var items_json = JSON.parse(this.items);
  var template = _.template($(template_source).html());

  _.each(items_json, function(item){
    $(where).append(template(item));
  });

}