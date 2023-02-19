# README

This project consists of a Rails API and a React frontend, using a
SQLite database.

For questions or comments, feel free to reach out to me at
[cierramorris@gmail.com](mailto:cierramorris09@gmail.com)

### Prerequisites
* Ruby 3.0.0
* Rails 7.0.4.2
* Node 18.12.1

### Setup

#### Install Gems
```
$ cd scorecard_api
$ bundle install
```

#### Install React Dependencies
Open a new terminal.
```
$ cd scorecard_client
$ npm install
```

#### DB Migrations
```
$ rails db:migrate
```

#### Development Server
```
$ rails server
```

#### Frotnend
```
$ npm start
```