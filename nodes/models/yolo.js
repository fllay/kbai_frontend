export default {
  name: "YoLo",
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
        { text: "Full Yolo", value: "Full Yolo" },
        { text: "Tiny Yolo", value: "Tiny Yolo" },
        { text: "MobileNet 100%", value: "MobileNet1_0" },
        { text: "MobileNet 75%", value: "MobileNet7_5" },
        { text: "MobileNet 50%", value: "MobileNet5_0" },
        { text: "MobileNet 25%", value: "MobileNet2_5" },
      ],
      default: "MobileNet7_5",
    },
    {
      name: "object_threshold",
      description: "Object detect threshold",
      type: "float",
      default: 0.5,
    },
    {
      name: "iou_threshold",
      description: "IOU threshold",
      type: "float",
      default: 0.5,
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
  ],
  generator: (input) => {
    return '{"name" : "yolo", "model": "yolo", "arch" : "${architecture}", "obj_thresh":${object_threshold}, "iou_thresh":${iou_threshold}, "weights": "${weights}"}';
  },
};
