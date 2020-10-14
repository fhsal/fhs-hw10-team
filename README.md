homework #10 

Team Profile Generator       
======================

# Summary

This is a command-line application which is run with node to solicit input from the user regarding members of an Engineering Team.  The application prompts the user for input such as the team name and information about the Manager, Engineers and Interns on the team.  After information is captured for each team member the user is prompted as to if they wish to add another.  When all team members are entered the app renders an html page using templates provided in the assignment to create a consolidated team page (image below).  

Here is a link to a video video recording of working application as specified in the instructions:  https://drive.google.com/file/d/1FIzq6qYr9sWOVlevKagPo1hDAUe6DXTi/view


# Components

The application includes a number of components, they include the following :

(1) A class directory with class files for each employee type, including the base type of "employee" which is shared for Manager.js, Engineer.js and Intern.js.   Each of the roles 
    has common attributes from Employee.js and one unique field;  Manager has officeNumber; Engineer has gitHub; Intern has School attended. 

(2) There are a number of templates and files provided, they include:  Manager, Intern, Engineer and Main.  An htmlRenderer.js is also provided.  I updated the Main.html so that
    the teamName could be dynamically generated from the inputs and added to the Team.html page which is generated and stored in the output directory. 
    
(3) The application prompts the user for teamName first, then employees.  The Manager input prompt text is different so that the user knows they are inputting that role. 
    Inputs are pushed into an object called employees and that object is parsed by the render function in the htmlRenderer.js file to create the team page. 

(4) There are a series of tests for the classes which use jest that are also provided.  Successful running of these tests are in the video recording

# Screen shot of generated Team page 

[img]!(https://github.com/fhsal/fhs-hw10-team/blob/main/teamScreenShot.jpg)

