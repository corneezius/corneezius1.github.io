var app=angular.module("app",["firebase"]);app.constant("FBURL","https://crowdfluttr.firebaseio.com/"),app.service("Ref",["FBURL",Firebase]),app.factory("Auth",["$firebaseAuth","Ref",function(e,a){return e(a)}]),app.factory("Ideas",["$firebase","Ref",function(e,a){var o=a.child("ideas");return e(o).$asArray()}]),app.factory("IdeasComments",["$firebase","Ref",function(e,a){var o=a.child("idea-comments");return e(o).$asArray()}]),app.factory("IdeasObject",["$firebase",function(e){var a=new Firebase("https://crowdfluttr.firebaseio.com/"),o=a.child("ideas");return e(o).$asObject()}]),app.factory("Messages",["$firebase","Ref",function(e,a){var o=a.child("messages");return e(o).$asArray()}]),app.factory("Proposals",["$firebase","Ref",function(e,a){var o=a.child("proposals");return e(o).$asArray()}]),app.factory("ProposalsComments",["$firebase","Ref",function(e,a){var o=a.child("pr-comments");return e(o).$asArray()}]),app.factory("Workplans",["$firebase","Ref",function(e,a){var o=a.child("workplans");return e(o).$asArray()}]),app.factory("WorkplansComments",["$firebase","Ref",function(e,a){var o=a.child("wp-comments");return e(o).$asArray()}]),app.controller("ctrl",["$scope","$firebase","Ideas","IdeasComments","Auth","IdeasObject","Messages","Proposals","ProposalsComments","Workplans","WorkplansComments",function(e,a,o,r,t,s,i,n,c,d,u){function l(){e.idea=""}e.ideas=o,e.ideas_comments=r,e.ideas_object=s,e.auth=t,e.messages=i,e.proposals=n,e.prcomments=c,e.workplans=d,e.wpcomments=u,e.idea="",$.urlParam=function(e,a){a||(a=window.location.href);var o=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(a);return o?o[1]||void 0:void 0};var p=$.urlParam("id");e.ideaID=p,e.GoogleLogin=function(){window.location.href="explore.html",e.auth.$authWithOAuthPopup("google")(),console.log(user.google.displayName)},e.FacebookLogin=function(){e.auth.$authWithOAuthPopup("facebook")(),console.log(user.facebook.displayName)},e.TwitterLogin=function(){window.location.href="explore.html",e.auth.$authWithOAuthPopup("twitter")(),console.log(user.twitter.displayName)},e.UpdateFirebaseWithString=function(){e.ideas.$add({idea:e.idea,userId:e.user.google.id,userName:e.user.google.displayName,timestamp:Date.now()}).then(function(e){l()})},e.addCommentonIdea=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("idea-comments").push({ideaID:e.ideaID,ic_body:e.newComment,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),e.newComment=""},e.addProposal=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("proposals").push({ideaID:e.ideaID,pbody:e.value,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),$("#myModal").modal("hide")},e.addCommentonProject=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("pr-comments").push({pID:e.projectID,pr_body:e.newComment,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),e.newComment=""},e.addCommentonWorkProduct=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("wp-comments").push({wID:e.workplanID,wc_body:e.newComment,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),e.newComment=""},e.LikeIdea=function(o,r){var t="https://crowdfluttr.firebaseio.com/ideas/"+r,s=new Firebase(t+"/"+o),i=a(s);e.IdeaAttributes=i.$asArray(),e.IdeaAttributes.$add({userId:e.user.google.id,userName:e.user.google.displayName,timestamp:Date.now()});var n=new Firebase(t+"/likes");n.transaction(function(e){return e||(e={like:0,dislike:0}),e[o]++,e})},e.shareIdea=function(){var a=$("input").val().split(",");jQuery.each(a,function(a,o){e.ideaID="-JbSSmv_rJufUKukdZ5c";var r=new Firebase("https://crowdfluttr.firebaseio.com/ideas/"+e.ideaID);r.on("value",function(e){console.log(e.val())},function(e){console.log("The read failed: "+e.code)}),e.val=o,e.messages.$add({ideaID:e.ideaID,recipent:e.val}).then(function(){console.log("Idea added: "+o)})})},e.DeleteIdea=function(a){e.ideas.$remove(a)},$.urlParam=function(e,a){a||(a=window.location.href);var o=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(a);return o?o[1]||void 0:void 0};var m=$.urlParam("id");console.log(m);var f=new Firebase("https://crowdfluttr.firebaseio.com/ideas/"+m),h=a(f),b=h.$asObject();b.$bindTo(e,"data"),f.on("value",function(a){var o=a.val();console.log(o),e.ideaTitle=o.idea,e.ideaDesc=o.description,e.ideaAuthor=o.userName;var r=item.child("likes");e.ideaLikes=o.likes.like,e.ideaDislikes=o.likes.dislike,console.log(o.userEmail)},function(e){console.log("The read failed: "+e.code)})}]),app.run(["$rootScope","Auth",function(e,a){e.user=a.$getAuth()}]);