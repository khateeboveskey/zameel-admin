---
applyTo: '**'
---

## Instructions

- Don't use `nested` filters
- Always implement TS interfaces

## API Docs:

~~~md
# Swagger UI

<style>.logo_small_svg__cls-2{fill:#fff}.logo_small_svg__cls-3{fill:#85ea2d}</style>

Explore

## زميل 1.0.0 

OAS 3.0

[specs.yaml](specs.yaml)

Servers

https://api.zameel.mahmoudahmed.me/ - Production Environment

Authorize

### [User](#/User)

API documentation for User

GET

[/api/users](#/User/get_api_users)

Get a list of users

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "email": "string",
      "role_id": 0,
      "id": 0,
      "email_verified_at": "string",
      "created_at": "2025-06-14T14:24:12.942Z",
      "updated_at": "2025-06-14T14:24:12.942Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/users/me](#/User/get_api_users_me)

Get current user data

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "email": "string",
    "role_id": 0,
    "id": 0,
    "email_verified_at": "string",
    "created_at": "2025-06-14T14:24:12.944Z",
    "updated_at": "2025-06-14T14:24:12.944Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/users/search](#/User/post_api_users_search)

Search for users

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "name",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "name",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "email": "string",
      "role_id": 0,
      "id": 0,
      "email_verified_at": "string",
      "created_at": "2025-06-14T14:24:12.948Z",
      "updated_at": "2025-06-14T14:24:12.948Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/users/{user}/roles/{role}](#/User/post_api_users__user__roles__role_)

Change user role

#### Parameters

Try it out

Name

Description

user \*

integer

(path)

role \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "email": "string",
    "role_id": 0,
    "id": 0,
    "email_verified_at": "string",
    "created_at": "2025-06-14T14:24:12.950Z",
    "updated_at": "2025-06-14T14:24:12.950Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

### [Post](#/Post)

API documentation for Post

GET

[/api/posts](#/Post/get_api_posts)

Get posts timeline

#### Parameters

Try it out

Name

Description

cursor \*

string($datetime)

(query)

datetime in (YYYY-MM-DD hh:mm:ss) format

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "subject_id": 0,
      "taggable_type": "string",
      "taggable_id": 0,
      "content": "string",
      "files": [
        "string"
      ],
      "id": 0,
      "user_id": 0,
      "created_at": "2025-06-14T14:24:12.952Z",
      "updated_at": "2025-06-14T14:24:12.952Z"
    }
  ]
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/posts](#/Post/post_api_posts)

Create post

#### Parameters

Try it out

Name

Description

include

string

(query)

_Available values_ : files

\--files

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "subject_id": 0,
  "taggable_type": "string",
  "taggable_id": 0,
  "content": "string",
  "attachment": {
    "type": "string",
    "file": "string",
    "images": [
      "string"
    ]
  }
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "subject_id": 0,
    "taggable_type": "string",
    "taggable_id": 0,
    "content": "string",
    "files": [
      "string"
    ],
    "id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:12.955Z",
    "updated_at": "2025-06-14T14:24:12.955Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

POST

[/api/posts/search](#/Post/post_api_posts_search)

Search for posts

#### Parameters

Try it out

Name

Description

include

string

(query)

_Available values_ : files

\--files

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "scopes": [
    {
      "name": "student",
      "parameters": [
        "string"
      ]
    }
  ],
  "filters": [
    {
      "type": "and",
      "field": "created_at",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "created_at",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "subject_id": 0,
      "taggable_type": "string",
      "taggable_id": 0,
      "content": "string",
      "files": [
        "string"
      ],
      "id": 0,
      "user_id": 0,
      "created_at": "2025-06-14T14:24:12.958Z",
      "updated_at": "2025-06-14T14:24:12.958Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/posts/{post}](#/Post/get_api_posts__post_)

Get post

#### Parameters

Try it out

Name

Description

post \*

integer

(path)

include

string

(query)

_Available values_ : files

\--files

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "subject_id": 0,
    "taggable_type": "string",
    "taggable_id": 0,
    "content": "string",
    "files": [
      "string"
    ],
    "id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:12.960Z",
    "updated_at": "2025-06-14T14:24:12.960Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

DELETE

[/api/posts/{post}](#/Post/delete_api_posts__post_)

Delete post

#### Parameters

Try it out

Name

Description

post \*

integer

(path)

include

string

(query)

_Available values_ : files

\--files

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "subject_id": 0,
    "taggable_type": "string",
    "taggable_id": 0,
    "content": "string",
    "files": [
      "string"
    ],
    "id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:12.962Z",
    "updated_at": "2025-06-14T14:24:12.962Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [College](#/College)

API documentation for College

POST

[/api/colleges](#/College/post_api_colleges)

Create college

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string"
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:12.965Z",
    "updated_at": "2025-06-14T14:24:12.965Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/colleges](#/College/get_api_colleges)

Get a list of colleges

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "id": 0,
      "created_at": "2025-06-14T14:24:12.967Z",
      "updated_at": "2025-06-14T14:24:12.967Z",
      "deleted_at": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/colleges/search](#/College/post_api_colleges_search)

Search for colleges

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "id": 0,
      "created_at": "2025-06-14T14:24:12.969Z",
      "updated_at": "2025-06-14T14:24:12.969Z",
      "deleted_at": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/colleges/{college}](#/College/get_api_colleges__college_)

Get college

#### Parameters

Try it out

Name

Description

college \*

integer

(path)

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:12.971Z",
    "updated_at": "2025-06-14T14:24:12.971Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

PATCH

[/api/colleges/{college}](#/College/patch_api_colleges__college_)

Update college

#### Parameters

Try it out

Name

Description

college \*

integer

(path)

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:12.973Z",
    "updated_at": "2025-06-14T14:24:12.973Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

DELETE

[/api/colleges/{college}](#/College/delete_api_colleges__college_)

Delete college

#### Parameters

Try it out

Name

Description

college \*

integer

(path)

force

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:12.976Z",
    "updated_at": "2025-06-14T14:24:12.976Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/colleges/{college}/restore](#/College/post_api_colleges__college__restore)

Restore college

#### Parameters

Try it out

Name

Description

college \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:12.977Z",
    "updated_at": "2025-06-14T14:24:12.977Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Major](#/Major)

API documentation for Major

POST

[/api/majors](#/Major/post_api_majors)

Create major

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string",
  "college_id": 0,
  "degree_id": 0,
  "years": 0
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "college_id": 0,
    "degree_id": 0,
    "years": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:12.980Z",
    "updated_at": "2025-06-14T14:24:12.980Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/majors](#/Major/get_api_majors)

Get a list of majors

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "college_id": 0,
      "degree_id": 0,
      "years": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:12.982Z",
      "updated_at": "2025-06-14T14:24:12.982Z",
      "deleted_at": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/majors/search](#/Major/post_api_majors_search)

Search for majors

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "college_id",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "college_id",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "college_id": 0,
      "degree_id": 0,
      "years": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:12.986Z",
      "updated_at": "2025-06-14T14:24:12.986Z",
      "deleted_at": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/majors/{major}](#/Major/get_api_majors__major_)

Get major

#### Parameters

Try it out

Name

Description

major \*

integer

(path)

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "college_id": 0,
    "degree_id": 0,
    "years": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:12.989Z",
    "updated_at": "2025-06-14T14:24:12.989Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

PATCH

[/api/majors/{major}](#/Major/patch_api_majors__major_)

Update major

#### Parameters

Try it out

Name

Description

major \*

integer

(path)

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string",
  "college_id": 0,
  "degree_id": 0,
  "years": 0
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "college_id": 0,
    "degree_id": 0,
    "years": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:12.991Z",
    "updated_at": "2025-06-14T14:24:12.991Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

DELETE

[/api/majors/{major}](#/Major/delete_api_majors__major_)

Delete major

#### Parameters

Try it out

Name

Description

major \*

integer

(path)

force

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "college_id": 0,
    "degree_id": 0,
    "years": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:12.994Z",
    "updated_at": "2025-06-14T14:24:12.994Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/majors/{major}/restore](#/Major/post_api_majors__major__restore)

Restore major

#### Parameters

Try it out

Name

Description

major \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "college_id": 0,
    "degree_id": 0,
    "years": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:12.996Z",
    "updated_at": "2025-06-14T14:24:12.996Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Subject](#/Subject)

API documentation for Subject

POST

[/api/subjects](#/Subject/post_api_subjects)

Create subject

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string"
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:12.998Z",
    "updated_at": "2025-06-14T14:24:12.998Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/subjects](#/Subject/get_api_subjects)

Get a list of subjects

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "id": 0,
      "created_at": "2025-06-14T14:24:13.000Z",
      "updated_at": "2025-06-14T14:24:13.000Z",
      "deleted_at": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/subjects/search](#/Subject/post_api_subjects_search)

Search for subjects

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "id": 0,
      "created_at": "2025-06-14T14:24:13.003Z",
      "updated_at": "2025-06-14T14:24:13.003Z",
      "deleted_at": "string"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/subjects/{subject}](#/Subject/get_api_subjects__subject_)

Get subject

#### Parameters

Try it out

Name

Description

subject \*

integer

(path)

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:13.005Z",
    "updated_at": "2025-06-14T14:24:13.005Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

PATCH

[/api/subjects/{subject}](#/Subject/patch_api_subjects__subject_)

Update subject

#### Parameters

Try it out

Name

Description

subject \*

integer

(path)

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:13.007Z",
    "updated_at": "2025-06-14T14:24:13.007Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

DELETE

[/api/subjects/{subject}](#/Subject/delete_api_subjects__subject_)

Delete subject

#### Parameters

Try it out

Name

Description

subject \*

integer

(path)

force

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:13.010Z",
    "updated_at": "2025-06-14T14:24:13.010Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/subjects/{subject}/restore](#/Subject/post_api_subjects__subject__restore)

Restore subject

#### Parameters

Try it out

Name

Description

subject \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "id": 0,
    "created_at": "2025-06-14T14:24:13.011Z",
    "updated_at": "2025-06-14T14:24:13.011Z",
    "deleted_at": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Group](#/Group)

API documentation for Group

POST

[/api/groups](#/Group/post_api_groups)

Create group

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "join_year": "string",
  "division": "string",
  "major_id": 0
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "join_year": "string",
    "division": "string",
    "major_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.014Z",
    "updated_at": "2025-06-14T14:24:13.014Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/groups](#/Group/get_api_groups)

Get a list of groups

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "join_year": "string",
      "division": "string",
      "major_id": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.015Z",
      "updated_at": "2025-06-14T14:24:13.015Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/groups/search](#/Group/post_api_groups_search)

Search for groups

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "created_at",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "created_at",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "join_year": "string",
      "division": "string",
      "major_id": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.018Z",
      "updated_at": "2025-06-14T14:24:13.018Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/groups/{group}](#/Group/get_api_groups__group_)

Get group

#### Parameters

Try it out

Name

Description

group \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "join_year": "string",
    "division": "string",
    "major_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.020Z",
    "updated_at": "2025-06-14T14:24:13.020Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/groups/{group}/restore](#/Group/post_api_groups__group__restore)

Restore group

#### Parameters

Try it out

Name

Description

group \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "join_year": "string",
    "division": "string",
    "major_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.022Z",
    "updated_at": "2025-06-14T14:24:13.022Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/groups/batch](#/Group/post_api_groups_batch)

Create a batch of groups

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "resources": [
    {
      "join_year": "string",
      "division": "string",
      "major_id": 0
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "join_year": "string",
      "division": "string",
      "major_id": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.026Z",
      "updated_at": "2025-06-14T14:24:13.026Z"
    }
  ]
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

### [Apply](#/Apply)

API documentation for Apply

POST

[/api/applies](#/Apply/post_api_applies)

Create group user apply

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "group_id": 0,
  "status_id": 0,
  "note": "string"
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "group_id": 0,
    "status_id": 0,
    "note": "string",
    "id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:13.028Z",
    "updated_at": "2025-06-14T14:24:13.028Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/applies](#/Apply/get_api_applies)

Get a list of group user applies

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "group_id": 0,
      "status_id": 0,
      "note": "string",
      "id": 0,
      "user_id": 0,
      "created_at": "2025-06-14T14:24:13.030Z",
      "updated_at": "2025-06-14T14:24:13.030Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/applies/search](#/Apply/post_api_applies_search)

Search for group user applies

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "user_id",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "user_id",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "group_id": 0,
      "status_id": 0,
      "note": "string",
      "id": 0,
      "user_id": 0,
      "created_at": "2025-06-14T14:24:13.032Z",
      "updated_at": "2025-06-14T14:24:13.032Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/applies/{apply}](#/Apply/get_api_applies__apply_)

Get group user apply

#### Parameters

Try it out

Name

Description

apply \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "group_id": 0,
    "status_id": 0,
    "note": "string",
    "id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:13.034Z",
    "updated_at": "2025-06-14T14:24:13.034Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

DELETE

[/api/applies/{apply}](#/Apply/delete_api_applies__apply_)

Delete group user apply

#### Parameters

Try it out

Name

Description

apply \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "group_id": 0,
    "status_id": 0,
    "note": "string",
    "id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:13.036Z",
    "updated_at": "2025-06-14T14:24:13.036Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Teaching](#/Teaching)

API documentation for Teaching

POST

[/api/teaching](#/Teaching/post_api_teaching)

Create group subject user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "user_id": 0,
  "group_id": 0,
  "subject_id": 0
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "user_id": 0,
    "group_id": 0,
    "subject_id": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/teaching](#/Teaching/get_api_teaching)

Get a list of group subject user

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "user_id": 0,
      "group_id": 0,
      "subject_id": 0
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/teaching/search](#/Teaching/post_api_teaching_search)

Search for group subject user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "user_id",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "user_id",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "user_id": 0,
      "group_id": 0,
      "subject_id": 0
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/teaching/{teaching}](#/Teaching/get_api_teaching__teaching_)

Get group subject user

#### Parameters

Try it out

Name

Description

teaching \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "user_id": 0,
    "group_id": 0,
    "subject_id": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

DELETE

[/api/teaching/{teaching}](#/Teaching/delete_api_teaching__teaching_)

Delete group subject user

#### Parameters

Try it out

Name

Description

teaching \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "user_id": 0,
    "group_id": 0,
    "subject_id": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

POST

[/api/teaching/batch](#/Teaching/post_api_teaching_batch)

Create a batch of group subject user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "resources": [
    {
      "user_id": 0,
      "group_id": 0,
      "subject_id": 0
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "user_id": 0,
      "group_id": 0,
      "subject_id": 0
    }
  ]
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

DELETE

[/api/teaching/batch](#/Teaching/delete_api_teaching_batch)

Delete a batch of group subject user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "resources": [
    0
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "user_id": 0,
      "group_id": 0,
      "subject_id": 0
    }
  ]
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

### [Book](#/Book)

API documentation for Book

POST

[/api/books](#/Book/post_api_books)

Create book

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string",
  "path": "string",
  "subject_id": 0,
  "group_id": 0,
  "is_practical": 0,
  "year": 0,
  "semester": 0,
  "is_arabic": true
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "path": "string",
    "subject_id": 0,
    "group_id": 0,
    "is_practical": 0,
    "year": 0,
    "semester": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.052Z",
    "updated_at": "2025-06-14T14:24:13.052Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/books](#/Book/get_api_books)

Get a list of books

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "path": "string",
      "subject_id": 0,
      "group_id": 0,
      "is_practical": 0,
      "year": 0,
      "semester": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.054Z",
      "updated_at": "2025-06-14T14:24:13.054Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/books/search](#/Book/post_api_books_search)

Search for books

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "subject_id",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "subject_id",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "name": "string",
      "path": "string",
      "subject_id": 0,
      "group_id": 0,
      "is_practical": 0,
      "year": 0,
      "semester": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.056Z",
      "updated_at": "2025-06-14T14:24:13.056Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/books/{book}](#/Book/get_api_books__book_)

Get book

#### Parameters

Try it out

Name

Description

book \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "path": "string",
    "subject_id": 0,
    "group_id": 0,
    "is_practical": 0,
    "year": 0,
    "semester": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.058Z",
    "updated_at": "2025-06-14T14:24:13.058Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

PATCH

[/api/books/{book}](#/Book/patch_api_books__book_)

Update book

#### Parameters

Try it out

Name

Description

book \*

integer

(path)

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string",
  "path": "string",
  "subject_id": 0,
  "group_id": 0,
  "is_practical": 0,
  "year": 0,
  "semester": 0
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "path": "string",
    "subject_id": 0,
    "group_id": 0,
    "is_practical": 0,
    "year": 0,
    "semester": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.065Z",
    "updated_at": "2025-06-14T14:24:13.065Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

DELETE

[/api/books/{book}](#/Book/delete_api_books__book_)

Delete book

#### Parameters

Try it out

Name

Description

book \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "path": "string",
    "subject_id": 0,
    "group_id": 0,
    "is_practical": 0,
    "year": 0,
    "semester": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.072Z",
    "updated_at": "2025-06-14T14:24:13.072Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

GET

[/api/books/{book}/summary](#/Book/get_api_books__book__summary)

Get book

#### Parameters

Try it out

Name

Description

book \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "id": 0,
    "book_id": 0,
    "content": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

GET

[/api/books/{book}/quiz](#/Book/get_api_books__book__quiz)

Get book

#### Parameters

Try it out

Name

Description

book \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "id": 0,
    "book_id": 0,
    "content": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Assignment](#/Assignment)

API documentation for Assignment

POST

[/api/assignments](#/Assignment/post_api_assignments)

Create assignment

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "title": "string",
  "description": "string",
  "due_date": "string",
  "subject_id": 0,
  "group_id": 0
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "title": "string",
    "description": "string",
    "due_date": "string",
    "subject_id": 0,
    "group_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.086Z",
    "updated_at": "2025-06-14T14:24:13.086Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/assignments](#/Assignment/get_api_assignments)

Get a list of assignments

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "title": "string",
      "description": "string",
      "due_date": "string",
      "subject_id": 0,
      "group_id": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.090Z",
      "updated_at": "2025-06-14T14:24:13.090Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/assignments/search](#/Assignment/post_api_assignments_search)

Search for assignments

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "filters": [
    {
      "type": "and",
      "field": "due_date",
      "operator": "<",
      "value": "string",
      "nested": [
        {
          "type": "and",
          "field": "due_date",
          "operator": "<",
          "value": "string"
        }
      ]
    }
  ]
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "title": "string",
      "description": "string",
      "due_date": "string",
      "subject_id": 0,
      "group_id": 0,
      "id": 0,
      "created_at": "2025-06-14T14:24:13.096Z",
      "updated_at": "2025-06-14T14:24:13.096Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/assignments/{assignment}](#/Assignment/get_api_assignments__assignment_)

Get assignment

#### Parameters

Try it out

Name

Description

assignment \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "title": "string",
    "description": "string",
    "due_date": "string",
    "subject_id": 0,
    "group_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.108Z",
    "updated_at": "2025-06-14T14:24:13.108Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

PATCH

[/api/assignments/{assignment}](#/Assignment/patch_api_assignments__assignment_)

Update assignment

#### Parameters

Try it out

Name

Description

assignment \*

integer

(path)

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "due_date": "2025-06-14T14:24:13.112Z"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "title": "string",
    "description": "string",
    "due_date": "string",
    "subject_id": 0,
    "group_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.112Z",
    "updated_at": "2025-06-14T14:24:13.112Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

422

Validation error

_No links_

DELETE

[/api/assignments/{assignment}](#/Assignment/delete_api_assignments__assignment_)

Delete assignment

#### Parameters

Try it out

Name

Description

assignment \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "title": "string",
    "description": "string",
    "due_date": "string",
    "subject_id": 0,
    "group_id": 0,
    "id": 0,
    "created_at": "2025-06-14T14:24:13.115Z",
    "updated_at": "2025-06-14T14:24:13.115Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Delivery](#/Delivery)

API documentation for Delivery

POST

[/api/deliveries](#/Delivery/post_api_deliveries)

Create assignment user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "type": "string",
  "content": "string",
  "assignment_id": 0
}
```

#### Responses

Code

Description

Links

201

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "type": "string",
    "content": "string",
    "assignment_id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:13.118Z",
    "updated_at": "2025-06-14T14:24:13.118Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

422

Validation error

_No links_

GET

[/api/deliveries](#/Delivery/get_api_deliveries)

Get a list of assignment user

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "type": "string",
      "content": "string",
      "assignment_id": 0,
      "user_id": 0,
      "created_at": "2025-06-14T14:24:13.119Z",
      "updated_at": "2025-06-14T14:24:13.119Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/deliveries/search](#/Delivery/post_api_deliveries_search)

Search for assignment user

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "type": "string",
      "content": "string",
      "assignment_id": 0,
      "user_id": 0,
      "created_at": "2025-06-14T14:24:13.121Z",
      "updated_at": "2025-06-14T14:24:13.121Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

GET

[/api/deliveries/{delivery}](#/Delivery/get_api_deliveries__delivery_)

Get assignment user

#### Parameters

Try it out

Name

Description

delivery \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "type": "string",
    "content": "string",
    "assignment_id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:13.123Z",
    "updated_at": "2025-06-14T14:24:13.123Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

DELETE

[/api/deliveries/{delivery}](#/Delivery/delete_api_deliveries__delivery_)

Delete assignment user

#### Parameters

Try it out

Name

Description

delivery \*

integer

(path)

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "type": "string",
    "content": "string",
    "assignment_id": 0,
    "user_id": 0,
    "created_at": "2025-06-14T14:24:13.125Z",
    "updated_at": "2025-06-14T14:24:13.125Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

404

Resource not found

_No links_

### [Member](#/Member)

API documentation for Member

GET

[/api/members](#/Member/get_api_members)

Get a list of colleges

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "is_representer": true,
      "user_id": 0,
      "group_id": 0,
      "created_at": "2025-06-14T14:24:13.127Z",
      "updated_at": "2025-06-14T14:24:13.128Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

POST

[/api/members/search](#/Member/post_api_members_search)

Search for colleges

#### Parameters

Try it out

Name

Description

with\_trashed

boolean

(query)

\--truefalse

only\_trashed

boolean

(query)

\--truefalse

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": [
    {
      "is_representer": true,
      "user_id": 0,
      "group_id": 0,
      "created_at": "2025-06-14T14:24:13.130Z",
      "updated_at": "2025-06-14T14:24:13.130Z"
    }
  ],
  "links": {
    "first": "string",
    "last": "string",
    "prev": "string",
    "next": "string"
  },
  "meta": {
    "current_page": 0,
    "from": 0,
    "last_page": 0,
    "path": "string",
    "per_page": 0,
    "to": 0,
    "total": 0
  }
}
```

_No links_

401

Unauthenticated

_No links_

403

Unauthorized

_No links_

### [Auth](#/Auth)

POST

[/api/login](#/Auth/post_api_login)

Create user token

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "email": "string",
  "password": "string",
  "deviceName": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "email": "string",
    "role_id": 0,
    "id": 0,
    "email_verified_at": "string",
    "created_at": "2025-06-14T14:24:13.132Z",
    "updated_at": "2025-06-14T14:24:13.132Z",
    "token": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

422

Validation error

_No links_

POST

[/api/register](#/Auth/post_api_register)

Create user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string",
  "deviceName": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "email": "string",
    "role_id": 0,
    "id": 0,
    "email_verified_at": "string",
    "created_at": "2025-06-14T14:24:13.134Z",
    "updated_at": "2025-06-14T14:24:13.134Z",
    "token": "string"
  }
}
```

_No links_

401

Unauthenticated

_No links_

422

Validation error

_No links_

POST

[/api/users/update-password](#/Auth/post_api_users_update_password)

Create user

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "password": "string",
  "newPassword": "string",
  "newPassword_confirmation": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "data": {
    "name": "string",
    "email": "string",
    "role_id": 0,
    "id": 0,
    "email_verified_at": "string",
    "created_at": "2025-06-14T14:24:13.136Z",
    "updated_at": "2025-06-14T14:24:13.136Z"
  }
}
```

_No links_

401

Unauthenticated

_No links_

422

Validation error

_No links_

POST

[/api/logout](#/Auth/post_api_logout)

Logout

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "message": "logged out"
}
```

_No links_

401

Unauthenticated

_No links_

POST

[/api/verify-email](#/Auth/post_api_verify_email)

Verify email

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "otp": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "message": "Email verified."
}
```

_No links_

400

Email already verified or OTP issue.

_No links_

401

Unauthenticated

_No links_

422

Validation error

_No links_

POST

[/api/email/verification-notification](#/Auth/post_api_email_verification_notification)

Send verification notification

#### Parameters

Try it out

No parameters

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "message": "Email Sent."
}
```

_No links_

400

Email already verified or OTP issue.

_No links_

401

Unauthenticated

_No links_

422

Validation error

_No links_

502

Failed To Send Email.

_No links_

POST

[/api/forgot-password](#/Auth/post_api_forgot_password)

Send reset link

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "email": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "message": "Email sent."
}
```

_No links_

422

Validation error

_No links_

502

Failed To Send Email.

_No links_

POST

[/api/reset-password](#/Auth/post_api_reset_password)

Reset password

#### Parameters

Try it out

No parameters

#### Request body

application/json

-   Example Value
-   Schema

```json
{
  "token": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

#### Responses

Code

Description

Links

200

OK

Media type

application/json

Controls `Accept` header.

-   Example Value
-   Schema

```json
{
  "message": "Password reset."
}
```

_No links_

422

Validation error

_No links_

500

Password reset failed.

_No links_

#### Schemas

Post{

subject\_id

integer  
nullable: true

taggable\_type

string  
nullable: true

taggable\_id

integer  
nullable: true

content

string  
nullable: true

}

PostResource{

subject\_id

integer  
nullable: true

taggable\_type

string  
nullable: true

taggable\_id

integer  
nullable: true

content

string  
nullable: true

files

\[string\]

id

integer

user\_id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

College{

name

string

}

CollegeResource{

name

string

id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

deleted\_at

string  
nullable: true

}

Major{

name

string

college\_id

integer

degree\_id

integer

years

integer

}

MajorResource{

name

string

college\_id

integer

degree\_id

integer

years

integer

id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

deleted\_at

string  
nullable: true

}

Subject{

name

string

}

SubjectResource{

name

string

id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

deleted\_at

string  
nullable: true

}

Group{

join\_year

{

}

division

string

major\_id

integer

}

GroupResource{

join\_year

{

}

division

string

major\_id

integer

id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

Apply{

group\_id

integer

status\_id

integer

note

string  
nullable: true

}

ApplyResource{

group\_id

integer

status\_id

integer

note

string  
nullable: true

id

integer

user\_id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

Teaching{

user\_id

integer

group\_id

integer

subject\_id

integer

}

TeachingResource{

user\_id

integer

group\_id

integer

subject\_id

integer

}

Book{

name

string

path

string

subject\_id

integer  
nullable: true

group\_id

integer  
nullable: true

is\_practical

integer

year

integer

semester

integer

}

BookResource{

name

string

path

string

subject\_id

integer  
nullable: true

group\_id

integer  
nullable: true

is\_practical

integer

year

integer

semester

integer

id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

Assignment{

title

string

description

string  
nullable: true

due\_date

string

subject\_id

integer  
nullable: true

group\_id

integer  
nullable: true

}

AssignmentResource{

title

string

description

string  
nullable: true

due\_date

string

subject\_id

integer  
nullable: true

group\_id

integer  
nullable: true

id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

Delivery{

type

string

content

string

assignment\_id

integer

}

Delivery{

is\_representer

boolean

}

DeliveryResource{

type

string

content

string

assignment\_id

integer

user\_id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

DeliveryResource{

is\_representer

boolean

user\_id

integer

group\_id

integer

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}

ResourceLinks{

first

string($uri)

last

string($uri)

prev

string($uri)

next

string($uri)

}

ResourceMeta{

current\_page

integer

from

integer

last\_page

integer

path

string

per\_page

integer

to

integer

total

integer

}

User{

name

string

email

string

role\_id

integer

}

UserResource{

name

string

email

string

role\_id

integer

id

integer

email\_verified\_at

string  
nullable: true

created\_at

string($date-time)  
nullable: true

updated\_at

string($date-time)  
nullable: true

}
~~~