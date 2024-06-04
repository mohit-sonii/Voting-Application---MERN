Project started on 17 may 2024

One Vote is a React application designed to facilitate online voting, eliminating the need for users to stand in queues. Here’s an overview of the key features and functionality of this project:

💠💠Features 

• User Registration ---> Users can register by clicking the 'Register' button on the home page, navigating to the signup route. The registration form collects multiple fields, including Aadhar card number and voter card number.

• User Login ---> Registered users can log in to explore the application.

• User and Admin Differentiation ---> The application distinguishes between users and admins. An admin account is pre-created in the database. If the login credentials match the admin data, the visitor is identified as an admin and granted access to additional features.

• Admin Panel --->Admins can add or remove election candidates and view the list of registered users. Admin-specific routes are provided with enhanced functionality.

• Password Security --->User passwords are hashed using Bcrypt before being stored in the database to ensure security.

• Query Submission --->Users can submit grievances via a form on the home page.

• State and District API --->The application uses an API to dynamically display lists of states and their respective districts. This ensures efficient handling of state and district data without hardcoding options.

• Password Recovery ---> Users can reset forgotten passwords by providing their unique ID and voter ID. (Note: OTP functionality is not included in this version.)

• API Handling ---> The application utilizes Axios for API requests, combined with Fetch API in certain instances, leveraging async/await for efficient data fetching.

• Technologies Used ---> 

💠Frontend: React.js

💠Backend: Node.js

💠Database: MongoDB

💠Security: Bcrypt for password hashing

💠API Requests: Axios and Fetch API using async/await

💠Debugging Friend: ChatGPT 

💠Web Design: My Designing Experience

💠Routes Mapping: FigJam

💠Frontend Designing: CSS and Tailwind CSS



• Project Status ---> Under Development: All functionalities mentioned above have been deployed. A few tasks are still pending and will be completed soon.

• Upcomming ---> 
1) IF the visitor is a user then it can vote and after login it will navigate to the home page and there register button will convert to the Vote Now button and that user can view the candidates list and can vote accordingly.
2) If the visitor is an admin then it can view, delete and add the candidate in the frontned and also this changes is going ot be done on frontend or in a form and many links, features will be avaliable to that admin.
3) When a user vote, it will not be able to vote again and its ID will be saved at the candidate party. Also the count of vote will also update dynamically.

