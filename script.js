//CONSTRUCTORS

var User = function (name, age, location, image,favorite_game,) {
  this.name = name;
  this.age = age;
  this.location = location;
  this.image = image;
  this.favGame = favorite_game;
  this.post = localStorage.getItem("post");
  this.key = "post";
}

var Company = function (name, location, size, titles, image) {
  this.name = name;
  this.location = location;
  this.size = size;
  this.titles = titles;
  this.image = image;
}

var Developer = function (name, job, company, current_project) {
  this.name = name;
  this.job = job;
  this.company = company;
  this.project = current_project;
}

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

}
//INPUT FIELD

// input field animation & expansion
$('#post-input').focus(function()
{
    /*to make this flexible, I'm storing the current width in an attribute*/
    $(this).attr('data-default', $(this).width());
    $(this).animate({ width: 700 }, 'slow');
    $(this).attr('data-default', $(this).height());
    $(this).animate({ height: 150 }, 'fast');
});
$('#post-input').blur(function()
{
    /* lookup the original width */
    var w = $(this).attr('data-default');
    var h = $(this).attr('data-default');
    $(this).animate({ height: h }, 'fast');
    $(this).animate({ width: w }, 'slow');
});