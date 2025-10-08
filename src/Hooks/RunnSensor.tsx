import { useState } from "react";

type TreadmillData = {
  speed?: number;         // m/s
  avgSpeed?: number;      // m/s
  distance?: number;      // meters
  incline?: number;       // percent
  rampIncline?: number;   // percent
  elevationGain?: number; // meters
  cadence?: number;       // steps per minute
  strideLength?: number;  // meters
};

export function useRunnSensor(){
    const [treadmillData, setTreadmillData] = useState<TreadmillData | null>(null);
    const [device, setDevice] = useState<BluetoothDevice | null>(null);
    
    async function connectRunnSensor(){
    try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ namePrefix: 'Runn' }],
          optionalServices: ['fitness_machine',
            'running_speed_and_cadence'
          ]
        });

        setDevice(device);

        const server = await device.gatt?.connect();

    /*        const ftmsService = await server?.getPrimaryService('fitness_machine');
      const ftmsChar = await ftmsService?.getCharacteristic('00002acd-0000-1000-8000-00805f9b34fb');

      await ftmsChar?.startNotifications();
      ftmsChar?.addEventListener('characteristicvaluechanged', (event) => {
        const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
        const value = characteristic.value;
        if (!value) return;

        const parsed = parseTreadmillData(value);
        //console.log("Parsed FTMS data:", parsed);

        setTreadmillData(prev => ({ ...prev, ...parsed }));
      });
*/
       
      // Connect to Running Speed and Cadence service
      const rscService = await server?.getPrimaryService('running_speed_and_cadence');
      const rscChar = await rscService?.getCharacteristic('00002a53-0000-1000-8000-00805f9b34fb');

      await rscChar?.startNotifications();
      rscChar?.addEventListener('characteristicvaluechanged', (event) => {
        const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
        const value = characteristic.value;
        if (!value) return;

        const parsed = parseRSCData(value);
        //console.log("Parsed RSC data:", parsed);

        setTreadmillData(prev => ({ ...prev, ...parsed }));
      });

      console.log("Selected device:", device.name);
      return device;
    } catch (error) {
      console.error("Device request failed:", error);
    }
  }

  return { treadmillData, connectRunnSensor, device };
}

/*
const parseTreadmillData = (value: DataView): TreadmillData => {
  let index = 0;
  const flags = value.getUint16(index, true);
  //console.log("Flags (binary):", flags.toString(2).padStart(16, '0'));
  index += 2;

  const result: TreadmillData = {};

  if (flags & 0x0001) {
    result.speed = value.getUint16(index, true) / 100;
    index += 2;
  }

  if (flags & 0x0002) {
    result.avgSpeed = value.getUint16(index, true) / 100;
    index += 2;
  }

if (flags & 0x0004) {
  result.distance = value.getUint32(index, true);
  index += 5; // ← 4 for distance, 1 extra padding byte
}

  if (flags & 0x0008) {
    const rawIncline = value.getInt16(index, true);
    result.incline = rawIncline / 10;
    index += 2;
  }

  if (flags & 0x0010) {
    const rawRampIncline = value.getInt16(index, true);
    result.rampIncline = rawRampIncline / 10;
    index += 2;
  }

  if (flags & 0x0020) {
    result.elevationGain = value.getUint16(index, true);
    index += 2;
  }

  if (flags & 0x0040) {
    result.cadence = value.getUint16(index, true) / 2;
    index += 2;
  }

  //const bytes = Array.from(new Uint8Array(value.buffer));
//console.log("Raw treadmill bytes:", bytes);
    //console.log('Parsed treadmill data:', result);
  return result;

};*/

const parseRSCData = (value: DataView): TreadmillData => {
  let index = 0;
  const flags = value.getUint8(index++);
//const bytes = Array.from(new Uint8Array(value.buffer));


  const result: TreadmillData = {};

  result.speed = value.getUint16(index, true) / 256;
  index += 2;

  result.cadence = value.getUint8(index++);

  if (flags & 0x01) {
    result.strideLength = value.getUint16(index, true) / 100;
    index += 2;
  }

  if (flags & 0x02) {
    result.distance = value.getUint32(index, true);
    index += 4;
  }

  console.log("Parsed RSC data:", result);
  return result;
};