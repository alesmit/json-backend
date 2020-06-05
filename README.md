# json-backend

Spin up a simple backend storing data in json files for frontend dev purposes

## What is this?

This project can be used to quickly make up http endpoints to support local frontend development.

The reason why I made this project is that, when developing a frontend app, we could have scenarios in which we don't have http endpoints ready-to-use, or we can't just run the real backend locally.
For those cases it's just simpler to write some minimal backend code from scratch, so we can keep focusing on frontend stuff. The goal of this starter project is to provide a lightweight express app where we can go and write endpoints in matter of minutes.

For sake of simplicity, the app stores data to JSON files. Ideally, each json file would correspond to a table of a relational schema, so those files are kept in a "tables" directory. As we store data in the "tables" directory, we have also a "controllers" one where to keep the endpoint handlers.

## How to use it

```bash
git clone https://github.com/alesmit/json-backend
cd json-backend
npm i
npm start
```

The app comes with an "example" model already in place. For each model we would typically have a json file (table), and a js file (controller) where to write the handlers for each endpoint. Finally, in the index.js file we link the endpoint's route and method to a specific handler that we export from the controller.

### Models generator

Our goal is speed, so we can use this command to generate a table and a controller for a new model:
 
```bash
npm run generate -- fruit
```

This command creates:
- a "fruit" table (tables/fruit.json)
- a "fruit" controller (controllers/fruit.js)

## FAQ

#### Can I use this in production?

Please don't.

## Contributing

Moving forward, it would be good for this small app to support:

- A very basic authentication
- Bulk create/delete/update for objects

## Notes

Before creating this app, I've been using [json-server](https://github.com/typicode/json-server). It's an awesome tool that requires literally zero code to mock up a RESTful backend. For this reason, however, it doesn't allow for customization. Sometimes we have scenarios in which endpoints don't follow a 100% RESTful approach, and for instance a GET handler may be doing something more than just returning an object (or a list of objects). So I needed something different, like this small app. It requires more code, right, but at the same time it's more customizable. Besides that, json-server didn't have the upload and by the time I started thinking of this project I really needed it. By the way, json-server is still a super valid option if your frontend app only uses 100% RESTful endpoints.
