This is a React-based frontend application that features user authentication and a fully functional Todo List. 
Users can register, log in, add, edit, delete,and mark their tasks as complete or incomplete. The application 
uses local storage to persist user data and tasks.




**************Authentication (AuthContext)***********

The AuthContext manages the authentication state using React's Context API.

Register: Users can register with a unique username and password. If the username is already taken, 
the application will display an alert message.

Login: Users log in by providing their registered credentials. Upon successful login, the user is authenticated, 
and their todos are retrieved from local storage.

Logout: Users can log out, which resets the authentication state and clears the current session.


*************Todo List (TodoList Component)*****************

Add Todo: Users can add new tasks by entering a title and description. Tasks are stored in local storage and linked to the current user.

Edit Todo: Users can click the "Edit" button to modify an existing task. The todo's title and description are updated in real-time.

Delete Todo: Users can remove tasks from their list. Deleted todos are immediately reflected in the UI and local storage.

Toggle Complete: Tasks can be marked as completed/incomplete by clicking the toggle button. Completed tasks have a distinct style.

Sliding Menu: The todo list is displayed in a sliding menu, which can be toggled open or closed using the "Show/Close Todo List" button.


****************Animations*******************

Framer Motion is used to animate the todo items, sliding menu, and button interactions.
Todo items fade in when added and scale slightly when hovered, giving a polished and responsive feel to the UI.
Animations are also applied to alert messages during registration, login, and logout actions.

***Features****

User Authentication: Users can register and log in using a username and password. 
Credentials and todos are stored in the browser's local storage.

Todo List Management: Authenticated users can create, edit, delete, and toggle tasks' completion status.

Responsive Design: The UI is mobile-friendly and adapts to different screen sizes.

Local Storage: All user and todo data is stored locally in the browser, allowing for persistent task management.

Animations: Smooth animations are integrated using the Framer Motion library for better user experience.