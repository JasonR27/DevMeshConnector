- To run the entire project just go to the root folder and type "docker-compose up" on a CLI
(for now, "docker-compose -f docker-compose.dev up -d" to run the current under development version,
the production version working with the appropiate builds is right around the corner), 
this will start containerized services for the react frontend, a node api, a postgresql database
and an nginx server working as a reverse proxy for the whole app,
then just go to the localhost port mapped from the nginx reverse prxy server service and
you can use the app from there.

- I will still keep upgrading this project in the future, I will add https redirection
 to the reverse proxy and I plan to add AI microservices as well (a sentiment analyzer for post
and comments and some more analytics and usefull features you can have on a job market site),
CI/CD for linting and other automatic workflows are also right around the corner.

- The project also includes a .devcontainer folder, with the settings for the devcontainer enviroment
 I use to develop the project, it's a Node.js & Typescript @ desktop linux image, it also includes usefull
 features and extentions like prisma, docker and postgres

- Originally I based this project on this one: https://github.com/daniellaera/supabase-react-auth ,
but it has become something very different. I'm using bootstrap and react-bootstrap fro the UI,
instead of what was used in the original repo, also I added my own auth system alongside using cookies for
the jwt's, instead of using the auth system from supabase, the prisma schemas are also different.
Also for the backend at some point I used this template: https://github.com/jsynowiec/node-typescript-boilerplate ,
but I also modify it a lot, I'm using jest for testing istead of vitest, for example, and I adapted the tsconfig.json
to this specific project.

# still, serious thanks to daniellaera, for a lot of great and very organized repos to work on and grow as a developer.
# as to the creator of the backend template I implemented here, jsynowiec