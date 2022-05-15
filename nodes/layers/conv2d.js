export default {
  name: "Convolution2D",
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
      name: "filters",
      description: "Integer, the dimensionality of the output space",
      type: "number",
      default: 2,
    },
    {
      name: "kernel_size",
      description:
        "[N x N] An integer specifying the height and width of the 2D convolution window",
      type: "number",
      default: 3,
    },
    {
      name: "strides",
      description:
        "[N x N] An integer or tuple/list of 2 integers, specifying the strides of the convolution along the height and width",
      type: "number",
      default: 1,
    },
    {
      name: "padding",
      description:
        '"valid" means no padding. "same" results in padding with zeros evenly to the left/right or up/down of the input. When padding="same" and strides=1, the output has the same size as the input',
      type: "string",
      options: ["valid", "same"],
      default: "same",
    },
    {
      name: "activation",
      description:
        "Activation function to use. If you don't specify anything, no activation is applied",
      type: "string",
      options: ["relu", "sigmoid"],
      default: "relu",
    },
    {
      name: "use_bias",
      description: "Boolean, whether the layer uses a bias vector",
      type: "boolean",
      default: true,
    },
  ],
  generator: (input) => {
    return "tf.keras.layers.Conv2D(${filters}, ${kernel_size}, strides=${strides}, padding='${padding}',use_bias=${use_bias}, activation='${activation}')";
  },
};
