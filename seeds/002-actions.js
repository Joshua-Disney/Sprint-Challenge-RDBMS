exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "pick up and throw away trash",
          notes: "take the trash out every time the trashcan gets full",
          completed: false,
          project_id: 1
        },
        {
          description: "wash all dishes",
          notes:
            "empty sink and refill with hot soapy water when old water becomes discolored",
          completed: false,
          project_id: 1
        },
        {
          description: "wash sink and tub",
          notes: "don't forget to empty the cat's litter box",
          completed: false,
          project_id: 1
        },
        {
          description: "check fluids",
          notes: "refill any that are low, change out any that are dirty",
          completed: false,
          project_id: 2
        },
        {
          description: "clean interior",
          notes:
            "check under the seats, and in the glovebox and center console",
          completed: false,
          project_id: 2
        },
        {
          description: "collect W2s",
          notes: "contact any employers that haven't sent last years paperwork",
          completed: false,
          project_id: 3
        }
      ]);
    });
};
