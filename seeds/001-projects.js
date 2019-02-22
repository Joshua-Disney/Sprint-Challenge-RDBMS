exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "clean apartment",
          description:
            "The living room, kitchen, and bathroom need to be cleaned",
          completed: false
        },
        {
          name: "fix car",
          description: "the car needs several parts maintenanced",
          completed: false
        },
        {
          name: "file taxes",
          description: "W2s need to be collected and filed with the IRS",
          completed: false
        }
      ]);
    });
};
