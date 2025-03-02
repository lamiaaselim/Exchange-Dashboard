# Exchange Dashboard

## Project Overview

The **Exchange Dashboard** is a web application designed to display exchange rates and financial data in an interactive and user-friendly interface. The project is built with Angular and includes real-time updates using API data.

## Features

- Display live exchange rates
- Interactive charts for financial data
- Responsive UI design
- Real-time data updates
- Toast notifications for user interactions

## Installation & Setup

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli)

### Steps

1. **Clone the Repository**

   ```sh
   git clone <repository-url>
   cd exchange-dashboard
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   - Navigate to `src/`
   - Create a folder named `environments/`
   - Inside `environments/`, create a file named `environment.ts`
   - Add the following content:

     ```ts
     export const environment = {
       production: false,
       apiKey: 'Q5Qhp4Fn8fh5DDFvsgs5duzHTpyQi9K0',
     };
     ```

4. **Run the Project**

   ```sh
   npm start
   ```

   The application will be available at `http://localhost:4200/`

## Running Tests

To run unit tests using Jest:

```sh
npm run test
```

## Technologies Used

- **Frontend:** Angular 18, TypeScript, SCSS
- **Testing:** Jest
- **State Management:** Services
- **API Handling:** HttpClient
- **Notifications:** Toast Service
