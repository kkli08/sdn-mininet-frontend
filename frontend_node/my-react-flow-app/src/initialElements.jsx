export const initialNodes = [
  { id: '0',
    position: { x: 0, y: 0 },
    data: { label: 'From Sample!' }
  },
  {
    id: "1",
    type: "input",
    data: {
      label: "Welcome to React Flow!"
    },
    position: { x: 250, y: 0 }
  },
  {
    id: "2",
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      )
    },
    position: { x: 100, y: 100 }
  },
  {
    id: "3",
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      )
    },
    position: { x: 400, y: 100 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180
    }
  },
  {
    id: "6",
    type: "output",
    data: {
      label: (
        <>
          An <strong>output node</strong>
        </>
      )
    },
    position: { x: 100, y: 480 }
  }
];

export const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "this is an edge label" },
  { id: "e1-3", source: "1", target: "3" },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    label: "animated edge"
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    arrowHeadType: "arrowclosed",
    label: "edge with arrow head"
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    label: "smooth step edge"
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "step",
    style: { stroke: "#f6ab6c" },
    label: "a step edge",
    animated: true,
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 }
  }
];