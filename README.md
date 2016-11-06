# We.js search plugin 

Automaticaly add suport for use url query params as database query where params in findAll actions.

## Installation

```js
we i we-plugin-search
```

## Example:

For model bellow:

server/models/post.json:
```json
{
  "attributes": {
    "title": {
      "type": "string",
      "allowNull": false
    },
    "title": {
      "type": "string",
      "allowNull": false
    },    
    "body": {
      "type": "text"
    },
    "category": {
      "type": "string",
      "defaultValue": null
    },
    "comments": {
      "type": "INTEGER",
      "defaultValue": 0
    },
    "published": {
      "type": "boolean",
      "defaultValue": false
    }
  }
}
```

Will accept this query params as filters:

- 'get /post?id=[id]'
- 'get /post?id_equal=[id]'
- 'get /post?id_is-null=true'
- 'get /post?id_is-null=true'
- 'get /post?id_not-is-null=true'
- 'get /post?id_between=10-20'
- 'get /post?id_not-between=10-30'
- 'get /post?id_gt=2'
- 'get /post?id_gte=2'
- 'get /post?id_lt=20'
- 'get /post?id_lte=20'
- 'get /post?title=Oi mundo'
- 'get /post?title_equal=Oi mundo'
- 'get /post?title_is-null=true'
- 'get /post?title_not-is-null=true'
- 'get /post?title_starts-with=Oi'
- 'get /post?title_not-starts-with=Oi'
- 'get /post?title_ends-with=Mundo'
- 'get /post?title_not-ends-with=Mundo'
- 'get /post?title_contains=Mundo'
- 'get /post?title_not-contains=Mundo'
- 'get /post?body=Something'
- 'get /post?body_equal=Something'
- 'get /post?body_equal=Something'

... see all query params in: https://github.com/wejs/we-plugin-search/blob/master/plugin.js#L15

@TODO list all query params generated here

## Links

* We.js site: http://wejs.org

## License

[MIT license](https://github.com/wejs/we-core/blob/master/LICENSE.md).