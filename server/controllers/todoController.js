const ToDo = require("../models/todoModel");

const apiCallback = (error, data, res) => {
  if (error) res.json({ err: "error occured", error });
  res.status(202).json(data);
};

module.exports.addToDo = (req, res) => {
  ToDo.create(req.body, (error, data) => {
    apiCallback(error, data, res);
  });
};

module.exports.getUserTodos = (req, res) => {
  const { _id } = req.params;
  ToDo.find({ userId: _id }, (error, data) => {
    apiCallback(error, data, res);
  });
};

module.exports.deleteToDo = (req, res) => {
  const { _id } = req.params;
  ToDo.findByIdAndRemove({ _id }, (error, data) => {
    apiCallback(error, data, res);
  });
};

module.exports.markAsComplete = (req, res) => {
  const { _id } = req.params;
  ToDo.findOneAndUpdate(
    { _id },
    [{ $set: { completed: { $eq: [false, "$completed"] } } }],
    (error, data) => {
      apiCallback(error, data, res);
    }
  );
};
