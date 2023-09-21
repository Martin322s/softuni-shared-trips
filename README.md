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
