import tooloud from 'tooloud';

export interface INoiseSettings {
    octaveCount: number;
    frequency: number;
    amplitude: number;
}

class NoiseGeneratorImpl {
    private noises: any;

    constructor() {
        this.noises = {};
    }

    ensureNoise(seed: number) {
        if (!this.noises.hasOwnProperty(seed)) {
            this.noises[seed] = tooloud.Perlin.create(seed);
        }
        return this.noises[seed];
    }

    generateNoise(seed: number, x: number, y: number, settings: INoiseSettings): number {
        let noise = 0;

        let noiseFn = this.ensureNoise(seed);

        let octaveCount = settings.octaveCount;
        let frequency = settings.frequency;
        let amplitude = settings.amplitude;

        for (var i = 1; i <= octaveCount; i++) {
            let fx = x / (Math.pow(frequency, i));
            let fy = y / (Math.pow(frequency, i));
            noise += noiseFn.noise(fx, fy, 0) * amplitude / i;
        }

        return noise;
    }
}

export let NoiseGenerator = new NoiseGeneratorImpl();