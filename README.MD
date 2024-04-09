# Seismic App

Welcome to the Seismic App project, a monorepo that includes both a backend API and a frontend UI. This README provides instructions to set up and run both parts of the project, which are located in separate directories within this monorepo: api for the backend API and ui for the frontend UI.

## Prerequisites

- Ruby version: 3.3.0
- Rails version: 7.1.3.2
- Node.js version: 21.5.0
- npm version: 10.2.4

## Getting Started

To get started with this project, you'll need to clone the repository to your local machine. Follow these steps:

1. Open your terminal.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command: `git clone https://your-repository-url-here.git`
4. Once the repository has been cloned, navigate into the project's directory: `cd seismic-app`

## Setting up the API

1. Navigate to the `api` directory: `cd api`

2. Install the required gems: `bundle install
`

3. Set up the database:
- To create the database: `rails db:create`
- To run migrations: `rails db:migrate`
- To fetch and persist earthquake data from USGS: `rails fetch_features:fetch`

## Running the API

To start the Rails server, run: `rails server`

The API will be available at [http://localhost:3000](http://localhost:3000).

## API Documentation with Swagger

The API documentation is created using Swagger, providing a detailed overview of the available endpoints, their expected parameters, and response models. This documentation is an invaluable tool for understanding how to interact with the API.

You can access the Swagger-generated documentation by navigating to:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

This URL will take you to the Swagger UI interface where you can view the API's endpoints, try out the API calls directly from your browser, and see the responses in real-time. It's a great way to explore the API's capabilities and test different requests without having to write any code.

## Running Model Tests

This project uses RSpec for testing. To run the model tests, navigate to the root directory of the API part of the project and execute the following command in your terminal: `rsepc spec/models`

This command runs all the tests located in the spec/models directory, ensuring that the model validations and associations work as expected.

## Setting up the UI

1. Navigate to the `ui` directory: `cd ui`

2. Install the required packages: `npm install`

3. Start the development server: `npm run dev`


The UI will be available at `http://localhost:5173`.

## Additional Notes

- The API uses SQLite for development purposes.
- The project includes a task to fetch and persist earthquake data from USGS. The task is designed to prevent duplicate entries. If an earthquake event already exists in your database (identified by its external ID), the task will skip it, ensuring your data remains consistent without duplicates.
- CORS and Port Configuration: For the front-end application to communicate with the API without encountering CORS (Cross-Origin Resource Sharing) issues, it's crucial to have port 5173 available. The API is configured to allow requests specifically from localhost:5173. Please ensure this port is free before starting your front-end development server.