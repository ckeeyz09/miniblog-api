//CONSTRUCTORS

var User = function (name, handle, age, location, image) {
  this.name = name;
  this.handle = handle;
  this.age = age;
  this.location = location;
  this.image = image;
  this.post = localStorage.getItem("post");
  this.key = "post";
}

//For use at a later date
// var Company = function (name, location, size, titles, image) {
//   this.name = name;
//   this.location = location;
//   this.size = size;
//   this.titles = titles;
//   this.image = image;
// }

// var Developer = function (name, job, company, current_project) {
//   this.name = name;
//   this.job = job;
//   this.company = company;
//   this.project = current_project;
// }

//LOCAL STORAGE

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

//RENDER TO TEMPLATE

SaveRender.prototype.renderTemplate = function (template_source, where) {

  var items_json = JSON.parse(this.items);
  var template = _.template($(template_source).html());

  _.each(items_json, function(item){
    $(where).append(template(item));
  });


