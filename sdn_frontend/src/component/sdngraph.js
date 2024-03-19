import React, { useCallback, useState } from 'react';
import 'reactflow/dist/style.css';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import { Button, Flex } from 'antd';
import 'reactflow/dist/style.css';
import './sdngraph.css';

const initialNodes = [
    { id: 's0', position: { x: 300, y: 50 }, data: { label: 'Core Switch' } },
    { id: 's1', position: { x: 300, y: 150 }, data: { label: 'Switch 1' } },
    { id: 'r1', position: { x: 150, y: 300 }, data: { label: 'Router 1' } },
];

const initialEdges = [
    { id: 'es1-r1', source: 's1', target: 'r1' },
    { id: 'es0-s1', source: 's0', target: 's1' },
];

// Initial JSON structure
const initialJson = {
    nodes: [
      { id: 's0', type: 'switch', department: 'core' },
      { id: 's1', type: 'switch', department: 'external' },
      { id: 'c1', type: 'controller' }
    ],
    links: [
      { source: 's0', target: 's1' }
    ]
};

function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [networkJson, setNetworkJson] = useState(initialJson);


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    
    const addNode = useCallback((type) => {
        const typeInitial = type.charAt(0).toLowerCase(); // 's' for Switch, 'r' for Router, 'h' for Host
        const filteredNodes = nodes.filter(node => node.id.startsWith(typeInitial));
        const maxNumber = filteredNodes.reduce((max, node) => {
            const currentNumber = parseInt(node.id.slice(1), 10);
            return currentNumber > max ? currentNumber : max;
        }, 0);
        const newNumber = maxNumber + 1;
        const newNodeId = `${typeInitial}${newNumber}`;
        const newNode = {
            id: newNodeId,
            position: { x: Math.random() * 400, y: Math.random() * 400 }, // Adjust position logic as needed
            data: { label: `${type} ${newNumber}` },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [nodes, setNodes]);

    const sendRequest = useCallback(() => {
        // Map the nodes to the expected JSON structure
        const updatedNodes = nodes.map(node => {
            const typePrefix = node.id.charAt(0); // Get the first character to determine the type
            let type = "host"; // Default to "host"
            if (typePrefix === 's') {
                type = "switch";
            } else if (typePrefix === 'r') {
                type = "router";
            }
    
            return {
                id: node.id,
                type: type,
                // Assuming IP and department are not available, set to "NA"
                // Adjust accordingly if your node data structure includes these details
                ip: "NA",
                department: "NA",
            };
        });
    
        // Map the edges to the expected JSON structure
        const updatedLinks = edges.map(edge => ({
            source: edge.source,
            target: edge.target,
        }));
    
        // Update the networkJson state with the new nodes and links
        setNetworkJson({
            nodes: updatedNodes,
            links: updatedLinks,
        });
    
        // Here you would typically send the updated JSON to a server or API endpoint
        // For demonstration, we'll just alert the JSON string
        alert(JSON.stringify({
            nodes: updatedNodes,
            links: updatedLinks,
        }, null, 2));
    }, [nodes, edges, setNetworkJson]);
    
    // Update here to directly print the current state of networkJson
    const debugNetwork = useCallback(() => {
        console.log('Current Network JSON:', JSON.stringify(networkJson, null, 2));
    }, [networkJson]);

    return (
        <div>
            <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            </div>

            <div className='buttonGroup'>
                <Button type="primary" onClick={() => addNode('Switch')}>Switch</Button>
                <Button type="primary" onClick={() => addNode('Router')}>Router</Button>
                <Button type="primary" onClick={() => addNode('Host')}>Host</Button>
                <Button type="primary" danger onClick={sendRequest}>Send Request</Button>
                <Button danger onClick={debugNetwork}>Debug</Button>
            </div>
            
        </div>
        
    );
    }
  
  export default Flow;
