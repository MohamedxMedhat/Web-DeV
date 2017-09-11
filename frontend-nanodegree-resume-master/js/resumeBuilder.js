var bio = {
  "name" : "John Doe",
  "role" : "Web Developer",
  "contacts" : {
    "mobile" : "650-555-5555",
    "email" : "john@example.com",
    "github" : "johndoe",
    "twitter" : "@johndoe",
    "location" : "San Francisco"
  },
  "welcomeMessage" : "Hello to My RESUME",
  "skills" : ["awesomeness","delivering things","cryogenic sleep","saving the universe"],
  "biopic" : "images/fry.jpg"
};
var education = {
  "schools": [
    {
      "name" : "Eckerd College - BA",
      "degree" : "BA",
      "location" : "Saint Petersburg,FL",
      "majors"  : ["CS"],
      "dates" : "2003",
      "url" : "it doesn't have an site :V"
    },
    {
      "name" : "Nova Southeastern University - Masters",
      "location" : "Fort Lauderdale,FL",
      "degree" : "Excellent",
      "majors"  : ["CS"],
      "dates" : "2013",
      "url" : "it doesn't have an site :V"
    }
  ],
  "onlineCourses" : [
    {
      "title" : "JavaScript Crash Course - Udacity",
      "school" : "Udacity",
      "dates" : "2014",
      "url" : "http://www.udacity.com/course/ud804"
    }
  ]
};
var work = {
  "jobs" : [
    {
      "employer" : "test emp",
      "title" : "test title",
      "location" : "test location",
      "dates" : "test date",
      "description" : "any description here"
    },
    {
      "employer" : "test emp2",
      "title" : "test title2",
      "location" : "test location2",
      "dates" : "test date2",
      "description" : "any description here2"
    }
  ]
};
var projects ={
  "projects" : [
    {
      "title" : "Resume Project",
      "dates" : "2017",
      "description" : "making the resume project now xD",
      "images" : ["http://www.insafians.org/images/government/event-img-1.jpg","http://www.insafians.org/images/government/event-img-1.jpg"]
    }
  ]
};
bio.display=function(){
  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%" , bio.role);
  $("#header").prepend(formattedRole);
  $("#header").prepend(formattedName);

  var formattedPic = HTMLbioPic.replace("%data%", bio.biopic);
  $("#header").append(formattedPic);

  var formattedContact = HTMLmobile.replace("%data%", bio.contacts.mobile);
  $("#topContacts , #footerContacts").append(formattedContact);



  var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
  $("#topContacts , #footerContacts").append(formattedEmail);

  var formattedGitHub = HTMLgithub.replace("%data%", bio.contacts.github);
  $("#topContacts , #footerContacts").append(formattedGitHub);

  var formattedtwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
  $("#topContacts , #footerContacts").append(formattedtwitter);

  //var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
  //$("#topContacts").append(formattedBlog);

  var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
  $("#topContacts , #footerContacts").append(formattedLocation);

  var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
  $("#topContacts").append(formattedWelcomeMsg);


  if (bio.skills.length > 0){
    $("#header").append(HTMLskillsStart);
    for (var i = 0 ; i < bio.skills.length ; i++){
      var formattedSkill = HTMLskills.replace("%data%",bio.skills[i]);
      $("#skills").append(formattedSkill);
    }
}
};
bio.display();

work.display = function (){
  for (var job = 0 ; job < work.jobs.length ; job++) {
    $("#workExperience").append(HTMLworkStart);
    var formattedEmployer = HTMLworkEmployer.replace("%data%",work.jobs[job].employer);

    var formattedTitle = HTMLworkTitle.replace("%data%",work.jobs[job].title);

    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);

    var formattedDates = HTMLworkDates.replace("%data%",work.jobs[job].dates);
    $(".work-entry:last").append(formattedDates);

    var formattedDescription = HTMLworkDescription.replace("%data%",work.jobs[job].description);
    $(".work-entry:last").append(formattedDescription);

    var formattedWorkLoc = HTMLworkLocation.replace("%data%",work.jobs[job].location);
    $(".work-entry:last").append(formattedWorkLoc);
  }
};
work.display();

education.display = function () {
  $("#education").append(HTMLschoolStart);
  for (var x = 0 ; x < education.schools.length-1 ; x++) {
    for (var y = 0 ; y <= 1 ; y++) {
      var formattedName2 = HTMLschoolName.replace("%data%" , education.schools[y].name);
      $(".education-entry:last").append(formattedName2);

      //var formattedDegree = HTMLschoolDegree.replace("%data%" , education.schools[school].degree);
      //$(".education-entry:last").append(formattedDegree);

      var formattedDates2 = HTMLschoolDates.replace("%data%" , education.schools[y].dates);
      $(".education-entry:last").append(formattedDates2);

      var formattedLocation2 = HTMLschoolLocation.replace("%data%" , education.schools[y].location);
      $(".education-entry:last").append(formattedLocation2);

      var formattedMajor = HTMLschoolMajor.replace("%data%" , education.schools[y].majors);
      $(".education-entry:last").append(formattedMajor);
    }
  }

  var formattedOnlineClass = HTMLonlineClasses.replace("%data%" , education.schools[x].Classes);
  $(".education-entry:last").append(formattedOnlineClass);
  for (var z = 0 ; z < education.onlineCourses.length ; z++) {
    for (var k = 0 ; k < 1 ; k++) {
      var formattedTitle3 = HTMLonlineTitle.replace("%data%" , education.onlineCourses[k].title);
      $(".education-entry:last").append(formattedTitle3);

      var formattedDate3 = HTMLonlineDates.replace("%data%" , education.onlineCourses[k].dates);
      $(".education-entry:last").append(formattedDate3);

      var formattedUrl = HTMLonlineURL.replace("%data%" , education.onlineCourses[k].url);
      $(".education-entry:last").append(formattedUrl);
    }
  }
};
education.display();

projects.display = function () {
  $("#projects").append(HTMLprojectStart);
  for (var b = 0 ; b < projects.projects.length ; b++) {
    var formattedTitle = HTMLprojectTitle.replace("%data%" , projects.projects[b].title);
    $(".project-entry:last").append(formattedTitle);

    var formattedDates = HTMLprojectDates.replace("%data%" , projects.projects[b].dates);
    $(".project-entry:last").append(formattedDates);

    var formattedDescription = HTMLprojectDescription.replace("%data%" , projects.projects[b].description);
    $(".project-entry:last").append(formattedDescription);

    if (projects.projects[b].images.length > 0) {
      for (var o = 0 ; o < 2 ; o++ )  {
        var formattedImage = HTMLprojectImage.replace("%data%",projects.projects[b].images[o]);
        $(".project-entry:last").append(formattedImage);
      }
    }
  }
};
projects.display();

  $("#mapDiv").append(googleMap);
