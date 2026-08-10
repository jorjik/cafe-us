/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const categories = new Collection({
      type: 'base',
      name: 'menu_categories',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: 'text', name: 'name', required: true },
        { type: 'text', name: 'slug', required: true },
        { type: 'number', name: 'sort', required: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_menu_categories_slug ON menu_categories (slug)'],
    })
    app.save(categories)

    const items = new Collection({
      type: 'base',
      name: 'menu_items',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: 'text', name: 'name', required: true },
        { type: 'number', name: 'price', required: true },
        { type: 'text', name: 'description', required: false },
        {
          type: 'relation',
          name: 'category',
          required: true,
          collectionId: categories.id,
          maxSelect: 1,
          cascadeDelete: false,
        },
        { type: 'json', name: 'tags', required: false },
        { type: 'bool', name: 'featured', required: false },
        { type: 'file', name: 'image', required: false, maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] },
        { type: 'number', name: 'sort', required: true },
      ],
    })
    app.save(items)

    const contact = new Collection({
      type: 'base',
      name: 'contact_messages',
      listRule: null,
      viewRule: null,
      createRule: '',
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: 'text', name: 'name', required: true },
        { type: 'email', name: 'email', required: true },
        { type: 'text', name: 'message', required: true },
      ],
    })
    app.save(contact)

    const settings = new Collection({
      type: 'base',
      name: 'site_settings',
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { type: 'text', name: 'address', required: true },
        { type: 'text', name: 'phone', required: true },
        { type: 'email', name: 'email', required: true },
        { type: 'text', name: 'hours', required: false },
        { type: 'url', name: 'instagram', required: false },
        { type: 'url', name: 'facebook', required: false },
        { type: 'text', name: 'order_url', required: false },
      ],
    })
    app.save(settings)
  },
  (app) => {
    for (const name of ['menu_items', 'menu_categories', 'contact_messages', 'site_settings']) {
      try {
        const collection = app.findCollectionByNameOrId(name)
        app.delete(collection)
      } catch {
        // ignore missing collections on rollback
      }
    }
  },
)
