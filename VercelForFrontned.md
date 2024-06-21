{
     "version": 2,
     "builds": [
          {
               "src": "frontend/package.json",
               "use": "@vercel/static-build",
               "config": {
                    "distDir": "frontend/dist"
               }
          }
     ],
     "routes": [
          {
               "src": "/(.*)",
               "dest": "/frontend/dist/$1"
          }
     ]
}



fo r backend
{
         "src": "/user/(.*)",
         "dest": "/backend/server.js"
       },
       {
         "src": "/api/(.*)",
         "dest": "/backend/server.js"
       },
       {
         "src": "/candidate/(.*)",
         "dest": "/backend/server.js"
       },
       {
         "src": "/query/(.*)",
         "dest": "/backend/server.js"
       },
       {
         "src": "/user/profile/(.*)",
         "dest": "/backend/server.js"
       },