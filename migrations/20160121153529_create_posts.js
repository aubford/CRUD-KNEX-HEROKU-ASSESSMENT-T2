
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts',function(t){
    t.increments()
    t.string('author')
    t.string('body')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};
