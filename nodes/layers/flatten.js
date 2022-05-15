export default {
  name: "Flatten",
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
  generator: (n) => {
    return "tf.keras.layers.Flatten()";
  },
};
