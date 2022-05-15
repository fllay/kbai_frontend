export default {
  name: "Input",
  output: [
    {
      name: "output",
      type: "tensor",
    },
  ],
  options: [
    {
      name: "input_width",
      description: "Input width",
      type: "number",
      default: 320,
    },
    {
      name: "input_height",
      description: "Input height",
      type: "number",
      default: 240,
    },
    {
      name: "train_split",
      description:
        "Number between 0 and 100. Fraction of percentage of training set split from dataset, the rest of them will use as validation.",
      type: "number",
      default: 80,
    },
    {
      name: "epochs",
      description:
        "Number of epochs to train the model. An epoch is an iteration over the entire x and y data provided",
      type: "number",
      default: 10,
    },
    {
      name: "train_times",
      description: "Number of training loop per epoch",
      type: "number",
      default: 1,
    },
    {
      name: "valid_times",
      description: "Number of validating loop per epoch",
      type: "number",
      default: 1,
    },
    {
      name: "batch_size",
      description: "Number of samples per gradient update",
      type: "number",
      default: 32,
    },
    {
      name: "learning_rate",
      description: "Floating point value, learning rate",
      type: "float",
      default: 0.0001,
    },
    {
      name: "pretrained_model",
      description: "pretrained model url file (Google Drive)",
      type: "input",
      default: "",
    },
  ],
  generator: (n) => {
    return '{"name":"input", "pretrained":"${pretrained_model}", "input_height":${input_height}, "input_width":${input_width}, "train_rate":${train_split},"epochs": ${epochs},"train_times":${train_times},"valid_times": ${valid_times}, "batch_size": ${batch_size}, "learning_rate": ${learning_rate}}';
  },
};
