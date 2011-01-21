BuzzController.$inject=['$resource'];
function BuzzController($resource){
  this.Activity = $resource(
      'https://www.googleapis.com/buzz/v1/activities/:userId/@self/:activityId/:comments',
      {alt:'json', callback:'JSON_CALLBACK'},
      {
        get:     {method:'JSON'},
        replies: {method:'JSON', params:{comments:'@comments'}}
      });
  
  this.userChange = function(){
    this.userId = this.$location.hashPath;
    if (this.userId)
      this.activities = this.Activity.get({userId:this.userId});
  };

  this.expandReplies = function(activity) {
    if (activity.replies) {
      activity.replies.show = !activity.replies.show;
    } else {
      activity.replies = this.Activity.replies({userId:this.userId, activityId:activity.id}, function(){
        activity.replies.show = true;
      });
    }
  };
  
  this.$watch('$location.hashPath', this.userChange);
};

angular.widget('my:expand', function(element){
  element.css('display', 'block');
  this.descend(true);
  return function(element) {
    element.hide();
    var watch = element.attr('expand');
    this.$watch(watch, function(value){
      if (value) {
        element.delay(0).slideDown('slow');
      } else {
        element.slideUp('slow');
      }
    });
  };
});
