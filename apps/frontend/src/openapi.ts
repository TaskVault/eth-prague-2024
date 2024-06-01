export default {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "api"
  },
  "components": {
    "schemas": {},
    "parameters": {}
  },
  "paths": {
    "/posts/{userId}": {
      "post": {
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "userId",
            "in": "path"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  }
                },
                "required": [
                  "title",
                  "image"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created post",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    },
                    "userId": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "image",
                    "userId"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/posts": {
      "get": {
        "responses": {
          "200": {
            "description": "Get all posts",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "title": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "image": {
                        "type": "string"
                      },
                      "userId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "id",
                      "title",
                      "image",
                      "userId"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  }
} as const;