$(function() {



var $postList = $("#post-list");
var $newStatus = $("#status-modal-form");
var statusTemplate = _.template($("#status-template").html());

var Status = function (image, game, status) {
  this.postImage = image;
  this.game = game;
  this.status = status;
  this.items = localStorage.getItem("status");
  this.key = "status";
}

Status.all = [];

Status.prototype.saveToLs = function (input) {

  // if (this.items) {
  //   items_json = JSON.parse(this.items)
  // }
  // else {
  //   items_json = [];
  // }
  // items_json.push(input);

  // localStorage.setItem(this.key, JSON.stringify(items_json));
  Status.all.push(this);
}

Status.prototype.render = function(template_source, where) {

  // var items_json = JSON.parse(this.items);
  // var template = _.template($(template_source).html());

  // _.each(items_json, function(item) {
  //   $(where).append(template(item));
  // });
    var postIndex = Status.all.indexOf(this);
    var $status = $(statusTemplate(this));
    $post.attr("data-index", postIndex);
    $postList.append($post);

}


$newStatus.on("submit", function() {

  var statusImage = $("#new-image").val();
  var statusGame = $("#new-game").val();
  var statusBody = $("#new-body").val();
  var newStatus = new Status(statusImage, statusGame, statusBody);

  // newStatus.saveToLs(newStatus);
  // newStatus.render('#status-template', '#status-container');
  newStatus.saveToLs();
  newStatus.render();
});


});