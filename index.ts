import { run, IpfsNode } from 'ipfs-node';

const start = async () => {
  const ipfsNode: IpfsNode = await run({
    url: new URL(process.env.IPFS_API || ''),
  });

  const random =
    new Date().getTime().toString() + (Math.random() * 2 ** 64).toString(16);

  const { cid } = await ipfsNode.push(
    Buffer.from(new TextEncoder().encode(random)),
    { cidVersion: 0 },
  );
  console.log('> Added file:', cid.toString(), random);

  const res: Buffer = await ipfsNode.fetch(cid);
  console.log('> Added file contents:', new TextDecoder().decode(res));

  const peerid = ipfsNode.node.libp2p.peerId;
  console.log('> PeerID:', peerid);

  console.log(
    '> List length:',
    (await ipfsNode.ls('QmVaZb25GyfxJrtCKSKNKtx7JZ5dJQ9bRq8kSP7ddovbaX'))
      .length,
  );

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
      '> The execution of the example is completed, the node has been successfully stopped.',
    );
    process.exit(0);
  });
