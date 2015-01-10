var app=angular.module("app",["firebase"]);app.constant("FBURL","https://crowdfluttr.firebaseio.com/"),app.service("Ref",["FBURL",Firebase]),app.factory("Auth",["$firebaseAuth","Ref",function(e,a){return e(a)}]),app.factory("Ideas",["$firebase","Ref",function(e,a){var o=a.child("ideas");return e(o).$asArray()}]),app.factory("IdeasComments",["$firebase","Ref",function(e,a){var o=a.child("idea-comments");return e(o).$asArray()}]),app.factory("Messages",["$firebase","Ref",function(e,a){var o=a.child("messages");return e(o).$asArray()}]),app.factory("Projects",["$firebase","Ref",function(e,a){var o=a.child("projects");return e(o).$asArray()}]),app.factory("Proposals",["$firebase","Ref",function(e,a){var o=a.child("proposals");return e(o).$asArray()}]),app.factory("ProposalsComments",["$firebase","Ref",function(e,a){var o=a.child("pr-comments");return e(o).$asArray()}]),app.factory("Workplans",["$firebase","Ref",function(e,a){var o=a.child("workplans");return e(o).$asArray()}]),app.factory("WorkplansComments",["$firebase","Ref",function(e,a){var o=a.child("wp-comments");return e(o).$asArray()}]),app.factory("cfFloat",["$firebase","Ref",function(e,a){var o=a.child("float");return e(o).$asArray()}]),app.factory("Feedback",["$firebase","Ref",function(e,a){var o=a.child("feedback");return e(o).$asArray()}]),app.factory("LikedIdeas",["$firebase","Ref",function(e,a){return function(o){var t=new Firebase(a).child("users").child("like").child(o);return e(t).$asArray()}}]),app.controller("ctrl",["$scope","$firebase","cfFloat","Ideas","IdeasComments","Auth","Messages","Proposals","ProposalsComments","Workplans","WorkplansComments","Projects","LikedIdeas","Feedback",function(e,a,o,t,i,r,s,n,c,d,u,l,f,p){function m(){e.description="",e.idea=""}function b(e,a){e?console.log("Login Failed!",e):(console.log("Authenticated successfully with payload:"+a),window.setTimeout(function(){window.location.href="home-B.html",console.log(user.facebook.displayName)},1e3))}function m(){e.idea=""}e.ideas=t,e.ideas_comments=i,e.auth=r,e.messages=s,e.proposals=n,e.prcomments=c,e.workplans=d,e.wpcomments=u,e.projects=l,e.cfFloat=o,e.feedback=p,e.idea="",e.FBURL="https://crowdfluttr.firebase.com/",e.UpdateFirebaseWithString=function(){e.ideas.$add({idea:e.idea,description:e.description,userId:e.user.facebook.id}).then(function(e){m()})},e.getRandom=function(){return Math.floor(6*Math.random()+1)},$.urlParam=function(e,a){a||(a=window.location.href);var o=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(a);return o?o[1]||void 0:void 0};var h=$.urlParam("id"),w=$.urlParam("pid"),k=$.urlParam("wid");e.ideaID=h,e.proposalID=w,e.wpID=k,e.FacebookLogin=function(){e.auth.$authWithOAuthRedirect("facebook",b())(),console.log(user.facebook.displayName),window.location.href="explore.html"},e.logout=function(){e.auth.$unauth(),window.setTimeout(function(){window.location.href="/"},500)},e.checkAuth=function(){r.$getAuth()||(window.location.href="/")},e.homepageRedirect=function(){r.$getAuth()&&(window.location.href="/home-B.html")},e.newIdea=function(){(null==e.privacy||void 0==e.privacy)&&(e.privacy="false"),e.ideas.$add({idea:e.idea_title,description:e.idea_desc,isPublic:e.privacy,userId:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}).then(function(e){console.log("Success!"),$("#newIdea").hide("slow"),$("#newIdea-success").fadeIn("slow")})},e.qnewIdea=function(a){e.ideas.$add({idea:a,description:null,category:null,ideaPic:null,userId:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}).then(function(a){console.log("Success!"),e.quickAdd=!0,$("#quickadd-success").fadeIn("slow")})},e.newFeedback=function(a,o){e.feedback.$add({feedback:a,rating:o,userId:e.user.facebook.id,userName:e.user.facebook.displayName,userEmail:e.user.facebook.email,status:"Unresolved",timestamp:Date.now()}).then(function(a){console.log("Success!"),e.feedbackAdd=!0,$("#feedback-success").fadeIn("slow")})},e.addProject=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/projects");a.push({ideaID:e.ideaID,projTitle:e.projTitle,projBody:e.projBody,timestamp:Date.now(),userID:e.user.facebook.id,username:e.user.facebook.displayName})},e.editProject=function(a){var o=e.projTitle,t=e.projBody,i=new Firebase("https://crowdfluttr.firebaseio.com/projects");i.child(a).update({projTitle:o,projBody:t})},e.deleteProject=function(a){e.projects.$remove(a)},e.addCommentonIdea=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("idea-comments").push({ideaID:e.ideaID,ic_body:e.newComment,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),e.newComment=""},e.addProposal=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("proposals").push({ideaID:e.ideaID,ptitle:e.ptitle,pbody:e.value,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),$("#myModal").modal("hide")},e.addCommentonProject=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("pr-comments").push({pID:e.projectID,pr_body:e.newComment,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),e.newComment=""},e.addCommentonWorkProduct=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/");a.child("wp-comments").push({wID:e.workplanID,wc_body:e.newComment,userID:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()}),e.newComment=""},e.LikeIdea=function(o,i,r){var s="https://crowdfluttr.firebaseio.com/ideas/"+t.$keyAt(r),n=new Firebase(s+"/"+o),c=a(n);e.IdeaAttributes=c.$asArray(),e.IdeaAttributes.$add({userId:e.user.facebook.id,userName:e.user.facebook.displayName,timestamp:Date.now()});var d=new Firebase(s+"/likes");d.transaction(function(e){return e||(e={like:0,dislike:0}),e[o]++,e});var s="https://crowdfluttr.firebaseio.com/users/"+String(e.user.facebook.id),n=new Firebase(s+"/"+likeVar),c=a(n);e.IdeaAttributes=c.$asArray(),e.IdeaAttributes.$add({ideaId:t.$keyAt(r),idea:i,timestamp:Date.now()})},e.shareIdea=function(){var a=new Firebase("https://crowdfluttr.firebaseio.com/ideas"+h);a.on("value",function(a){var o=a.val();console.log("Idea Title: "+o.idea),e.ideaTitle=o.idea});var o=$("#tags_1").val().split(",");jQuery.each(o,function(a,o){e.val=o,e.cfFloat.$add({ideaID:e.ideaID,ideaTitle:e.ideaTitle,recipientEmail:e.val,senderName:e.user.facebook.displayName,senderID:e.user.facebook.id,timestamp:Date.now()}).then(function(){e.val="",console.log("Idea added: "+o),$.post("https://johnldoner.com/float/",{tags_1:o,ideaID:e.ideaID,ideaTitle:e.ideaTitle,senderName:e.user.facebook.displayName}).success(function(a,o,t,i){console.log("success: "+e.ideaID+"/"+e.ideaTitle+" sent to "+e.val)}).error(function(e,a,o,t){})})}),e.emails="",$("#float-success").fadeIn("slow")},e.DeleteIdea=function(a){e.ideas.$remove(a)},e.DeleteFeedback=function(a){e.feedback.$remove(a)},e.ApproveFloat=function(){e.LikeIdea("like",item.idea,ideas.indexOf(item)),e.cfFloat.$remove(item)},e.DeleteFloat=function(a){e.cfFloat.$remove(a)};var y=new Firebase("https://crowdfluttr.firebaseio.com/ideas/"+h),v=new Firebase("https://crowdfluttr.firebaseio.com/proposals/"+w),I=new Firebase("https://crowdfluttr.firebaseio.com/workplans/"+k);y.on("value",function(a){var o=a.val();e.ideaTitle=o.idea;var t=o.idea;e.ideaDesc=o.description,e.ideaAuthor=o.userName,e.createTime=o.timestamp;var i=item.child("likes");e.ideaLikes=o.likes.like,e.ideaDislikes=o.likes.dislike},function(e){console.log("The read failed: "+e.code)})}]),app.run(["$rootScope","Auth",function(e,a){e.user=a.$getAuth()}]);