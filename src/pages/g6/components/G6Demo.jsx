import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";
export function G6Topology() {
  const containerRef = useRef(null);

  useEffect(() => {
    //线
    G6.registerEdge(
      "circle-running",
      {
        afterDraw(cfg, group) {
          const shape = group.get("children")[0];
          const startPoint = shape.getPoint(0);
          const circle = group.addShape("circle", {
            attrs: {
              x: startPoint.x,
              y: startPoint.y,
              fill: "red",
              r: 3,
            },
            name: "circle-shape",
          });

          circle.animate(
            (ratio) => {
              const tmpPoint = shape.getPoint(ratio);
              return {
                x: tmpPoint.x,
                y: tmpPoint.y,
              };
            },
            {
              repeat: true, // Whether executes the animation repeatly
              duration: 3000, // the duration for executing once
            }
          );
        },
      },
      "cubic" // extend the built-in edge 'cubic'
    );

    //节点样式1
    G6.registerNode("card-node", {
      draw(cfg, group) {
        const r = 2;
        const color = "#5B8FF9";
        const w = cfg.size[0];
        const h = cfg.size[1];
        const shape = group.addShape("rect", {
          attrs: {
            x: -w / 2,
            y: -h / 2,
            width: w, //200,
            height: h, // 60
            stroke: color,
            radius: r,
            fill: "#fff",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "main-box",
          draggable: true,
        });

        group.addShape("rect", {
          attrs: {
            x: -w / 2,
            y: -h / 2,
            width: w, //200,
            height: h / 2, // 60
            fill: color,
            radius: [r, r, 0, 0],
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "title-box",
          draggable: true,
        });

        // title text
        group.addShape("text", {
          attrs: {
            textBaseline: "top",
            x: -w / 2 + 8,
            y: -h / 2 + 2,
            lineHeight: 20,
            text: cfg.id,
            fill: "#fff",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "title",
        });
        cfg.children &&
          group.addShape("marker", {
            attrs: {
              x: w / 2,
              y: 0,
              r: 6,
              cursor: "pointer",
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: "#666",
              lineWidth: 1,
              fill: "#fff",
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "collapse-icon",
          });
        group.addShape("text", {
          attrs: {
            textBaseline: "top",
            x: -w / 2 + 8,
            y: -h / 2 + 24,
            lineHeight: 20,
            text: "description",
            fill: "rgba(0,0,0, 1)",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: `description`,
        });
        return shape;
      },
      setState(name, value, item) {
        if (name === "collapsed") {
          const marker = item
            .get("group")
            .find((ele) => ele.get("name") === "collapse-icon");
          const icon = value ? G6.Marker.expand : G6.Marker.collapse;
          marker.attr("symbol", icon);
        }
      },
    });

    //节点样式2;
    G6.registerNode("card-node2", {
      draw(cfg, group) {
        const r = 2;
        const color = "red";
        const w = cfg.size[0];
        const h = cfg.size[1];
        const shape = group.addShape("rect", {
          attrs: {
            x: -w / 2,
            y: -h / 2,
            width: w, //200,
            height: h, // 60
            stroke: color,
            radius: r,
            fill: "#fff",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "main-box",
          draggable: true,
        });

        group.addShape("rect", {
          attrs: {
            x: -w / 2,
            y: -h / 2,
            width: w, //200,
            height: h / 2, // 60
            fill: color,
            radius: [r, r, 0, 0],
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "title-box",
          draggable: true,
        });

        // title text
        group.addShape("text", {
          attrs: {
            textBaseline: "top",
            x: -w / 2 + 8,
            y: -h / 2 + 2,
            lineHeight: 20,
            text: cfg.id,
            fill: "#fff",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: "title",
        });
        cfg.children &&
          group.addShape("marker", {
            attrs: {
              x: w / 2,
              y: 0,
              r: 6,
              cursor: "pointer",
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: "#666",
              lineWidth: 1,
              fill: "#fff",
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "collapse-icon",
          });
        group.addShape("text", {
          attrs: {
            textBaseline: "top",
            x: -w / 2 + 8,
            y: -h / 2 + 24,
            lineHeight: 20,
            text: "description",
            fill: "rgba(0,0,0, 1)",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: `description`,
        });
        return shape;
      },
      setState(name, value, item) {
        if (name === "collapsed") {
          const marker = item
            .get("group")
            .find((ele) => ele.get("name") === "collapse-icon");
          const icon = value ? G6.Marker.expand : G6.Marker.collapse;
          marker.attr("symbol", icon);
        }
      },
    });

    const data = {
      id: "A",
      nodeType: "card-node",
      children: [
        {
          id: "A1",
          children: [
            { id: "A11", nodeType: "card-node2" },
            { id: "A12", nodeType: "card-node2" },
            { id: "A13", nodeType: "card-node2" },
            { id: "A14", nodeType: "card-node2" },
          ],
        },
        {
          id: "A2",
          children: [
            {
              id: "A21",
              children: [{ id: "A211" }, { id: "A212" }],
            },
            {
              id: "A22",
            },
          ],
        },
      ],
    };
    const container = containerRef.current;

    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    const graph = new G6.TreeGraph({
      container: container,
      width,
      height,
      modes: {
        default: ["drag-canvas"],
      },
      defaultNode: {
        type: "card-node",
        size: [100, 40],
      },
      defaultEdge: {
        type: "circle-running",
        style: {
          lineWidth: 2,
          stroke: "#bfa",
        },
      },
      layout: {
        type: "indented",
        direction: "LR",
        dropCap: false,
        indent: 200,
        getHeight: () => {
          return 60;
        },
      },
    });
    graph.node((node) => {
      return { ...node, type: node.nodeType };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
    graph.on("node:click", (e) => {
      if (e.target.get("name") === "collapse-icon") {
        e.item.getModel().collapsed = !e.item.getModel().collapsed;
        graph.setItemState(e.item, "collapsed", e.item.getModel().collapsed);
        graph.layout();
      }
    });
  }, []);

  return <div ref={containerRef} />;
}
