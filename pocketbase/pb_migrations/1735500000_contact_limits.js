/// <reference path="../pb_data/types.d.ts" />

// Anti-spam hardening for contact_messages: cap field lengths so bots can't
// flood the DB/inbox with huge payloads.
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('contact_messages')

    const name = collection.fields.getByName('name')
    if (name) name.max = 120

    const message = collection.fields.getByName('message')
    if (message) message.max = 2000

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('contact_messages')

    const name = collection.fields.getByName('name')
    if (name) name.max = 0

    const message = collection.fields.getByName('message')
    if (message) message.max = 0

    return app.save(collection)
  },
)
