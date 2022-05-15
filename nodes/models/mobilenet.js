export default {
  name: "MobileNet",
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
      name: "architecture",
      description: "Model Architecture ",
      type: "string",
      options: [
        { text: "MobileNet 100%", value: "MobileNet1_0" },
        { text: "MobileNet 75%", value: "MobileNet7_5" },
        { text: "MobileNet 50%", value: "MobileNet5_0" },
        { text: "MobileNet 25%", value: "MobileNet2_5" },
      ],
      default: "MobileNet1_0",
    },
    {
      name: "weights",
      description: "Initial weights",
      type: "string",
      options: [
        { text: "ImageNet", value: "imagenet" },
        { text: "Random", value: "None" },
      ],
      default: "imagenet",
    },
    {
      name: "trainable",
      description:
        "When enabled, all parameter will be random, else its preserved weight data",
      type: "boolean",
      default: true,
    },
  ],
  generator: (input) => {
    return '{"name" : "mobilenet", "model": "mobilenet", "arch" : "${architecture}", "trainable" : ${trainable}, "weights": "${weights}"}';
  },
};
