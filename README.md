# small-api-app

small-api-app is a small NodeJS api which will post some JSON data to the URL and return a few fields after filetering it from the json data

## How to run this service

From the command line

```cli
//install dependencies
npm install

//start REST server
npm start
```

Now, the service runs on your local machine. After running the rest server, the
command line will notify on which port the service is running on. Service
defaults localhost:8080/

## How to run this service on web
## Happy Path: 
localhost:8080/type/workflow e.g localhost:8080/htv/completed
Note: 'type' and 'workflow' are keys of JSON object defined in the payload.json

```cli
response
{
    "response": [
        {
            "type": "htv",
            "workflow": "completed",
            "concataddress": "Level 6 146 Arthur Street North Sydney NSW 2060"
        },
        {
            "type": "htv",
            "workflow": "completed",
            "concataddress": "360 Elizabeth St Melbourne VIC 3000"
        }
    ]
}
```
## Sad Path: 
 e.g localhost:8080/anything/completed
 
```cli
{
    "error": "Could not decode request: JSON parsing failed"
}
```

## Special Characters
e.g localhost:8080/%%%/completed

```cli
RENDER ERROR PAGE
