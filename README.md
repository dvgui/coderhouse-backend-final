# Coderhouse-Backend
Node.js backend course project

## How to run

  First install dependencies
  ```
  npm install
  ```
  Start normally:
  ```
  npm run start
  ```
## Run with cluster or fork

 
  ```
  npm run cluster
  ```
  or

  ```
  npm run fork
  ```

  It is also possible to monitor it using forever

  ```
  npm run forever
  ```

  You can also use the provided nginx config to create a 5-port random API with the main port being 8080 and subsequent ports used for randomness
  
  
  
## Signing Up and Signing In

  This site stores users on the cloud. Sessions last 10 minutes or until sign out.

## Server information

  The /info route shows:
  
  -ARGVs - Run path
  
  -OS name - Process id
  
  -Node.js version - Project folder
  
  -Total reserved memory

## Displaying objects

  Added objects are shown on a main page that auto updates without reloading (wss)
  Messages load similarly. 
  There is one form for each.

## Object formatting

 
  ```
  {
    title: (product name),
    price: (price),
    thumbnail: (url)
  }

  ```
  Accepted messages will read
  ```
  { 
    author: {
        id: 'user email', 
        name: 'name', 
        last_name: 'last name', 
        age: 'age', 
        alias: 'alias',
        avatar: 'avatar url'
    },
    text: 'message'
  }
  A date attribute is added to the author on save

  ```
## Storage

The app supports MariaDB and SQLite3.

Messages are stored using mongoDB.

## Environment File
Environment variables are provided on a env.sample file

## Gzip

Saves about 10% transfer in requests.

  

