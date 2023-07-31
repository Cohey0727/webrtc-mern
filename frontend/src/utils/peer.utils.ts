import Peer from "simple-peer";

const createPeerAndSignal = (
  stream: MediaStream,
): Promise<{ peer: Peer.Instance; signal: Peer.SignalData }> => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });
  return new Promise((resolve) => {
    peer.on("signal", (signal) => {
      // signalは接続情報で、この情報を相手に渡すことで接続を確立する
      // peerは接続を確立した相手との通信を行うためのインスタンス
      resolve({ signal, peer });
    });
  });
};

export { createPeerAndSignal };
