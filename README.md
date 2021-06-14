# ScavengerHunt-Backend

## Tech stack/libraries used
* **Node, React, Posgres**
* **express**
* **Node**
* **socket.io** - For real time communication 
* **jsonwebtoken** - For authentication purpose
* **bcrypt** - For hasing password
* **cors** - For allowing resource sharing between different domain
* **xlsx** - For reading and parsing xlxs file

## DB Schema
<img src="https://github.com/biswajit-debnath/ScavengerHunt-Backend/blob/main/mockups/db_schema.PNG"/>

## Structure Of the Backend
`Entry Point -> server.js`   
* **Routes** - Contains all routes related information
* **Controllers** - Logic for the api is handled in controllers
* **Services** - All database related things are handled in services
* **Handlers** - Some specific shared task or event is handled
* **Config** - Database configuration information
* **helper** - Helper functions that are shared among controller and services



