import Peer from "simple-peer";

const getOwnSignal = (
  mediaStream: MediaStream,
): Promise<{ peer: Peer.Instance; signal: Peer.SignalData }> => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: mediaStream,
  });
  return new Promise((resolve) => {
    peer.on("signal", (signal) => {
      resolve({ signal, peer });
    });
  });
};

export { getOwnSignal };
