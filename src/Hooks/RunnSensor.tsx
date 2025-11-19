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

export function useRunnSensor() {
    const [treadmillData, setTreadmillData] = useState<TreadmillData | null>(null);
    const [device, setDevice] = useState<BluetoothDevice | null>(null);

    async function connectRunnSensor() {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ namePrefix: 'Runn' }],
                optionalServices: ['fitness_machine',
                    'running_speed_and_cadence'
                ]
            });

            setDevice(device);

            const server = await device.gatt?.connect();

            const rscService = await server?.getPrimaryService('running_speed_and_cadence');
            const rscChar = await rscService?.getCharacteristic('00002a53-0000-1000-8000-00805f9b34fb');

            await rscChar?.startNotifications();
            rscChar?.addEventListener('characteristicvaluechanged', (event) => {
                
                const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
                const value = characteristic.value;
                if (!value) return;

                const parsed = parseRSCData(value);

                setTreadmillData(prev => ({ ...prev, ...parsed }));
            });

            return device;
        } catch (error) {
            console.error("Device request failed:", error);
        }
    }

    return { treadmillData, connectRunnSensor, device };
}

const parseRSCData = (value: DataView): TreadmillData => {
    let index = 0;
    const flags = value.getUint8(index++);

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