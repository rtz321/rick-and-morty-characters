# Rick & Morty Characters App

This is a Single Page Application that displays characters from series Rick & Morty. The app allows users to search for characters, view their profiles, and see the episodes they appeared in, all while using the Rick & Morty API.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Running the Application](#running-the-application)
-   [Testing](#testing)

## Features

1. **Home Page**

    - A table displaying the following columns:
        - Avatar
        - Name
        - Species
        - Status
    - An input field to search character names. Only rows containing the searched string are displayed.

2. **Profile Page**
    - Clicking on a character's name navigates to their profile page.
    - The profile displays detailed information about the character.
    - A "Back" button to return to the Home page.
    - Lists all episodes the character has appeared in.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
-   **React Router**: For navigating between Home and Profile pages.
-   **@tanstack/react-table**: For building powerful tables in React.
-   **Jest** and **React Testing Library**: For unit testing the application.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/rtz321/rick-and-morty-characters.git
    cd rick-and-morty-characters

    ```

2. Install dependencies:

    ```npm install

    ```

## Running the Application

To run the application in development mode, use the following command:

    ```npm start

    ```
    Open your browser and navigate to http://localhost:3000 to view the app.

## Testing

To run the unit tests for the application, use the following command:

    ```npm test

    ```
