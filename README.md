# JS Back-end Educational Project

# Application Overview

## Introduction

Get familiar with the provided HTML & CSS and create an application for shared trip's plans. The application allows visitors to browse through the shared trips catalog. Users may register with an email, password and gender which allows them to create their own trips and should be able to join trip (if the current user is not the trip creator and if seats available). Trip authors can also edit or delete their own publications at any time.


## Functional Requirements

The Functional Requirements describe the functionality that the Application must support.

### Guest (not logged in)

- The application should provide Guest (not logged in) users with the functionality to:
  - Login
  - Register
  - View the Home page
  - View the Shared Trips page
  - View the Details page

### Users (logged in)

#### User navigation example:

- The application should provide Users (logged in) with the functionality to:
  - View the home page and all other pages with logged-in navigation
  - View all shared trips
  - Create a new trip [Offer Trip]
  - Access trip details page [Details]
  - Join some trip (if the current user is not the trip creator and if seats available)
  - Delete or Edit a trip depending on the user's authentication (only for the creator of the current trip)
 
## Database Models

The Database of the Shared Trip application needs to support 2 entities:

### User

- Email - string (required)
- Password - string (required)
- Gender – string (male or female) required
- Trips History – a collection of Trips (reference to the Trip Model)

Note: When a user creates a new trip, a reference to that trip is added to that collection (Trips History).

### Trip

- Start Point - string (required)
- End Point – string (required)
- Date – string (required)
- Time – string (required)
- Car Image – string (required)
- Car Brand – string (required)
- Seats – number (required)
- Price – number (required)
- Description – string (required)
- Creator – object Id (reference to the User model)
- Buddies – a collection of Users (reference to the User model)

Note: When a user joins a given trip, a reference to that user is added to that collection (Buddies).

# Application Pages

## Home Page (Logged Out User)

**Description:** The Home Page serves as the landing page for users who are not logged in. It provides information about the application and offers navigation options.

---

## Home Page (Logged In User)

**Description:** The Home Page for logged-in users provides a welcoming interface and access to the main application features.

---

## Register Page (Logged Out User)

**Description:** The Register Page allows users who are not logged in to create a new account by providing their email, password, and gender. Passwords are hashed and should match.

---

## Login Page (Logged Out User)

**Description:** The Login Page allows users who are not logged in to log in with their registered email and password.

---

## Logout (Logged In User)

**Description:** The Logout action is available to logged-in users. Upon successful logout, any session information is cleared, and the user is redirected to the Home Page.

---

## Shared Trips (For Logged In Users and Logged Out Users)

**Description:** The Shared Trips page displays a list of all shared trips in the system. Each trip is represented with information such as car image, destination (from - to), date, time, and price. Users can click the [Details] button to access trip details.

---

## Trip Details Page (For Logged In Users and Logged Out Users)

**Description:** The Trip Details Page allows both logged-in and logged-out users to view detailed information about a trip. The page displays information such as destination, date and time, shared trip buddies, car brand, car image, description, and price. Buttons are displayed based on the user's status, allowing actions like joining the trip, editing the trip (for the trip creator), and deleting the trip (for the trip creator).

---

## Join Trip (Logged In User, Not the Current Trip Creator)

**Description:** Logged-in users who are not the trip creators can join trips (if seats are available). If successful, their email is added to the trip's shared trip buddies collection, and the available seats are decreased by 1. Users are then redirected to the Trip Details Page for the current trip. If a user has already joined the trip, a message indicating "Already joined. Don't be late!" is displayed. If no seats are available, a message indicating "No seats available!" is displayed.

---

## Offer New Trip Page (Logged In User)

**Description:** The Offer New Trip Page is available to logged-in users, allowing them to create a new trip by filling out a form. Upon successful creation, users are redirected to the Shared Trips page.

---

## Delete Trip (Logged In User, Creator of the Current Trip)

**Description:** Trip creators can delete their own trips. Clicking the [Delete this trip] button removes the trip from the database, and the user is redirected to the Shared Trips Page.

---

## Edit Trip (Logged In User, Creator of the Current Trip)

**Description:** The Edit Trip Page is available to logged-in users who are the creators of the current trip. Clicking the [Edit this trip] button on the Trip Details Page allows users to edit the trip's details. Upon successful editing, users are redirected to the Trip Details Page for the updated trip.
