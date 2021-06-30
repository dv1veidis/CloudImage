# CloudImage
Google vision API


BUILDING

1. First you will need to create a google cloud platform project and enable google vision
2. Then you have to go to credentials, click on your service account and go to keys where you will create a new key as json
3. Insert the json in the CloudImage-master
4. And write in the terminal $env:GOOGLE_APPLICATION_CREDENTIALS="Keyname.JSON" KeyName should be replaced with your JSON file name
5. Then go in to client through the terminal
6. Run the following commands:
 a. npm i axios
 b. npm i react
 c. npm i react-dom
 d. npm i react-scripts
7. Then we exit client with cd .. and type npm run dev
8. A website should open automatically at http://localhost:3000/
9. Now choose a file and press upload, after that we press generate and it should return the objects in the image as well as
save the results to your local storage so that when you open it later in the same browser you see your result history


P.S. Write to me at deividasgelz@gmail.com if you have any issues installing or running!
