# e599-KGraph

## API Schema
In order to keep the API and UI types in sync, we're using
JSON schema and quicktype to automatically generate the
serializers and deserialzers for both the frontend and backend

To generate an updated schema, first, make sure quicktype is installed.

`npm install -g quicktype`

then run the bash command

`./generate_types`

and that's it!
