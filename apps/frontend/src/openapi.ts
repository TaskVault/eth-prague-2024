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
    "/posts/{wallet}": {
      "post": {
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "wallet",
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
                    },
                    "likes": {
                      "type": "number"
                    },
                    "dislikes": {
                      "type": "number"
                    },
                    "comments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "postId": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "text",
                          "postId",
                          "userId"
                        ]
                      }
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "image",
                    "userId",
                    "likes",
                    "dislikes",
                    "comments"
                  ]
                }
              }
            }
          },
          "404": {
            "description": "User not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "error"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/posts/{postId}": {
      "get": {
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "postId",
            "in": "path"
          }
        ],
        "responses": {
          "200": {
            "description": "Get post by id",
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
                    },
                    "likes": {
                      "type": "number"
                    },
                    "dislikes": {
                      "type": "number"
                    },
                    "comments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "postId": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "text",
                          "postId",
                          "userId"
                        ]
                      }
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "image",
                    "userId",
                    "likes",
                    "dislikes",
                    "comments"
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
                      },
                      "likes": {
                        "type": "number"
                      },
                      "dislikes": {
                        "type": "number"
                      },
                      "comments": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "text": {
                              "type": "string"
                            },
                            "postId": {
                              "type": "string"
                            },
                            "userId": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "id",
                            "text",
                            "postId",
                            "userId"
                          ]
                        }
                      }
                    },
                    "required": [
                      "id",
                      "title",
                      "image",
                      "userId",
                      "likes",
                      "dislikes",
                      "comments"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    "/posts/{postId}/reactions/{wallet}": {
      "put": {
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "postId",
            "in": "path"
          },
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "wallet",
            "in": "path"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "reaction": {
                    "type": "string",
                    "enum": [
                      "like",
                      "dislike"
                    ]
                  }
                },
                "required": [
                  "reaction"
                ]
              }
            }
          }
        },
        "responses": {
          "204": {
            "description": "Updated reaction"
          }
        }
      }
    },
    "/posts/{postId}/comments/{userId}": {
      "post": {
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "postId",
            "in": "path"
          },
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
                  "text": {
                    "type": "string"
                  }
                },
                "required": [
                  "text"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created comment"
          }
        }
      }
    },
    "/users": {
      "post": {
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "wallet": {
                    "type": "string"
                  }
                },
                "required": [
                  "wallet"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "wallet": {
                      "type": "string"
                    },
                    "posts": {
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
                    },
                    "reactions": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "reaction": {
                            "type": "string",
                            "enum": [
                              "like",
                              "dislike"
                            ]
                          },
                          "postId": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "reaction",
                          "postId",
                          "userId"
                        ]
                      }
                    },
                    "comments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "postId": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "text",
                          "postId",
                          "userId"
                        ]
                      }
                    }
                  },
                  "required": [
                    "id",
                    "wallet",
                    "posts",
                    "reactions",
                    "comments"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/users/{wallet}": {
      "get": {
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "required": true,
            "name": "wallet",
            "in": "path"
          }
        ],
        "responses": {
          "200": {
            "description": "Created user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "wallet": {
                      "type": "string"
                    },
                    "posts": {
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
                    },
                    "reactions": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "reaction": {
                            "type": "string",
                            "enum": [
                              "like",
                              "dislike"
                            ]
                          },
                          "postId": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "reaction",
                          "postId",
                          "userId"
                        ]
                      }
                    },
                    "comments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "postId": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "text",
                          "postId",
                          "userId"
                        ]
                      }
                    }
                  },
                  "required": [
                    "id",
                    "wallet",
                    "posts",
                    "reactions",
                    "comments"
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
} as const;