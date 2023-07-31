import Peer from "simple-peer";

const getOwnSignal = (
  stream: MediaStream,
): Promise<{ peer: Peer.Instance; signal: Peer.SignalData }> => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });
  return new Promise((resolve) => {
    peer.on("signal", (signal) => {
      resolve({ signal, peer });
    });
  });
};

export { getOwnSignal };
