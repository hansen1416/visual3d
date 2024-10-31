import { BaseDirectory, exists, readFile } from '@tauri-apps/plugin-fs';

async function vertices_loader(filename: string): Promise<Array<Array<Array<number>>>> {

    const is_file_exists = await exists(filename, {
        baseDir: BaseDirectory.Document,
    });

    if (!is_file_exists) {
        return [];
    }

    const response: Uint8Array = await readFile(filename, {
        baseDir: BaseDirectory.Document,
    });

    // Create a DataView from the Uint8Array
    const dataView = new DataView(response.buffer);

    // Array to hold the read float64 values
    const float64Values = [];

    // Read each float64 value (8 bytes each)
    for (let i = 0; i < response.length; i += 8) {
        // Get the float64 value from the DataView
        const value = dataView.getFloat64(i, true); // true for little-endian
        float64Values.push(value);
    }

    // float64Values is 1d array, reshape it to 3d array, (469, 6890, 3)
    const shape = [469, 6890, 3];
    const reshapedArray = new Array(shape[0]); // Create the first dimension

    for (let i = 0; i < shape[0]; i++) {
        reshapedArray[i] = new Array(shape[1]); // Create the second dimension
        for (let j = 0; j < shape[1]; j++) {
            reshapedArray[i][j] = new Array(shape[2]); // Create the third dimension
            for (let k = 0; k < shape[2]; k++) {
                reshapedArray[i][j][k] = float64Values[i * shape[1] * shape[2] + j * shape[2] + k];
            }
        }
    }

    return reshapedArray;
}

async function faces_loader(filename: string): Promise<Array<Array<number>>> {
    const is_file_exists = await exists(filename, {
        baseDir: BaseDirectory.Document,
    });

    if (!is_file_exists) {
        return [];
    }

    const response: Uint8Array = await readFile(filename, {
        baseDir: BaseDirectory.Document,
    });

    // Create a DataView from the Uint8Array
    const dataView = new DataView(response.buffer);

    // Array to hold the read float64 values
    const int32values = [];

    // Read each float64 value (8 bytes each)
    for (let i = 0; i < response.length; i += 4) {
        // Get the float64 value from the DataView
        const value = dataView.getUint32(i, true); // true for little-endian

        int32values.push(value);
    }

    // reahpe the array to 2d array, (N,3)
    const shape = [int32values.length / 3, 3];

    const reshapedArray = new Array(shape[0]); // Create the first dimension

    for (let i = 0; i < shape[0]; i++) {
        reshapedArray[i] = new Array(shape[1]); // Create the second dimension
        for (let j = 0; j < shape[1]; j++) {
            reshapedArray[i][j] = int32values[i * shape[1] + j];
        }
    }

    return reshapedArray;
}

export { vertices_loader, faces_loader };