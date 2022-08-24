# Google Maps® API tests

A [Deno](https://github.com/denoland/docland) project that get Google Place® restaurants from the Google Maps® API.

## Settings

Put your Google Maps® secret API key in the *.env* file:

```ini
GOOGLE_MAPS_API_KEY=...
```

## Tests

Run the test suite with the command:

```shell
deno test -A
```

## Example

If you want to test the operation, the *example.js* script makes an example request and prints the first result returned. You can run it with the following command:

```shell
deno run -A example.js
```

## Documentation

You can see additional documentation as well as the syntax of the functions used in the *docs/index.html* file. If you would like to regenerate the documentation, you can do so with the command:

```shell
jsdoc -c .jsdoc.json
```
