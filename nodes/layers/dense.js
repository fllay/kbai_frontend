export default {
  name: "Dense",
  input: [
    {
      name: "input",
      accept: ["tensor"],
    },
  ],
  output: [
    {
      name: "output",
      type: "tensor",
    },
  ],
  options: [
    {
      name: "output_nodes",
      description: "Positive integer, dimensionality of the output space.",
      type: "number",
      default: 50,
    },
    {
      name: "activation",
      description:
        "Activation function to use. If you don't specify anything, no activation is applied",
      type: "string",
      options: ["relu", "sigmoid", "softmax"],
      default: "relu",
    },
    {
      name: "use_bias",
      description: "Boolean, whether the layer uses a bias vector",
      type: "boolean",
      default: true,
    },
  ],
  generator: (n) => {
    return "tf.keras.layers.Dense(${output_nodes}, use_bias=${use_bias}, activation='${activation}')";
  },
};
