import { useState } from "react";

export function useHeartRate() {
    const [heartRate, setHeartRate] = useState<number | null>(null);
    const [device, setDevice] = useState<BluetoothDevice | null>(null);

    async function connectHeartRateMonitor() {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }]
            });

            setDevice(device);

            const server = await device.gatt?.connect();
            const service = await server?.getPrimaryService('heart_rate');
            const characteristic = await service?.getCharacteristic('heart_rate_measurement');

            await characteristic?.startNotifications();

            characteristic?.addEventListener('characteristicvaluechanged', (event) => {
                const value = (event.target as BluetoothRemoteGATTCharacteristic).value!;
                const heartRateValue = value.getUint8(1);
                setHeartRate(heartRateValue);
            });
        } catch (error) {
            console.error('Bluetooth connection failed', error);
        }
    }
    return { heartRate, connectHeartRateMonitor, device };
}

