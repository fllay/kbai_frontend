export default {
  name: "MaxPooling2D",
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
      name: "pool_size",
      description:
        "Integer of window size over which to take the maximum. (2, 2) will take the max value over a 2x2 pooling window",
      type: "number",
      default: 2,
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
  ],
  generator: (n) => {
    return "tf.keras.layers.MaxPooling2D(pool_size=${pool_size}, strides=${strides}, padding='${padding}')";
  },
};
