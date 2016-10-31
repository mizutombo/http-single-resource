![cf](http://i.imgur.com/7v5ASc8.png) http-single-resource
====

## Description

For this assignment, write an http server that will handle a single resource, backed by a persistent data store.

It should respond to GET, POST, PUT and DELETE requests for a named resource of your choosing, for example "notes":

* `GET` - A get request sent to `/notes` should respond with a list of all
of the notes that have been saved thus far. A get request sent to
`/notes/name_of_resource` should respond with that resource.

* `POST` - The in-coming post request body should be saved
to storage. For example if a request
is sent to `/notes` with a body of `{ noteBody: 'hello world' }` the store
would now contain an object from that data.

* `PUT` - The data coming in should be saved to the named resource either
creating or updating in entirety. So a request to `/notes/name_of_resources`
is idempotent in that the contents in the body of the request always become
the new data for that resource.

* `DELETE` - The corresponding resource should be removed. `notes/name_of_resource`
would remove resource `name_of_resource`

Respond with appropriate status code (`400`, `404`, etc.) and content type (`application/json`)

For `POST` and `PUT` you'll need to ready the body!

For your data store:
* any promise enabled store
  * https://www.npmjs.com/package/fs-extra-promise
  * https://www.npmjs.com/package/sander
  * your file store
  * firebase?
  * ?

The api exposed by the server should be E2E tested with `chai-http`

#### Rubric:
* Promises: 4pts
* Design/Organziation: 2pts
* "Routing": 2pts
* "Routing" Testing: 2pts

## Bonus Points For More Fun:

* App: *3pts*
	* Serve an index.html that displays data and allows users to manipulate using api methods
