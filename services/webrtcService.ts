
import { StreamStats } from '../types';

type InputEvent = 
  | { type: 'keydown' | 'keyup', code: string }
  | { type: 'mousemove', dx: number, dy: number }
  | { type: 'mousedown' | 'mouseup', button: number };

export class CloudStreamClient {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private inputInterval: any = null;
  
  // Simulation state
  private isSimulated: boolean = true;

  constructor() {
    // Real config would use TURN servers (Twilio, Xirsys, or self-hosted coturn)
    const config: RTCConfiguration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' } 
      ]
    };
    this.peerConnection = new RTCPeerConnection(config);
  }

  public async connect(gameId: string): Promise<void> {
    console.log(`[CloudClient] Initializing handshake for session: ${gameId}`);
    
    // In a real app, this would:
    // 1. Call API to spin up VM
    // 2. Receive Signal Offer via WebSocket
    // 3. Set Remote Description
    // 4. Create Answer
    
    // For this demo, we simulate the connection phases
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  }

  public sendInput(event: InputEvent) {
    if (this.isSimulated) {
      // In production, this goes over the DataChannel
      // console.debug('[InputSent]', event); 
      return;
    }

    if (this.dataChannel?.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(event));
    }
  }

  public getStats(): StreamStats {
    // In a real WebRTC app, we would use peerConnection.getStats()
    // Here we return simulated fluctuation for the UI
    const baseLatency = 18;
    const jitter = Math.random() * 4;
    
    return {
      fps: 60,
      bitrate: 25 + (Math.random() * 5),
      latency: Math.floor(baseLatency + jitter),
      packetLoss: Math.random() > 0.95 ? 0.1 : 0,
      resolution: '1920x1080',
      codec: 'H.264 (Hardware)'
    };
  }

  public disconnect() {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.inputInterval) {
      clearInterval(this.inputInterval);
    }
  }
}
