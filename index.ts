import RunIpfsNode, { IpfsNode } from "ipfs-node";

const start = async () => {
  const ipfsNode: IpfsNode = await RunIpfsNode.run();

  const cid = await ipfsNode.push(
    Buffer.from(new TextEncoder().encode("Hello world!"))
  );
  console.log("> Added file:", cid.toString());

  const res: Buffer = await ipfsNode.fetch(cid);
  console.log("> Added file contents:", new TextDecoder().decode(res));

  const peerid = ipfsNode.node.libp2p.peerId;
  console.log("> PeerID:", peerid);

  return ipfsNode.node;
};

start()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then((node) => {
    node.stop();
    console.log(
      "> The execution of the example is completed, the node has been successfully stopped."
    );
    process.exit(0);
  });
